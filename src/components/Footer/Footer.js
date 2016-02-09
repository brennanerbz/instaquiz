import React, { Component, PropTypes } from 'react';

export default class Footer extends Component {
	static propTypes = {
	}

	render() {
		return (
			<div style={{
				position: 'fixed', 
				background: '#fff',
				bottom: '0', 
				width: '100%', 
				height: '48px', 
				lineHeight: '48px',
				padding: '0 50px'
			}}>
				<div className="display_flex flex_horizontal">
					<div 
						className="flex_container_left grey">
						<a style={{color: '#A8B6C1', fontWeight: '500', textDecoration: 'none'}}>&copy; Quizly 2016.</a>
					</div>
					<div 
						style={{marginLeft: 'auto'}} 
						className="flex_container_right grey">
						<a style={{color: '#A8B6C1'}} className="link">Contact us</a>
					</div> 
				</div>
			</div>
		);
	}
}
