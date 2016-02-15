import React, { Component, PropTypes } from 'react';

export default class Success extends Component {
	static propTypes = {
	}

	render() {
		const check = require('./SuccessCheck.png');
		return (
			<div className="display_flex flex_vertical flex_container_center">
				<img style={{height: '75px', margin: '1em 0'}} src={check}/>
				<h1 style={{fontSize: '1.5em', fontWeight: '600', color: '#2C3239'}}>Success!</h1>
			</div>
		);
	}
}
