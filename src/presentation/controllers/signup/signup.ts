import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse, AddAccount } from './signup-protocols'
import { InvalidParamError, MissinParamError } from '../../errors'
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissinParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = await this.addAccount.add({
        email,
        name,
        password
      })
      return ok(account)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
