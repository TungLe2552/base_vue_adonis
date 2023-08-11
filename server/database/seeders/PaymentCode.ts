import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
// import PaymentCode from 'App/Models/Paymentcode'
import { shuffleArray } from '../../utilities/arrayFunction'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run() {
    const values = Array.from({ length: 1000000 }, (_, i) => String(i).padStart(6, '0'))
    const suffleValues = shuffleArray(values)
    const paymentCodes = suffleValues.map((value) => ({ payment_code: value }))
    while (paymentCodes.length > 0) {

      const queue = paymentCodes.splice(0, 10000)
      await Database.table('payment_codes').multiInsert(queue)
    }
  }
}
// sử dụng multi insert
