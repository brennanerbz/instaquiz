import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
	static propTypes = {
	}

	render() {
		const { isMobile } = this.props;
		return (
			<div 
				style={{
					width: '100%', 
					height: '48px', 
					lineHeight: '48px',
					padding: '0 25px'
				}} 
				className="display_flex flex_horizontal">
				{
					isMobile
					&&
					<div style={{marginLeft: 'auto'}} className="flex_container_right">
						<a className="link">How It Works</a>
					</div> 
				}
			</div>
		);
	}
}
