import axios from "axios";

import { 
	SIGNUP_REQUESTING,
	SIGNUP_SUCCESS,
    SIGNUP_ERROR,
} from './constants'

export function signupRequest({name, email, password}) {
  return function(dispatch) {
    dispatch({type: SIGNUP_REQUESTING });
    
	    axios.post("http://127.0.0.1:8000/api/register", { name, email, password })
	      .then((response) => {
	        dispatch({type: SIGNUP_SUCCESS, payload: response.data})
	      })
	      .catch((error) => {
	        dispatch({type:  SIGNUP_ERROR, payload: error})
	      })
    }
}

export default signupRequest  