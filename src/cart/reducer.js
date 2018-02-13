import {  
  LOGOUT_REQUESTING,

  CLIENT_REQUESTING,
  CLIENT_SUCCESS,
  CLIENT_ERROR,
} from './constants'

const initialState = {  
  requesting: false,
  client_successful: false,
  
  client_data: [],
  errors: [],
}

const reducer = function cartReducer (state = initialState, action) {  
    switch (action.type) {

    	case CLIENT_REQUESTING:
	      return {
	        requesting: true,
	        client_successful: false,
	        client_data: [],
	        errors: [],
	      }

    	case CLIENT_SUCCESS:
	      return {
	        requesting: false,
	        client_successful: true,
	        client_data: action.client,
	        errors: [],
	      }

	    case CLIENT_ERROR:
	      return {
	        requesting: false,
	        client_successful: false,
	        client_data: [],
	        errors: action.errors,
	      }

	    case LOGOUT_REQUESTING:
	      return {
	        requesting: true,
	      }

	    default:
	      return state
	}
}

export default reducer  