import React, { Component, PropTypes } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

export default class PhoneModal extends Component {
	static propTypes = {
	}

	state = {
		copied: false
	}

	componentDidMount() {
		setTimeout(() => {
			this.refs.link_to_homework.setSelectionRange(0, this.refs.link_to_homework.value.length)
		}, 100)
	}

	render() {
		const style = require('./Modals.scss');
		const chatBubbles = require('../../../static/ChatBubbles.png');
		const deleteIcon = require('../../../static/icons/delete.png');
		const { isMobile } = this.props;
		const linkToHomework = this.props.path.split('/')[2]
		const { copied } = this.state;
		return(
			<div className="">
				<img 
				onClick={() => {
					this.props.close()
				}} 
				src={deleteIcon} 
				style={{
					height: isMobile ? '15px' : '16px',
					position: 'absolute',
					top: '2em',
					right: '2em',
					cursor: 'pointer'
				}}/>
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
					value={`https://nightly-app.herokuapp.com/homework/${linkToHomework}/read`}
					/>
					<CopyToClipboard 
					text={`https://nightly-app.herokuapp.com/homework/${linkToHomework}/read`} 
					onCopy={() => {
						this.setState({
							copied: true
						});
						this.props.copy()
					}}>
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
<div style={{textAlign: 'center', clear: 'both', width: '90%'}} className="display_flex flex_container_center relative">
	<div style={{margin: '10px auto', background: '#fff', zIndex: '1', padding: '0 1em'}} className="display_flex">
	or
	</div>
	<hr style={{position: 'absolute', top: '0rem', left: '0', right: '0', borderTop: '1px solid #e8e8e8'}} className="separator"/>
</div>
<button 
onClick={() => {
	this.props.close()
	this.props.pushState(null, `/homework/${linkToHomework}/read`)
}}
style={{width: '95%'}} className="button primary_white">
	See preview
</button>
*/