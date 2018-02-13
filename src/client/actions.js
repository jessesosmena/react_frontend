import { CLIENT_SET, CLIENT_UNSET, CLIENT_DATA_SET } from './constants'

export function setClient (token) {  
  return {
    type: CLIENT_SET,
    token,
  }
}

export function unsetClient () {  
  return {
    type: CLIENT_UNSET,
  }
}

export function setClientData (clientData) {  
  return {
    type: CLIENT_DATA_SET,
    clientData,
  }
}

