import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import cookie from 'react-cookie';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';

// Actions
import * as quizActions from '../../redux/modules/quiz';

// Components 
import QuizHeader from '../../components/QuizHeader/QuizHeader';
import QuizContent from '../../components/QuizContent/QuizContent';

@connect(state => ({
		start: state.quiz.start,
		end: state.quiz.end,
		loaded: state.quiz.loaded
	}),
	dispatch => ({
		...bindActionCreators({
			...quizActions,
			pushState
		}, dispatch)
	})
)
export default class Quiz extends Component {

	static propTypes = {
		// Device
		isMobile: PropTypes.bool,
		scrolling: PropTypes.bool,
		// State
		start: PropTypes.number,
		end: PropTypes.number,
		loaded: PropTypes.bool,
		// Routes
		params: PropTypes.object,
		pushState: PropTypes.func
	}

	state = {
		title: ''
	}

	componentDidMount() {
		const { params } = this.props;
		var title = params.quiz_title;
		if(title) {
			title = title.replace("-", " ")
			this.setState({
				title: title
			});
		}
	}

	componentWillUnmount() {
		const { clearQuiz } = this.props;
		clearQuiz()
	}

	render() {
		const style = require('./Quiz.scss');
		const { isMobile, scrolling, end, loaded } = this.props;
		const { title } = this.state;
		return (
			<div  style={{maxWidth: '1000px'}} className="display_flex flex_container_center">
				<div style={{width: '100%'}} className="flex_vertical">
					<QuizHeader loaded={loaded} title={title} count={end} isMobile={isMobile} scrolling={scrolling}/>
					<QuizContent/>
				</div>
			</div>
		);
	}
}
