import React, { Component, PropTypes } from 'react';

import Landing from '../Landing/Landing';
import Dashboard from '../Dashboard/Dashboard';

export default class IndexRoute extends Component {
	static propTypes = {
	}

	render() {
		const { user, teacher } = this.props;
		return (
			user && teacher ? <Dashboard/> : <Landing {...this.props}/>	
		);
	}
}
