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
		location: state.router.location,
		route: state.router.location.pathname,
		route_token: state.router.params.token,
		title: state.homework.title,
		reading: state.homework.reading,
		identifier: state.homework.identifier,
		sequence: state.homework.sequence,
		question: state.homework.question,
		invalid: state.homework.invalid
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

	state = {
		answer: ''
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
		// Route control to prevent cheating
		if(this.props.sequence && this.props.sequence.reading_completed) {
			if(this.props.route.split('/')[3] == 'read') {
				this.props.pushState(null, `/homework/${route_token}/questions`)
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		const previousRoute = this.props.route.split('/')[3]
		const nextRoute = nextProps.route.split('/')[3]
		const token = nextProps.route.split('/')[2]
		if(previousRoute == 'read' && nextRoute == 'questions') {
			if(nextProps.sequence && !nextProps.sequence.reading_completed) {
				this.props.updateSequence(nextProps.identifier, token)
			} 
		}
		// Route control to prevent cheating
		if(previousRoute == 'questions' && nextRoute == 'read') {
			this.props.pushState(null, `/homework/${token}/questions`)
		}

		if((!this.props.question.completed && nextProps.question.completed) ||
			(!this.props.sequence && nextProps.sequence && nextProps.sequence.reading_completed) ||
			(!this.props.sequence.reading_completed && nextProps.sequence.reading_completed)) {
			this.props.fetchQuestion(this.props.sequence.token)
		}


	}

	submitAnswer() {
		const { sequence } = this.props;
		const { answer } = this.state;
		if(answer.length > 0) {
			this.props.submitAnswer(answer, sequence.token)
			this.setState({
				answer: ''
			});
		}
	}

	render() {
		var homeworkChildrenWithProps = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, {
				isMobile: this.props.isMobile,
				pushState: this.props.pushState,
				title: this.props.title,
				reading: this.props.reading,
				identifier: this.props.identifier,
				sequence: this.props.sequence,
				question: this.props.question,
				updateName: this.props.updateName,
				invalid: this.props.invalid,
				selected: this.props.selected,
				nameError: this.props.nameError,
				fetchSequence: this.props.fetchSequence,
				updateSequence: this.props.updateSequence,
				newSequence: this.props.newSequence,
				fetchQuestion: this.props.fetchQuestion,
				selectAnswer: (answer) => this.setState({answer: answer}),
				submitAnswer: ::this.submitAnswer,
				location: this.props.location
			})
		})
		return (<div style={{height: '100%'}}>{homeworkChildrenWithProps}</div>);
	}
}
