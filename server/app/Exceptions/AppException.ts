import { Exception } from "@adonisjs/core/build/standalone";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new AppException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class AppException extends Exception {
  constructor(message: string, status?: number) {
    super(message, status || 400);
  }

  public async handle(_err: this, { response }: HttpContextContract) {
    response.status(this.status).json({
      error: {
        message: this.message,
        code: this.status,
      },
    });
  }
}
