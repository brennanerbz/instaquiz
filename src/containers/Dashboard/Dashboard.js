import React, { Component, PropTypes } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';

// Actions
import * as assignmentActions from '../../redux/modules/assignments';
import * as overlayActions from '../../redux/modules/overlays';

import { AssignmentList } from '../../components';

@connect(state => ({
		assignments: state.assignments.assignments,
	}),
	dispatch => ({
		...bindActionCreators({
			...assignmentActions,
			...overlayActions,
			pushState
		}, dispatch)
	})
)
export default class Dashboard extends Component {
	static propTypes = {
	}

	componentWillMount() {
		const token = cookie.load('token', {path: '/'})
		this.props.fetchAssignments(token)
	}

	render() {
		return (
			<AssignmentList 
			isMobile={this.props.isMobile}
			assignments={this.props.assignments} 
			pushState={this.props.pushState}/>
		);
	}
}
