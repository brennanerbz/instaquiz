import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';

import * as homeworkActions from '../../redux/modules/homework';

@connect(state => ({
		mounted: state.homework.mounted,
		loading: state.homework.loading,
		location: state.router.location,
		route: state.router.location.pathname,
		route_token: state.router.params.token,
		title: state.homework.title,
		reading: state.homework.reading,
		identifier: state.homework.identifier,
		sequence: state.homework.sequence,
		question: state.homework.question,
		invalid: state.homework.invalid,
		question_selected: state.homework.question_selected
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
		answer: '',
		showFinished: false
	}

	componentDidMount() {
		const { route_token, mounted } = this.props;
		if(!mounted) {
			this.props.setRouteToken(route_token)
			const { fetchSequence, newSequence } = this.props;

			const teacher = cookie.load('teacher', {path: '/'})
			if(!teacher) cookie.save('student', true, {path: '/'})
			var sequences = cookie.load('sequences', {path: '/'})
			if(sequences) sequences = JSON.parse(sequences)
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
	}

	componentWillReceiveProps(nextProps) {
		const previousRoute = this.props.route.split('/')[3]
		const nextRoute = nextProps.route.split('/')[3]
		// Sequence Token
		const { route_token } = nextProps;
		var sequences = cookie.load('sequences', {path: '/'})
		if(sequences) sequences = JSON.parse(sequences)
		if(sequences) {
			const sequence_token = sequences[route_token] 
			if(previousRoute == 'read' && nextRoute == 'questions') {
				this.props.updateSequence(nextProps.identifier, sequence_token)
			}
			// Completed homework
			if(nextProps.sequence.questions_remaining === 0) {
				this.setState({
					showFinished: true
				});
			}
			// Route control to prevent cheating
			if(previousRoute == 'questions' && nextRoute == 'read') {
				this.props.pushState(null, `/homework/${token}/questions`)
			}
			// Fetch the latest question
			if(nextProps.sequence.questions_remaining > 0) {
				if((this.props.question.finish == null && nextProps.question.finish !== null) ||
					(!this.props.sequence && nextProps.sequence && nextProps.sequence.reading_completed) ||
					(!this.props.sequence.reading_completed && nextProps.sequence.reading_completed) ||
					(!this.props.sequence && nextProps.sequence && nextProps.sequence.reading_completed)) {
					this.props.fetchQuestion(sequence_token)
				}
			}
		}
	}

	submitAnswer() {
		// Sequence Token
		const { route_token } = this.props;
		var sequences = cookie.load('sequences', {path: '/'})
		if(sequences) sequences = JSON.parse(sequences)
		if(sequences) {
			const sequence_token = sequences[route_token]
			const { answer } = this.state;
			if(answer.length > 0) {
				this.props.submitAnswer(answer, sequence_token)
				this.setState({
					answer: ''
				});
			}
		}
	}

	render() {
		var homeworkChildrenWithProps = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, {
				route_token: this.props.route_token,
				loading: this.props.loading,
				isMobile: this.props.isMobile,
				pushState: this.props.pushState,
				title: this.props.title,
				reading: this.props.reading,
				identifier: this.props.identifier,
				sequence: this.props.sequence,
				question: this.props.question,
				updateName: this.props.updateName,
				invalid: this.props.invalid,
				question_selected: this.props.question_selected,
				selected: this.props.selected,
				nameError: this.props.nameError,
				fetchSequence: this.props.fetchSequence,
				updateSequence: this.props.updateSequence,
				newSequence: this.props.newSequence,
				fetchQuestion: this.props.fetchQuestion,
				selectAnswer: (answer) => this.setState({answer: answer}),
				submitAnswer: ::this.submitAnswer,
				location: this.props.location,
				showFinished: this.state.showFinished
			})
		})
		return (<div style={{height: '100%'}}>{homeworkChildrenWithProps}</div>);
	}
}
