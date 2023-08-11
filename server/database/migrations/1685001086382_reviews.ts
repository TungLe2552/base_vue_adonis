import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { StatusReview } from 'App/Models/Review'

export default class extends BaseSchema {
  protected tableName = 'reviews'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('subject_code')
      table.string('classroom')
      table.string('exam_room')
      table.string('term_id')
      table.string('examinations')
      table.string('student_name')
      table.string('student_code')
      table.string('status').defaultTo(StatusReview.NotPayment) // TODO get from enum
      table.string('payment_code')
      table.string('code_score')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.dateTime('created_at', { useTz: false })
      table.dateTime('updated_at', { useTz: false })
      table.integer('user_id').references('id').inTable('users')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
