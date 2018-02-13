import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';  
import { connect } from 'react-redux';
import logo from '../logo.svg';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col,  Card } from 'reactstrap';

// Import the helpers.. 
import Messages from '../notifications/Messages';  
import Errors from '../notifications/Errors';

import { signupRequest } from './actions';


const required = value => value ? undefined : 'Required'

const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue6 = minValue(6)

const maxLength = max => value =>
value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined


const renderField = ({input, type, placeholder, meta:{error, touched}}) => (
    <div>
      <input {...input} className="form-control" type={type} placeholder={placeholder}/>
      {touched && error && 
       <span id="validation-error" className="text-danger float-left">{error}</span>}
    </div>
  )


class Signup extends Component {

	static propTypes = {
	    handleSubmit: PropTypes.func,
	    signupRequest: PropTypes.func,
	    signup: PropTypes.shape({
	      requesting: PropTypes.bool,
	      signup_successful: PropTypes.bool,
	      errors: PropTypes.array,
	    }),
	}

		submit = (values) => {
		   this.props.dispatch(signupRequest(values))
		}

    render () { 

    	
	    const {
	      handleSubmit,
	      signup: {
	        requesting,
	        signup_successful,
	        messages,
	        errors,
	      },
	    } = this.props

	    return (
	        <div>
	        <br/>
			    <Col lg={{ size: 4, offset: 4 }}>
				    <Card>
			            <div className="header">
			              <img src={logo} className="App-logo" alt="logo" />
		                  <h4 className="title">SIGNUP</h4>
		                </div>
						<form onSubmit={handleSubmit(this.submit)}>
					        <Col lg={{ size: 12, offset: 0 }}>
					        <Field 
					            name="name"
					            label="Name"
					            type="text"
					            component={renderField}
					            placeholder="Enter Name"
					            validate={[ required, minValue6, maxLength15 ]}
					        />

					        </Col>
					        <br/>
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
					        </Col>
					        <br/>
					        <Col lg={{ size: 12, offset: 0 }}>
					        <button className="btn btn-info btn-block">SIGNUP</button>
					        </Col>
					       
			                <br/>
				            <div>
					     
					        {!requesting && !!errors.length && (
					            <Errors message="Failure to signup due to:" errors={errors} />
					        )}

					        {requesting && !!messages.length && (
					            <Messages messages={messages} />
					        )}

					        {!requesting && signup_successful && (
					            <div>
					               <Redirect to="/" />
					            </div>
					        )}

					        {/* Redux Router's <Link> component for quick navigation of routes */}
					        {!requesting && !signup_successful && (
					            <Link to="/">Already Signup? Login here »</Link>
					        )}
						    </div>
						</form>
				    </Card> 
			    </Col>
			</div>
	    )
    }
}

const mapStateToProps = state => ({  
  signup: state.signup,
})

const connected = connect(mapStateToProps, { signupRequest })(Signup)

const formed = reduxForm({  
  form: 'signup',
})(connected)

export default formed  

