import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissinParamError } from '../errors/missing-param-error'
export class SignUpController {
  handle (httpResponse: HttpRequest): HttpResponse {
    if (!httpResponse.body.name) {
      return {
        statusCode: 400,
        body: new MissinParamError('name')
      }
    }
    if (!httpResponse.body.email) {
      return {
        statusCode: 400,
        body: new MissinParamError('email')
      }
    }
    return {
      statusCode: 200,
      body: ''
    }
  }
}
