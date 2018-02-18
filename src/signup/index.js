import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';  
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

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


let eValue
function handleInputChange (property) {
  return (e) => {
    this.setState({ [property]: e.target.value })
    return eValue = e.target.value
  }
}

const password2 = value =>
  value && value !== eValue ?
  'Invalid Password' : undefined


class Signup extends Component {

	constructor(props) {
	    super(props);
	    this.handleInputChange = handleInputChange.bind(this)
	}

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
	        messages,
	        errors,
	        signup_successful,
	      },
	    } = this.props

	    return (
	     
			<div className="container">
            <br /> <br />
		    <div className="auth-messages text-center">
	            {!requesting && !!errors.length && (
	            	<div className="alert alert-info alert-dismissable text-center">
                       <Errors message="Failure to signup due to:" errors={errors} />
			        </div>
				)}

				{requesting && !!messages.length && (
					<div className="alert alert-info alert-dismissable text-center">
                        <Messages messages={messages} />
			        </div>
				)}

				{!requesting && signup_successful && (
					<Redirect to="/" />
				)}
		    </div>

			<div className="row main">
				<div className="panel-heading">
	               <div className="panel-title text-center">
	               		<h1 className="title">React-Redux Auth Demo</h1>
	               		<hr />
	               	</div>
	            </div> 

				<div className="main-login main-center">

					<form onSubmit={handleSubmit(this.submit)}>

				    	<div className="form-group">
						<label className="cols-sm-2 control-label">Name</label>
					    <div className="cols-sm-10">
							    <Field
						            name="name"
							        label="Name"
							        type="name"
							        component={renderField}
							        placeholder="your Name"
							        validate={[ required, minValue6 ]}
						        />
						</div>

						</div>
						
						<div className="form-group">
							<label className="cols-sm-2 control-label">Your Email</label>
							<div className="cols-sm-10">
							
								<Field
						            name="email"
							        label="Email"
							        type="email"
							        component={renderField}
							        placeholder="your Email"
							        validate={[ required, email ]}
						        />
								
							</div>
						</div>

						<div className="form-group">
							<label className="cols-sm-2 control-label">Password</label>
						    <div className="cols-sm-10">
							    <Field
						            name="password"
							        label="Password"
							        type="password"
							        onChange={this.handleInputChange('text1')}
							        component={renderField}
							        placeholder="your Password"
							        validate={[ required, maxLength15 ]}
						        />
							</div>

						</div>

						<div className="form-group">
							<label className="cols-sm-2 control-label">Password Confirmation</label>
						    <div className="cols-sm-10">
								    <Field
							            name="password2"
								        label="Password2"
								        type="password"
								        component={renderField}
								        placeholder="Confirm your Password"
								        validate={[ required, password2 ]}
							        />
							</div>

						</div>

						<div className="form-group">
							   <button disabled={requesting && !!messages.length} className="btn btn-primary btn-block btn-lg btn-block">Signup</button>
						</div>
						<div className="login-register">
				             <Link to="/">Login</Link>
				         </div>
					</form>
				</div>
			</div>
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

