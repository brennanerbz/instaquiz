import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
	static propTypes = {
	}

	render() {
		const { isMobile, show } = this.props;
		return (
			<div 
				style={{
					width: '100%', 
					height: isMobile ? '40px' : '48px', 
					lineHeight: isMobile ? '40px' : '48px',
					padding: '0 25px'
				}} 
				className="display_flex flex_horizontal">
				{
					isMobile
					&&
					<div style={{marginLeft: 'auto', marginTop: '10px'}} className="flex_container_right">
						<a onClick={() => this.props.openHowItWorks(!show)} className="link">How It Works</a>
					</div> 
				}
			</div>
		);
	}
}
