import React, { Component, PropTypes } from 'react';

export default class SignupModal extends Component {
	static propTypes = {
	}

	render() {
		const { isMobile } = this.props;
		const headerStyle = {
			color: '#2C3239',
			fontWeight: '600',
			fontSize: isMobile ? '17px' : '22px',
			margin: '25px 0 15px 0!important'
		}
		const noteStyle = {
			color: '#8492A6',
			fontWeight: '400',
			fontSize: isMobile ? '14px' : '17px',
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
		const bigMargin = {
			margin: '10px 0 10px 0'
		}
		return (
			<div className="display_flex flex_center flex_vertical">
				<h1 style={headerStyle}>Sign up for free!</h1>
				<p style={noteStyle}>Nightly is free as long as you want for an unlimited amount of assignments.</p>
				<div style={formWrapper} className="flex_vertical">
					<input 
						autoFocus={true}
						style={bigMargin}
						type="text"
						placeholder="Email address"/>
					<input 
						style={bigMargin}
						type="text"
						placeholder="Username (your students will see)"/>
					<input 
						style={bigMargin}
						type="password"
						placeholder="Password"/>
					<button style={bigButton} className="button primary_blue">
					Create your free account
					</button>
				</div>
			</div>
		);
	}
}
