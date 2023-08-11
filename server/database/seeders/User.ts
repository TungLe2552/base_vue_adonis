import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User, { Role } from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      email: 'admin@admin.com',
      name: 'Admin',
      password: 'admin',
      roles: [Role.Admin, Role.Assistant, Role.Student],
    })

    await User.create({
      email: 'as@admin.com',
      name: 'Assistant',
      password: 'admin',
      roles: [Role.Assistant, Role.Student],
    })
  }
}
