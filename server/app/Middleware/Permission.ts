import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Role } from 'App/Models/User'

export default class Permission {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>, roles: Role[]) {
    if (!auth.user || !roles.some((role) => auth.user?.roles?.includes(role)))
      throw new Error(`Bạn không có quyền truy cập`)
    await next()
  }
}
