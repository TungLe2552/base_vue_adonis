import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import * as msal from '@azure/msal-node'
import User from 'App/Models/User'
import { Role } from 'App/Models/User'
import { splitString } from '../../../utilities/arrayFunction'

export default class AuthController {
  private msalConfig = {
    auth: {
      clientId: Env.get('MSAL_CLIENT_ID'),
      authority: Env.get('MSAL_AUTHORITY'),
      clientSecret: Env.get('MSAL_CLIENT_SECRET'),
    },
  }

  private cca = new msal.ConfidentialClientApplication(this.msalConfig)

  // Methods

  public async getMicrosoftLoginUrl(ctx: HttpContextContract) {
    const { origin } = ctx.request.all()
    const authCodeUrlParameters = {
      scopes: ['user.read'],
      redirectUri: origin,
      prompt: 'select_account',
    }
    const redirectUri = await this.cca.getAuthCodeUrl(authCodeUrlParameters)

    return {
      url: redirectUri,
    }
  }

  public async loginWithMicrosoftCode(ctx: HttpContextContract) {
    const { code, origin } = ctx.request.all()

    if (code == null) {
      return ctx.response.status(401).send('Unauthenticated')
    }

    const tokenRequest = {
      code,
      scopes: ['user.read'],
      redirectUri: origin,
    }
    const response = await this.cca.acquireTokenByCode(tokenRequest)
    const email = response?.account?.username.toLowerCase()
    const name = response?.account?.name

    let user = await User.findBy('email', email)
    if (!user) {
      if (email) {
        //
        const numbers = splitString(email)
        let numberInEmail = ''
        for (const number of numbers) {
          if (number.length > numberInEmail.length) {
            numberInEmail = number
          }
        }
        if (numberInEmail.length == 6) {
          numberInEmail = '20' + numberInEmail
        }
        user = await User.create({
          email,
          name,
          studentCode: numberInEmail,
          roles: [Role.Student],
        })
      } else {
        return ctx.response.status(401).send('Unauthenticated')
      }
    }

    await ctx.auth.use('web').loginViaId(user.id)
  }

  public async me(ctx: HttpContextContract) {
    return ctx.auth.user
  }
  public async logout(ctx: HttpContextContract) {
    await ctx.auth.logout()
    return {
      message: 'Logged out successfully',
    }
  }

  public async loginWithCredentials(ctx: HttpContextContract) {
    const { email, password, type } = ctx.request.all()
    const auth = type == 'token' ? ctx.auth.use('api') : ctx.auth.use('web')
    const emails = email?.trim().split('*')
    const authId = emails[0]
    const authToken = await auth.attempt(authId, password)
    if (emails.length > 1) {
      const user = await User.findBy('email', emails[1])

      if (user != null) {
        const userToken = await auth.login(user)
        return userToken
      }
    } else {
      return authToken
    }
  }
}
