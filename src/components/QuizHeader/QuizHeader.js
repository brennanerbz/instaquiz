import React, { Component, PropTypes } from 'react';

export default class QuizHeader extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./QuizHeader.scss');
		const { params } = this.props;
		const { isMobile, title, count } = this.props;
		const { promptOpen } = this.props;
		const styles = {
			 container: {
			 	textAlign: isMobile ? 'center' : '', 
				padding: !isMobile ? `${promptOpen ? '5em' : '6em'} 25px 0 25px` : `${promptOpen ? '1em' : '5em'} 0 0 0`
			 },
			 header: {
			 	fontSize: isMobile ? '21px' : '32px',
			 	fontWeight: '600',
			 	color: '#333333',
			 	marginBottom: '5px',
			 	padding: isMobile ? '0 1em' : ''
			 },
			 count: {
			 	fontSize: isMobile ? '16px' : '18px',
			 	fontWeight: '400',
			 	color: '#A8B6C1',
			 	marginBottom: '1em'
			 },
			 buttonWrapper: {

			 },
			 button: {
			 	zIndex: '0',
			 	margin: '0 0 0 10px'
			 }
		}
		return (
			<div style={styles.container} className={isMobile ? 'flex_container_center' : ''}>
				<h1 style={styles.header}>
					{title}
				</h1>
				<p style={styles.count}>
					{count} questions
				</p>
				<span style={styles.buttonWrapper} className={'display_flex flex_horizontal' + ' ' + (isMobile && 'flex_center')}>
					<button 
						onClick={() => {this.props.openModal('phone')}}
						style={styles.button}
						className="button primary_blue">
						Share
					</button>
					<button 
						onClick={() => this.props.pushState(null, `/homework/${params.token}/read`)}
						style={styles.button}
						className="button primary_white">
						Preview
					</button>
				</span>
			</div>
		);
	}
}
