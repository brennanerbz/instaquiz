import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
	static propTypes = {
	}

	render() {
		return (
			<div className="display_flex flex_horizontal">
				<div className="flex_container_left">
					Logo
				</div>
				<div style={{marginLeft: 'auto'}} className="flex_container_right">
					Link
				</div> 
			</div>
		);
	}
}
