import React, { Component, PropTypes } from 'react';

export default class QuizHeader extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./QuizHeader.scss');
		const { isMobile, scrolling, title, definition, count, loaded } = this.props;
		return (
			<div 
				style={{textAlign: isMobile ? 'center' : '', padding: !isMobile ? '6em 25px 0 25px' : '5em 0 0 0'}} 
				className={isMobile ? 'flex_container_center' : ''}>
				<h1
				style={{
					fontSize: isMobile ? '28px' : '32px',
					fontWeight: '600',
					color: '#2C3239',
					marginBottom: '5px'
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
				{
					scrolling && !isMobile
					&&
					<button 
						id={style.scrolling_button}
						style={{
							zIndex: '1',
							position: 'fixed',
							top: '11px'
						}} 
						className="button primary_green">
						{
							loaded
							? 'Quiz me'
							: 'Loading...'
						}
					</button>
				}
				<p
				className={isMobile ? 'flex_item_align_center' : 'flex_item_align_left'}
				style={{
					fontSize: isMobile ? '14px' : '16px',
					fontWeight: '400',
					marginBottom: '1em',
					padding: isMobile ? '0 1em' : '' ,
					maxWidth: isMobile ? '350px' : '',
					textAlign: isMobile ? 'center' : ''
				}}>
				{definition}
				</p>
				<button 
					onClick={() => {this.props.openModal('phone')}}
					style={{
						zIndex: '0',
						width: isMobile ? '250px' : ''
					}} 
					className="button primary_green">
					Quiz Me
				</button>
			</div>
		);
	}
}
