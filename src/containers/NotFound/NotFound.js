import React, { Component, PropTypes } from 'react';

export default class NotFound extends Component {
	static propTypes = {
	}

	componentDidMount() {
		const { pushState } = this.props;
		pushState(null, '/')
	}

	render() {
		return (
			<div>
			</div>
		);
	}
}
