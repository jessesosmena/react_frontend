import React, { Component } from 'react';  
import { Col } from 'reactstrap';
import { connect } from 'react-redux';  
import logo from '../logo.svg';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, } from 'reactstrap';
import PropTypes from 'prop-types';
import { logoutRequest, clientRequest } from './actions';
import Errors from '../notifications/Errors';
import { setClient, setClientData } from '../client/actions';
//import Slider from '../slider';
import Slider from '../slider/index'; 

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
      },
      client: {
        token,
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
        {!requesting && client_successful && client_data && (
            <div className="alert alert-info alert-dismissable">
              <strong>Welcome to React {user_name}</strong>
            </div>         
        )}  
        <Navbar color="faded" light>
          <NavbarBrand href="" className="mr-auto">
            <Col xs="3" sm={{ size: 12, offset: 0 }}>
               <img src={logo} className="App-logo" alt="logo"/>
            </Col>
          </NavbarBrand>
           <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>

              <NavItem>
                <NavLink href="" onClick={this.logout}>
                  <button className="btn btn-info btn-md">Logout</button>
                </NavLink>

                  <div>     
                      {!requesting && !!errors.length && (
                          <Errors message="Failure to fetch user due to:" errors={errors} />
                      )}

                      {!requesting && client_successful && (
                          <p>
                            {token}
                          </p>
                      )}
                  </div>

              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>


        <Slider />
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
