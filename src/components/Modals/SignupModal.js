import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import color from 'color';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import cookie from 'react-cookie';

import * as userActions from '../../redux/modules/user';
import { validateEmail, isEmpty } from '../../utils/helperfunctions';

@connect(
  state => ({
  	user: state.user.user,
  	error: state.user.error,
  	loaded: state.user.loaded
  }),
  dispatch => ({
    ...bindActionCreators({
      ...userActions,
      pushState
    }, dispatch)
  })
)
@Radium
export default class SignupModal extends Component {
	static propTypes = {
	}

	state = {
		empty: {
			username: false,
			email: false,
			password: false
		},
		error: {
			username: null,
			email: null,
			password: null
		}
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.error && nextProps.error) {
			this.setState({
				error: {
					username: nextProps.error.match(/username/g) ? nextProps.error : null,
					email: nextProps.error.match(/email/g) ? nextProps.error : null,
				}
			});
		}
		if(!this.props.loaded && nextProps.loaded) {
			this.props.close()
		}
	}

	signUp() {
		const token = cookie.load('token', {path: '/'})
		const username = this.refs.username.value
		const email = this.refs.email.value
		const password = this.refs.password.value
		if(isEmpty(username) || isEmpty(email) || isEmpty(password)) {
			this.setState({
				empty: {
					username: isEmpty(username),
					email: isEmpty(email),
					password: isEmpty(password)
				}})
			return;
		}
		if(validateEmail(email) && password.length > 5) {
			if(token) this.props.updateUser(username, email, password, token) 
			else this.props.createUser(username, email, password)
		} else {
			this.setState({
				error: {
					email: !validateEmail(email) && 'Please enter a valid email address',
					password: password.length < 6 && 'Your password needs to be 6 characters or longer'
				} 
			});
		}
	}	

	render() {
		const { isMobile } = this.props;
		const deleteIcon = require('../../../static/icons/delete.png');
		const closeStyle = {
			height: isMobile ? '15px' : '16px',
			position: 'absolute',
			top: isMobile ? '1.25em' : '2em',
			right: '2em',
			cursor: 'pointer'
		}
		const headerStyle = {
			color: '#2C3239',
			fontWeight: '600',
			fontSize: isMobile ? '21px' : '22px',
			margin: '25px 0 15px 0!important'
		}
		const noteStyle = {
			color: '#8492A6',
			fontWeight: '400',
			fontSize: isMobile ? '16px' : '17px',
			margin: '0 0 25px 0',
			textAlign: 'center',
			lineHeight: '1.2'
		}
		const formWrapper = {
			width: '95%'
		}
		const bigButton = {
			height: '50px',
			margin: '10px 0 10px 0'
		}
		// Validation 
		const successIcon = require('../../../static/icons/success.png');
		const errorIcon = require('../../../static/icons/error.png');
		const { empty, error } = this.state;
		const inputStyle = {
			input: {
				lineHeight: isMobile ? '18px' : '40px',
				margin: '10px 0 10px 0'
			},
			success: {

			},
			error: {
				border: '1px solid red'
			}
		}
		const errorMessage = {
			fontSize: '14px',
			lineHeight: '14px',
			color: 'red'
		}
		return (
			<div className="display_flex flex_center flex_vertical">
				<img 
				onClick={() => {this.props.close()}} 
				src={deleteIcon} 
				style={closeStyle}/>
				<h1 style={headerStyle}>Sign up for free!</h1>
				<p style={noteStyle}>Nightly is free as long as you want for an unlimited amount of assignments.</p>
				<div style={formWrapper} className="flex_vertical">
					<input 
						ref="email"
						autoFocus={true}
						onChange={(e) => {
							this.setState({
								empty: {
									email: false,
									username: this.state.empty.username,
									password: this.state.empty.password
								},
								error: {
									email: null,
									username: this.state.empty.username,
								},
							});
						}}
						style={[inputStyle.input, (empty.email || error.email) && inputStyle.error]}
						type="text"
						placeholder="Email address"/>
					{empty.email && <p style={errorMessage}>Oops! You didn't enter your email!</p>}
					{error.email && <p style={errorMessage}>{error.email}</p>}
					<input 
						ref="username"
						onChange={(e) => {
							this.setState({
								empty: {
									email: this.state.empty.email,
									username: false,
									password: this.state.empty.password
								},
								error: {
									email: this.state.error.email,
									username: null
								},
							});
						}}
						style={[inputStyle.input, (empty.username || error.username) && inputStyle.error]}
						type="text"
						placeholder="Username (your students will see)"/>
					{empty.username && <p style={errorMessage}>Oh no! You didn't enter your username!</p>}
					{error.username && <p style={errorMessage}>{error.username}</p>}
					<input 
						ref="password"
						onChange={(e) => {
							this.setState({
								empty: {
									email: this.state.empty.email,
									username: this.state.empty.username,
									password: false
								},
								error: {
									email: this.state.error.email,
									username: this.state.error.username,
									password: null
								}
							});
						}}
						onKeyDown={(e) => {if(e.which === 13) this.signUp()}}
						style={[inputStyle.input, (empty.password || error.password) && inputStyle.error]}
						type="password"
						placeholder="Password"/>
					{empty.password && <p style={errorMessage}>No password? You need a password!</p>}
					{error.password && <p style={errorMessage}>{error.password}</p>}
					<button 
						onClick={() => this.signUp()}
						style={bigButton} 
						className="button primary_blue">
					Create your free account
					</button>
				</div>
			</div>
		);
	}
}


