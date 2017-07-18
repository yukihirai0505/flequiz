import {Record} from 'immutable'
import { TOKEN_COOKIE_KEY } from '../../constants/Index'

const AuthRecord = Record({token: "", me: {}})

export default class Auth extends AuthRecord {

  setMe(data) {
    return this.set('me', data)
  }

  setToken(data) {
    document.cookie = `${TOKEN_COOKIE_KEY}=${data}`
    return this.set('token', data)
  }

  removeToken() {
    document.cookie = `${TOKEN_COOKIE_KEY}=; max-age=0`
    return this.set('token', "").set('me', {})
  }

}
