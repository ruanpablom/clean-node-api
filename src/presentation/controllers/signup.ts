import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissinParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
export class SignUpController {
  handle (httpResponse: HttpRequest): HttpResponse {
    if (!httpResponse.body.name) {
      return badRequest(new MissinParamError('name'))
    }
    if (!httpResponse.body.email) {
      return badRequest(new MissinParamError('email'))
    }
    return {
      statusCode: 200,
      body: ''
    }
  }
}
