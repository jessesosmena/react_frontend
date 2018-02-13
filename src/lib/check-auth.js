import React from 'react';  

import { Route, Redirect } from 'react-router-dom';

const token = localStorage.getItem('token');

const PrivateRoute = ({ path: target, component: Component }) => (
  <Route 
    path={target} 
    render={() => (
      token
      ? <Component />
      : <Redirect to='/' />
  )} />
)

export default PrivateRoute