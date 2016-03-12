import React, { Component, PropTypes } from 'react';

export default class QuizHeader extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./QuizHeader.scss');
		const { isMobile, title, count } = this.props;
		const { promptOpen } = this.props;
		return (
			<div 
				style={{textAlign: isMobile ? 'center' : '', 
				padding: !isMobile ? `${promptOpen ? '5em' : '6em'} 25px 0 25px` : `${promptOpen ? '1em' : '5em'} 0 0 0`}} 
				className={isMobile ? 'flex_container_center' : ''}>
				<h1
				style={{
					fontSize: isMobile ? '21px' : '32px',
					fontWeight: '600',
					color: '#333333',
					marginBottom: '5px',
					padding: isMobile ? '0 1em' : ''
				}}>
					{title}
				</h1>
				<p
				style={{
					fontSize: isMobile ? '16px' : '18px',
					fontWeight: '400',
					color: '#A8B6C1',
					marginBottom: '1em'
				}}>
					{count} questions
				</p>
				<button 
					onClick={() => {this.props.openModal('phone')}}
					style={{
						zIndex: '0',
						width: isMobile ? '250px' : ''
					}} 
					className="button primary_blue">
					Assign
				</button>
			</div>
		);
	}
}
