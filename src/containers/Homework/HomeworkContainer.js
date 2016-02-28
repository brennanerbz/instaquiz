import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';

import * as homeworkActions from '../../redux/modules/homework';

function fetchData(getState, dispatch) {
	const promises = [];
	const token = getState().router.params.token;
	const sequences = cookie.load('sequences', {path: '/'})
	if(sequences && sequences[token]) {
		promises.push(dispatch(fetchSequence(sequences[token])))
	} else {
		promises.push(dispatch(newSequence(token)))
	}
	return Promise.all(promises)
}

// @connectData(fetchData)
@connect(state => ({
		route_token: state.router.params.token,
		title: state.homework.title,
		reading: state.homework.reading,
		identifier: state.homework.identifier,
		sequence: state.homework.sequence,
		question: state.homework.question
	}),
	dispatch => ({
		...bindActionCreators({
			...homeworkActions,
			pushState
		}, dispatch)
	})
)
export default class HomeworkContainer extends Component {
	static propTypes = {
	}

	componentDidMount() {
		const { route_token } = this.props;
		const { fetchSequence, newSequence } = this.props;
		const sequences = cookie.load('sequences', {path: '/'})
		if(sequences && sequences[route_token]) {
			fetchSequence(sequences[route_token])
		} else {
			newSequence(route_token)
		}
	}

	render() {
		var homeworkChildrenWithProps = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, {
				props: true
			})
		})
		return (
			<div>
				<h1>Homework</h1>
				{homeworkChildrenWithProps}
			</div>
		);
	}
}
