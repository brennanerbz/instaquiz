import React, { Component, PropTypes } from 'react';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default class Homework extends Component {
	static propTypes = {
	}

	state = {
		touching: false
	}

	componentWillReceiveProps(nextProps) {
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
		// Finished
		const { showFinished, sequence } = this.props;
		const party = require('../../../static/icons/party.png')
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
						style={{marginRight: '27px', opacity: touching ? '0.7' : '1'}} 
						className={'link' + ' ' + (question_selected ? '' : 'grey_no_hover')}>Next</a>
						<img 
						src={question_selected ? forwardArrow : forwardArrowGrey} 
						style={{height: '18.5px', position: 'absolute', right: '10px', top: '0', opacity: touching ? '0.5' : '1'}}/>
					</span>}
					<div style={{padding: isMobile ? '3.5em 0 0' : '5em 25px', height: '100%'}}>
					{loading && <LoadingSpinner size={4}/>}
					{!loading && !showFinished && homeworkChildrenWithProps}
					{showFinished && 
					<div style={{height: '90%'}} className="display_flex flex_vertical flex_center flex_container_center">
						<h3 style={{fontSize: '21px', fontWeight: '600'}}>Here's your final score!</h3>
						<span 
						style={{
							borderRadius: '50%',
							border: '1px solid #1FB6FF',
							height: '100px',
							width: '100px',
							lineHeight: '95px',
							color: '#1FB6FF',
							fontWeight: '600',
							textAlign: 'center',
							fontSize: '24px',
							margin: '1em'
						}}
						className={{}}>
						{/*sequence.correct_count} / {sequence.correct_count + sequence.incorrect_count*/}
						{(sequence.correct_count / (sequence.correct_count + sequence.incorrect_count) * 100).toFixed(0)}%
						</span>
						<h3 style={{fontSize: '21px', fontWeight: '600'}}>See you soon!</h3>
						<img src={party} style={{height: '100px', margin: '2em'}}/>
					</div>}
					</div>
				</div>
			</div>
		);
	}
}
