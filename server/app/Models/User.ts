import { column, beforeSave, BaseModel, computed } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'

export enum Role {
  Admin = 'A',
  User = 'U',
}

class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column({
    prepare: (value) => {
      return JSON.stringify(value)
    },
    serialize: (value) => {
      if (value == null) {
        return []
      }
      return JSON.parse(value)
    },
  })
  public roles: any

  @computed()
  public get highestRole() {
    const orderedRoles = [Role.Admin, Role.User]

    for (const role of orderedRoles) {
      if (this.roles.includes(role)) {
        return role
      }
    }
    return 'U'
  }

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(authentication: User) {
    if (authentication.$dirty.password) {
      authentication.password = await Hash.make(authentication.password)
    }
  }
}

User['findForAuth'] = async function (uids: string[], uidValue: string) {
  var userUid = uidValue.replace(/%/g, '')
  return this.query()
    .where((query) => uids.map((uid) => query.orWhere(uid, 'ILIKE', userUid)))
    .firstOrFail()
}

export default User
