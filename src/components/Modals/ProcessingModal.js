import React, { Component, PropTypes } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Radium from 'radium';
import color from 'color';

@Radium
export default class ProcessingModal extends Component {
	static propTypes = {
	}

	state = {
		createMessage: 'Creating assignment...',
		fetchMessage: 'Fetching article...',
		messages: ['Reading text...', 'Finding key concepts...', 'Creating questions...'],
		currentMessage: 0,
		width: 0
	}

	processingTimer = {}

	componentDidMount() {
		this.setState({
			width: window.innerWidth,
		});
		const { text } = this.props;
		const textLength = text.length;
		const time = (textLength * 0.02) + (textLength < 5000 ? 750 : 1000)
		this.processingTimer = setInterval(() => {
			const { currentMessage, messages } = this.state;
			const length = messages.length - 1;
			this.setState({currentMessage : currentMessage < length ? currentMessage + 1 : length});
		}, time)
	}

	componentDidUpdate(prevProps, prevState) {
		const { messages, currentMessage } = this.state;
		const { loaded, title } = this.props;
		if(currentMessage >= messages.length) {
			clearInterval(this.processingTimer)
		}
	} 

	componentWillReceiveProps(nextProps) {
		if(nextProps.error && nextProps.error === 404) {
			clearInterval(this.processingTimer)
		}
	}

	componentWillUnmount() {
		clearInterval(this.processingTimer)
	}

	render() {
		const { isMobile } = this.props;
		// Creating
		const { messages, currentMessage } = this.state;
		// Fetching
		const { fetchMessage } = this.state;
		// Deleting items, but creating assignment
		const { createMessage } = this.state;
		// Size of spinner
		const { size } = this.props;
		// Fetching or creating messages
		const { fetching, creating, deleting } = this.props;
		// Height
		const { width } = this.state;
		var minHeight = 0;
		if(width <= 320) {
			minHeight = 305
		} else if (width <= 375) {
			minHeight = 405
		} else if (width <= 405) {
			minHeight = 555
		} else if (width <= 505) {
			minHeight = 305
		}
		const styles = {
			container: {
				width: '100%', 
				margin: '2em 0',
				height: (deleting && isMobile) ? minHeight + 80 + 'px' : minHeight - 75 + 'px'
			}
		}
		return (
			<div 
				style={styles.container} 
				className="display_flex flex_vertical flex_center">
				<LoadingSpinner size={size}/>
				<h1 style={{display: 'block', margin: '-10px 0 0px 0', fontSize: '19px', fontWeight: '600', color: '#2C3239'}}>
				{creating && messages[currentMessage]}
				{fetching && fetchMessage}
				{deleting && createMessage}
				</h1>
			</div>
		);
	}
}
