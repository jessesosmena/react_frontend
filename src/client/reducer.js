import { CLIENT_SET, CLIENT_UNSET, CLIENT_DATA_SET } from './constants'

const initialState = {  
  token: null,
  clientData: null,
}

const reducer = function clientReducer (state = initialState, action) {  
    switch (action.type) {
	    case CLIENT_SET:
	      return {
	        token: action.token,
	      }

	    case CLIENT_UNSET:
	      return {
	        token: null,
	      }

	    case CLIENT_DATA_SET:
	      return {
	        clientData: null,
	      }


	    default:
	      return state
    }
}

export default reducer  