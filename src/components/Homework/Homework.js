import React, { Component, PropTypes } from 'react';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default class Homework extends Component {
	static propTypes = {
	}

	state = {
		touching: false
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.question_selected && !nextProps.question_selected) this.refs.next_link.blur()
	}

	render() {
		const { isMobile, location, question_selected } = this.props;
		var homeworkChildrenWithProps = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, ...this.props)
		})
		const { loading } = this.props;
		// Header
		const forwardArrow = require('../../../static/icons/forwardArrow.png')
		const forwardArrowGrey = require('../../../static/icons/forwardArrowGrey.png')
		const homeworkView = location.pathname.match(/homework/gi);
		const readingView = location.pathname.match(/read/gi);
		const questionsView = location.pathname.match(/questions/gi);
		const { touching } = this.state;
		console.log('touching: ', touching)
		return (
			<div style={{maxWidth: '750px', height: '100%'}} 
				 className="display_flex flex_container_center">
				<div style={{width: '100%', height: '100%'}} className="flex_vertical">
					{homeworkView && questionsView && isMobile &&
					<span 
					onTouchStart={() => this.setState({touching: true})}
					onTouchEnd={() => {
						this.setState({touching: false})
					}}
					onClick={() => {
						if(question_selected) this.props.submitAnswer()
					}}
					style={{position: 'fixed', right: '10px', top: '18px', zIndex: '1000'}}>
						<a 
						ref="next_link" 
						style={{marginRight: '27px', opacity: touching && question_selected ? '0.7' : '1'}} 
						className={(question_selected ? '' : (touching ? '' : 'grey')) + ' ' + 'link'}>Next</a>
						<img 
						src={question_selected ? forwardArrow : forwardArrowGrey} 
						style={{height: '18.5px', position: 'absolute', right: '10px', top: '0', opacity: touching && question_selected ? '0.5' : '1'}}/>
					</span>}
					<div style={{padding: isMobile ? '3.5em 0 0' : '5em 25px', height: '100%'}}>
					{loading && <LoadingSpinner size={4}/>}
					{!loading && homeworkChildrenWithProps}
					</div>
				</div>
			</div>
		);
	}
}
