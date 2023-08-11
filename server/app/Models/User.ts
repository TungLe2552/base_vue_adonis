import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany, computed } from '@ioc:Adonis/Lucid/Orm'
import Review from './Review'

export enum Role {
  Admin = 'A',
  Student = 'S',
  Assistant = 'As',
}

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public studentCode: string

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
  public roles: Role[]

  @computed()
  public get highestRole() {
    const orderedRoles = [Role.Admin, Role.Assistant, Role.Student]

    for (const role of orderedRoles) {
      if (this.roles.includes(role)) {
        return role
      }
    }
    return 'S'
  }

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Review, {
    foreignKey: 'user_id',
  })
  public reviews: HasMany<typeof Review>

  @beforeSave()
  public static async hashPassword(authentication: User) {
    if (authentication.$dirty.password) {
      authentication.password = await Hash.make(authentication.password)
    }
  }
}
