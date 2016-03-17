import React, { Component, PropTypes } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Radium from 'radium';
import color from 'color';

@Radium
export default class ProcessingModal extends Component {
	static propTypes = {
	}

	state = {
		fetchMessage: 'Fetching article...',
		messages: ['Reading...', 'Finding key concepts...', 'Transforming material...'],
		currentMessage: 0,
		width: 0
	}

	processingTimer = {}

	componentDidMount() {
		this.setState({
			width: window.innerWidth,
		});
		this.processingTimer = setInterval(() => {
			const { currentMessage, messages } = this.state;
			this.setState({currentMessage : currentMessage + 1});
		}, 1000)
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
		// Creating
		const { messages, currentMessage } = this.state;
		// Fetching
		const { fetchMessage } = this.state;
		// Size of spinner
		const { size } = this.props;
		// Fetching or creating messages
		const { fetching, creating } = this.props;
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
				height: minHeight - 75 + 'px'
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
				</h1>
			</div>
		);
	}
}
