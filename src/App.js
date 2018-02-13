import React from 'react';  
import './App.css';
import { Route } from 'react-router-dom';  
// Import all of our components 

import Login from './login'; 
import Signup from './signup';
import Cart from './cart';

import PrivateRoute from './lib/check-auth';

require('./style.scss')


const App = () => (

  <div className="App">

    <section className="App-body">
     
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/' component={Login} />

        <PrivateRoute path="/cart" component={Cart} />

    </section>


  </div>
)

export default App;
