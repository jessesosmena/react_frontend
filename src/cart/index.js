import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import PropTypes from 'prop-types';
import { logoutRequest, clientRequest } from './actions';
import Errors from '../notifications/Errors';
import { setClient, setClientData } from '../client/actions';
//import Slider from '../slider';

import Messages from '../notifications/Messages';  


class Cart extends Component {  

  // Pass the correct proptypes in for validation
  static propTypes = {
    logoutRequest: PropTypes.func,
    clientRequest: PropTypes.func,
    setClient: PropTypes.func,
    setClientData: PropTypes.func,
    cart: PropTypes.shape({
      requesting: PropTypes.bool,
      logout_successful: PropTypes.bool,
      client_successful: PropTypes.bool,
      errors: PropTypes.array,
      messages: PropTypes.array,
    }),
    client: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  logout = () => {
    this.props.logoutRequest()
  }

  getClient = () => {
   
    const clientData = localStorage.getItem('client')
    
    this.props.setClientData(clientData)

  }

  componentWillMount() {
  
    this.getClient()
    
    this.props.clientRequest()

  }

  render () {

    const {
      cart: {
        requesting,
        client_successful,
        client_data,
        errors,
        messages,
      },
      
    } = this.props


      const client = client_data
      let user
      if(client){
        user = client.result
      }

      let user_name
      if(user){
        user_name = user.name
      }

  return (

  <div>
     
      
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
     
      <a className="navbar-brand" href="">Home</a>

      
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="">Contact</a>
        </li>

        
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="" id="navbardrop" data-toggle="dropdown">
            {!requesting && client_successful && client_data && (
              <strong>Hello! {user_name}</strong>   
            )}  
          </a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="">Link 1</a>
            <a className="dropdown-item" href="">Link 2</a>
            <a className="dropdown-item" href="" onClick={this.logout}>Logout</a>
          </div>
        </li>
      </ul>
    </nav>
    {!requesting && !!errors.length && (
        <div className="alert alert-info alert-dismissable text-center">
            <Errors message="Failure to fetch user" errors={errors} />
        </div>         
    )}  

    {!requesting && !!messages.length && (
        <div className="alert alert-info alert-dismissable text-center">
          <Messages messages={messages} className="text-left" />
        </div>         
    )}  

  </div>

    )
  }
}

const mapStateToProps = state => ({  
 cart: state.cart,
 client: state.client,
})

const connected = connect(mapStateToProps, { 

  logoutRequest, 
  clientRequest, 
  setClient, 
  setClientData 

})(Cart)

export default connected
