import React, { Component, PropTypes } from 'react';


export default class LoadingSpinner extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./LoadingSpinner.scss');
		return(
			<div className={style.loader}>
			</div>
		);
	}
}