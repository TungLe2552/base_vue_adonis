import Route from '@ioc:Adonis/Core/Route'

export function authRoute() {
  Route.group(() => {
    Route.get('getMicrosoftLoginUrl', 'AuthController.getMicrosoftLoginUrl')
    Route.post('loginWithMicrosoftCode', 'AuthController.loginWithMicrosoftCode')
    Route.post('loginWithCredentials', 'AuthController.loginWithCredentials')
  }).prefix('auth')

  Route.group(() => {
    Route.get('me', 'AuthController.me')
    Route.post('logout', 'AuthController.logout')
  })
    .prefix('auth')
    .middleware(['auth:api,web'])
}
