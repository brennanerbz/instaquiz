import React, { Component, PropTypes } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

export default class PhoneModal extends Component {
	static propTypes = {
	}

	componentDidMount() {
		setTimeout(() => {
			this.refs.link_to_homework.setSelectionRange(0, this.refs.link_to_homework.value.length)
		}, 100)
	}

	render() {
		const style = require('./Modals.scss');
		const chatBubbles = require('../../../static/ChatBubbles.png');
		const { isMobile } = this.props;
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
					onClick={() => {
						if(!isMobile) {
							this.refs.link_to_homework.select()
						}
					}}
					onTouchStart={() => {
						if(isMobile) {
							this.refs.link_to_homework.setSelectionRange(0, this.refs.link_to_homework.value.length)
						}						
					}}
					ref="link_to_homework"
					readOnly={true}
					style={{
						background: '#F9FAFC', 
						width: '95%', 
						margin: '10px 0', 
						border: '1px solid #DAE0E7!important',
						lineHeight: '18px'
					}}
					value={`https://nightly.com/homework/${linkToHomework}/read`}
					/>
					<CopyToClipboard 
					text={`https://nightly.com/homework/${linkToHomework}/read`} 
					onCopy={() => this.props.copy()}>
						<button 
						style={{
							margin: '5px 0px',
							width: '95%'
						}} 
						className="button primary_blue">
							Copy Link!
						</button>
					</CopyToClipboard>
				</div>
			</div>
		);
	}
}

/*

*/