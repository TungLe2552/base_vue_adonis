import Route from '@ioc:Adonis/Core/Route'
import { authRoute } from './auth'
import { smsBankRoute } from './sms-bank'
import { reviewRoute } from './review'
import { AdminRouter } from './admin'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  authRoute()
  smsBankRoute()
  reviewRoute()
  AdminRouter()
}).prefix('api')
