import React, { Component, PropTypes } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default class ProcessingModal extends Component {
	static propTypes = {
	}

	state = {
		messages: ['Fetching article...', 'Reading article...', 'Finding key concepts...', 'Transforming material...'],
		currentMessage: 0
	}

	processingTimer = {}

	componentDidMount() {
		this.processingTimer = setInterval(() => {
			const { currentMessage } = this.state;
			this.setState({currentMessage : currentMessage + 1});
		}, 1000)
	}

	componentDidUpdate(prevProps, prevState) {
		const { messages, currentMessage } = this.state;
		if(currentMessage >= messages.length) {
			this.setState({currentMessage: 0})
			clearInterval(this.processingTimer)
			this.props.close()
		}
	} 

	render() {
		const { messages, currentMessage } = this.state;
		return (
			<div style={{width: '100%'}} className="display_flex flex_vertical flex_center">
				<LoadingSpinner/>
				<h1 style={{fontSize: '19px', fontWeight: '600', color: '#2C3239'}}>
				{messages[currentMessage]}
				</h1>
			</div>
		);
	}
}
