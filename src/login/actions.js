import {  
  LOGIN_REQUESTING,

  LOGIN_SUCCESS,
} from './constants'


const loginRequest = function loginRequest ({ email, password, client }) {  
  return {
    type: LOGIN_REQUESTING,
    email,
    password,
    client,
  }
}

export function setToken (token) {  
  return {
    type: LOGIN_SUCCESS,
    token,
  }
}

export default loginRequest  