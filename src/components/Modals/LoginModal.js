import React, { Component, PropTypes } from 'react';

export default class LoginModal extends Component {
	static propTypes = {
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
		const inputStyle = {
			lineHeight: '17px',
			margin: '10px 0 10px 0'
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
						autoFocus={true}
						style={inputStyle}
						type="text"
						placeholder="Email address"/>
					<input 
						style={inputStyle}
						type="password"
						placeholder="Password"/>
					<button style={bigButton} className="button primary_blue">
					Sign in
					</button>
				</div>
			</div>
		);
	}
}
