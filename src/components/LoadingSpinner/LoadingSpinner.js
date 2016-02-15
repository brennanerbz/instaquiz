import React, { Component, PropTypes } from 'react';


export default class LoadingSpinner extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./LoadingSpinner.scss');
		const { size } = this.props;
		return (
			<div style={{fontSize: size + 'px'}} className={style.loader}>
			</div>
		);
	}
}
