import React, { Component, PropTypes } from 'react';

export default class QuizHeader extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./QuizHeader.scss');
		const { isMobile } = this.props;
		return (
			<div 
				style={{paddingTop: '6em', textAlign: isMobile ? 'center' : ''}} 
				className={isMobile ? 'flex_container_center' : ''}>
				<h1
				style={{
					fontSize: isMobile ? '28px' : '32px',
					fontWeight: '600',
					color: '#2C3239',
					marginBottom: '5px'
				}}>
					Set title
				</h1>
				<p
				style={{
					fontSize: isMobile ? '16px' : '18px',
					fontWeight: '400',
					color: '#A8B6C1',
					marginBottom: '30px'
				}}>
					Questions count
				</p>
				<button className="button primary_green">
					Quiz me
				</button>
			</div>
		);
	}
}
