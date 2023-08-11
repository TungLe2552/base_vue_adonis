import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Term from 'App/Models/Term'

export default class extends BaseSeeder {
  public async run() {
    await Term.create({
      code: '20232',
    })
  }
}
