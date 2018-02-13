import {  
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from './constants'

const initialState = {  
  requesting: false,
  signup_successful: false,
  messages: [],
  errors: []
}

const reducer = function signupReducer (state = initialState, action) {  
    switch (action.type) {

	    case SIGNUP_REQUESTING:
	      return {
	        requesting: true,
	        signup_successful: false,
	        messages: [{ body: 'Signing up...', time: new Date() }],
	        errors: [],
	      }

	    case SIGNUP_SUCCESS:
	      return {
	        errors: [],
	        messages: action.payload,
	        requesting: false,
	        signup_successful: true,
	      }

	    case SIGNUP_ERROR:
	      return {
	        errors: state.errors.concat([{
	          body: action.payload.toString(),
	          time: new Date(),
	        }]),
	        messages: [],
	        requesting: false,
	        signup_successful: false,
	      }


	    default:
	      return state
	}
}

export default reducer  



