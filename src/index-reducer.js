import { combineReducers } from 'redux';  
import { reducer as form } from 'redux-form';
import client from './client/reducer';
import login from './login/reducer'
import signup from './signup/reducer';
import cart from './cart/reducer';


const IndexReducer = combineReducers({ 
  login,
  signup,
  cart,
  client, 
  form,
})

export default IndexReducer  




