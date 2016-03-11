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
  	token: state.user.token,
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
export default class LoginModal extends Component {
	static propTypes = {
	}

	state = {
		empty: {
			email: false,
			password: false
		},
		error: {
			email: null,
			password: null
		}
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.error && nextProps.error) {
			this.setState({
				error: {
					email: nextProps.error.match(/email/g) ? nextProps.error : null,
					password: nextProps.error.match(/password/g) ? nextProps.error : null,
				}
			});
		}
		if(!this.props.token && nextProps.token) {
			const token = cookie.load('token', {path: '/'})
			this.props.fetchUser(token)
		}
		if(!this.props.loaded && nextProps.loaded) {
			this.props.close()
		}
	}

	handleFetchToken() {
		const email = this.refs.email.value
		const password = this.refs.password.value
		if(isEmpty(email) || isEmpty(password)) {
			this.setState({
				empty: {
					email: isEmpty(email),
					password: isEmpty(password)
				}})
			return;
		}
		if(validateEmail(email) && password.length > 5) {
			this.props.fetchToken(email, password)
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
			margin: '0 0 25px 0'
		}
		const formWrapper = {
			width: '95%'
		}
		const bigButton = {
			height: '50px',
			margin: '10px 0 10px 0'
		}
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
				onClick={() => {
					this.props.close()
				}} 
				src={deleteIcon} 
				style={{
					height: isMobile ? '15px' : '16px',
					position: 'absolute',
					top: isMobile ? '1.25em' : '2em',
					right: '2em',
					cursor: 'pointer'
				}}/>
				<h1 style={headerStyle}>Welcome back!</h1>
				<p style={noteStyle}>Sign into your account here:</p>
				<div style={formWrapper} className="flex_vertical">
					<input 
						ref="email"
						onChange={(e) => {
							this.setState({
								empty: {
									email: false,
									password: this.state.empty.password
								},
								error: {
									email: null,
									password: this.state.error.password
								},
							});
						}}
						autoFocus={true}
						style={[inputStyle.input, (empty.email || error.email) && inputStyle.error]}
						type="text"
						placeholder="Email address"/>
					{empty.email && <p style={errorMessage}>Oops! You didn't enter your email!</p>}
					{error.email && <p style={errorMessage}>{error.email}</p>}
					<input 
						ref="password"
						onChange={(e) => {
							this.setState({
								empty: {
									email: this.state.empty.email,
									password: false
								},
								error: {
									email: this.state.error.email,
									password: null
								}
							})
						}}
						style={[inputStyle.input, (empty.password || error.password) && inputStyle.error]}
						type="password"
						placeholder="Password"
						/>
					{empty.password && <p style={errorMessage}>No password? You need a password!</p>}
					{error.password && <p style={errorMessage}>{error.password}</p>}
					<button 
					onClick={() => this.handleFetchToken()}
					style={bigButton} 
					className="button primary_blue">
					Sign in
					</button>
				</div>
			</div>
		);
	}
}
