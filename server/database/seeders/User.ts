import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User, { Role } from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      email: 'admin@admin.com',
      name: 'Admin',
      password: 'admin',
      roles: [Role.Admin, Role.User],
    })

    await User.create({
      email: 'userTest.com',
      name: 'user 1',
      password: 'admin',
      roles: [Role.User],
    })
  }
}
