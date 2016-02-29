import React, { Component, PropTypes } from 'react';

export default class PhoneModal extends Component {
	static propTypes = {
	}

	state = {
		phoneNumber: '',
		error: false
	}

	componentDidMount() {
		setTimeout(() => {
			this.refs.link_to_homework.select()
		}, 100)
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
		const linkToHomework = this.props.path.split('/')[2]
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
						fontSize: isMobile ? '17px' : '22px',
						margin: '10px 0 5px 0!important'
					}}>
						Share this link with your students!
					</h1>
					<p
					style={{
						color: '#A8B6C1',
						fontWeight: '400',
						fontSize: isMobile ? '15.5px' : '19px',
						margin: isMobile ? '5px 0 10px 0!important' : '10px 0 15px 0',
						width: isMobile ? '100%' : '75%'
					}}>
						Your students will read the content, then answer the questions you selected.
					</p>
					<input
					onClick={() => this.refs.link_to_homework.select()}
					ref="link_to_homework"
					readOnly={true}
					style={{background: '#F9FAFC', width: '95%', margin: '10px 0', border: '1px solid #DAE0E7!important'}}
					value={`https://nightly.com/homework/${linkToHomework}/read`}
					/>
				</div>
			</div>
		);
	}
}

/*
<button 
onClick={::this.submitPhoneNumber}
style={{
	margin: '5px 0px',
	width: '95%'
}} 
className="button primary_blue">
	Copy Link!
</button>
*/