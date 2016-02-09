import React, { Component, PropTypes } from 'react';

export default class Footer extends Component {
	static propTypes = {
	}

	render() {
		return (
			<div style={{position: 'absolute', bottom: '0', width: '100%'}}>
				<div className="display_flex flex_horizontal">
					<div className="flex_container_left">
						About
					</div>
					<div style={{marginLeft: 'auto'}} className="flex_container_right">
						Contact Us
					</div> 
				</div>
			</div>
		);
	}
}
