import React, { Component, PropTypes } from 'react';

export default class PhoneModal extends Component {
	static propTypes = {
	}

	state = {
		phoneNumber: '',
		error: false
	}

	submitPhoneNumber() {
		const { startQuiz } = this.props;
		var { phoneNumber } = this.state;
		var phoneNumberRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
		if(phoneNumber.match(phoneNumberRegExp)) {
			phoneNumber = phoneNumber.replace(/-/g, '')
			startQuiz(phoneNumber)
		}
		else {
			this.setState({
				error: true
			});
		}
	}

	render() {
		const style = require('./Modals.scss');
		const chatBubbles = require('../../../static/ChatBubbles.png');
		const { isMobile } = this.props;
		const { phoneNumber, error } = this.state;
		return(
			<div className="">
				<i 
				onClick={() => this.props.close()}
				style={{
					fontSize: '1em',
					position: 'absolute',
					top: '20px',
					right: '20px',
					color: '#A8B6C1',
					cursor: 'pointer'
				}} 
				className="fa fa-times">
				</i>
				<div
				style={{
					textAlign: 'center'
				}}
				className="display_flex flex_vertical flex_center">
					<img 
					style={{
						marginTop: isMobile ? '7.5px' : '1.5em',
						height: isMobile ? '95px' : '105px'
					}} 
					src={chatBubbles}/>
					<h1
					style={{
						color: '#2C3239',
						fontWeight: '600',
						fontSize: isMobile ? '17px' : '24px',
						margin: '10px 0 5px 0!important'
					}}>
						Enter phone number to take quiz
					</h1>
					<p
					style={{
						color: '#A8B6C1',
						fontWeight: '400',
						fontSize: isMobile ? '15.5px' : '19px',
						margin: isMobile ? '5px 0 10px 0!important' : '10px 0 15px 0',
						width: isMobile ? '100%' : '75%'
					}}>
						The quiz is messaging based. Don't worry, we're paying for everything.
					</p>
					<div 
					style={{
						margin: '10px 0px',
						padding: '7.5px 5px',
						borderTop: '1px solid',
						borderBottom: '1px solid',
						borderColor: error ? '#FE3034' : '#EEEEEE',
						width: isMobile ? '100%' : '78%',
						fontSize: isMobile ? '16px' : '18px'
					}} 
					className="input_wrapper flex_horizontal">
						<span style={{padding: '7.5px 5px', color: error ? '#FE3034' : ''}}>
							+1
						</span>
						<input 
						style={{
							background: '#fff',
							padding: '0px 0 0 10px',
							width: '100%',
							fontSize: isMobile ? '16px' : '18px',
							lineHeight: isMobile ? '17px' : '19px',
							color: error ? '#FE3034' : '',
						}}
						onChange={(e) => {
							var number = e.target.value;
							number = number.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
							this.setState({
								phoneNumber: number,
								error: false
							});
						}}
						onKeyDown={(e) => {
							if(e.which === 13) this.submitPhoneNumber()
						}}
						value={phoneNumber}
						ref="phone_number"
						placeholder="Phone Number #"
						type="text"
						pattern="[0-9]*"
						autoFocus={true}/>
					</div>
					{error && <p style={{color: error ? '#FE3034' : '', marginBottom: '5px'}}>Oops! Please enter a valid phone number</p>}
					<button 
					onClick={::this.submitPhoneNumber}
					style={{
						margin: '5px 0px',
						width: '80%'
					}} 
					className="button primary_green">
						Start
					</button>
				</div>
			</div>
		);
	}
}