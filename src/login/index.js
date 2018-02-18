import React, { Component } from 'react';  
import { reduxForm, Field } from 'redux-form';  
import { connect } from 'react-redux';  
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Messages from '../notifications/Messages';  
import Errors from '../notifications/Errors';
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

  componentDidMount() {
   	window.jQuery('.title').css('color', '#000');
  } 
 
  static propTypes = {
    handleSubmit: PropTypes.func,
    loginRequest: PropTypes.func,
    client:  PropTypes.shape({
      token: PropTypes.object,
    }),
    login: PropTypes.shape({
      requesting: PropTypes.bool,
      //successful: PropTypes.bool,
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
        messages,
        errors,
        token,
      },
      signup: {
      	signup_successful,
      },
    } = this.props

    return (
     
		    <div className="container">
              <br /> <br />
		      <div className="auth-messages">
		          {!requesting && !!errors.length && (
		          	<div className="alert alert-info alert-dismissable text-center">
				      <Errors message="Failure to login due to:" errors={errors} />
			        </div>  
		          )}
		          {requesting && !!messages.length && !token && (
		          	<div className="alert alert-info alert-dismissable text-center">
				      <Messages messages={messages} />
			        </div>    
		          )}

		          {!requesting && signup_successful && (
				    <div className="alert alert-info alert-dismissable text-center">
					    <strong>Signup was successful!</strong>
				    </div>         
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
							        component={renderField}
							        placeholder="your Password"
							        validate={[ required ]}
						        />
							</div>
						</div>

						<div className="form-group">
						      <button disabled={requesting && !!messages.length} className="btn btn-primary btn-block btn-lg btn-block">Login</button> 
						</div>

						<div className="login-register">
				             <Link to="/signup">Signup</Link>
				        </div>
					</form>
				</div>
			</div>
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
