import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';
import { handleApiErrors } from '../lib/api-errors';

import {  
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';

import { 
  //CLIENT_SET, 
  CLIENT_UNSET,
} from '../client/constants';


const loginUrl = 'http://127.0.0.1:8000/api/login';


function loginApi (email, password) {
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(handleApiErrors)
  .then(response => response.json())
  .then(json => json)
  .catch((error) => { throw error })
}

// ...
function* loginFlow (email, password) {  
  let token
  try {
  
    token = yield call(loginApi, email, password)

    yield put({ type: LOGIN_SUCCESS, token })

    localStorage.setItem('token', JSON.stringify(token))

    window.location.href = '/cart'

  } catch (error) {
    
    yield put({ type: LOGIN_ERROR, error })
  } finally {
    
    if (yield cancelled()) {
      window.location.href = '/'
    }
  }
  
  return token
}

function* loginWatcher () {

  while (true) {
  
    const { email, password } = yield take(LOGIN_REQUESTING)

    const task = yield fork(loginFlow, email, password)

    const action = yield take([CLIENT_UNSET, LOGIN_ERROR])

    if (action.type === CLIENT_UNSET) yield cancel(task)
      
  }
}

export default loginWatcher  