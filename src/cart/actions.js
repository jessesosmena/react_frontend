import axios from 'axios';

import { 
	LOGOUT_REQUESTING,

	CLIENT_REQUESTING,
	CLIENT_SUCCESS,
	CLIENT_ERROR,
} from './constants';

import {  
  unsetClient,
} from '../client/actions';

const token = localStorage.getItem('token');
const access_token = JSON.parse(token);


export function clientRequest() {
let auth_token
if(access_token){
   auth_token = access_token.token
   //console.log(auth_token)
}
  return function(dispatch) {
    dispatch({type: CLIENT_REQUESTING });
    
	    axios.get("http://127.0.0.1:8000/api/user?token=" + auth_token, {
		  })
	      .then((response) => {
	        dispatch({type: CLIENT_SUCCESS, client: response.data})
	        console.log(response.data)
	      })
	      .catch((error) => {
	        dispatch({type:  CLIENT_ERROR, errors: error})
	    })
    }
}

export function logoutRequest() {  
  return function(dispatch) {

  	dispatch({ type: LOGOUT_REQUESTING });
    dispatch({type: unsetClient() });

    localStorage.removeItem('token');

    localStorage.removeItem('client');

    window.location.href = '/'

  }
}
