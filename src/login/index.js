import React, { Component } from 'react';  
import { reduxForm, Field } from 'redux-form';  
import { connect } from 'react-redux';  
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../logo.svg';
import Messages from '../notifications/Messages';  
import Errors from '../notifications/Errors';
import { Col,  Card } from 'reactstrap';

import loginRequest from './actions';

const required = value => value ? undefined : 'Required'
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined


const renderField = ({input, type, placeholder, meta:{error, touched }}) => (
<div>
  <input {...input} className="form-control" type={type} placeholder={placeholder}/>
  {touched && error && 
   <span id="validation-error" className="text-danger float-left">{error}</span>}
</div>
)


class Login extends Component {  
 
  static propTypes = {
    handleSubmit: PropTypes.func,
    loginRequest: PropTypes.func,
    client:  PropTypes.shape({
      token: PropTypes.object,
    }),
    login: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
      //token: PropTypes.array,
    }),
  }

  submit = (values) => {
  	const { client } = this.props
    this.props.loginRequest(values, client)
  }

  render () {
  	
    const {
      handleSubmit, 
      login: {
        requesting,
        successful,
        messages,
        errors,
        token,
      },
      signup: {
      	signup_successful,
      },
    } = this.props

    return (
        <div>
            {!requesting && signup_successful && (
			    <div className="alert alert-info alert-dismissable">
				    <strong>You are registered successfully!</strong>
			    </div>         
			)}  
	        <br/>
	            <Col md={{ size: 4, offset: 4 }}>
                    <Card>
			            <div className="header">
			              <img src={logo} className="App-logo" alt="logo" />
		                  <h4 className="title">LOGIN</h4>
		                </div>
						<div className="content">
							<form onSubmit={handleSubmit(this.submit)}>
							    <Col lg={{ size: 12, offset: 0 }}>
					            <Field
						            name="email"
							        label="Email"
							        type="email"
							        component={renderField}
							        placeholder="Enter Email"
							        validate={[ required, email ]}
						            />
						        </Col>
					            <br/>
					            <Col lg={{ size: 12, offset: 0 }}>
					            <Field
						            name="password"
							        label="Password"
							        type="password"
							        component={renderField}
							        placeholder="Enter Password"
							        validate={[ required ]}
						            />
					            <br/>
					            </Col>
					            <Col lg={{ size: 12, offset: 0 }}>
							    <button className="btn btn-info btn-block">LOGIN</button>
							    </Col>
					                <br/>
							        <div className="auth-messages">
							          {/* As in the signup, we're just using the message and error helpers */}
							          {!requesting && !!errors.length && (
							            <Errors message="Failure to login due to:" errors={errors} />
							          )}
							          {requesting && !!messages.length && !token && (
							            <Messages messages={messages} />
							          )}
							        
							          {!requesting && !!successful && (
							            <Link to="/signup">Not yet Registered? Click Here »</Link>
							          )}
							        </div>
							</form>
					    </div>
		            </Card>
		        </Col>
        </div>
    )
  }
}

const mapStateToProps = state => ({  
  login: state.login,
  signup: state.signup,
  client: state.client,
})

const connected = connect(mapStateToProps, { loginRequest })(Login)

const formed = reduxForm({  
  form: 'login',
})(connected)

export default formed  
