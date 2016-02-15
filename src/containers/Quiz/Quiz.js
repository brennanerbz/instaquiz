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
import * as overlayActions from '../../redux/modules/overlays';

// Components 
import QuizHeader from '../../components/QuizHeader/QuizHeader';
import QuizContent from '../../components/QuizContent/QuizContent';


@connect(state => ({
		loaded: state.quiz.loaded,
		title: state.quiz.title,
		definition: state.quiz.definition,
		items_count: state.quiz.items_count
	}),
	dispatch => ({
		...bindActionCreators({
			...quizActions,
			...overlayActions,
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
	}

	componentDidMount() {
		const { params, addTopic, start } = this.props;
		var title = params.quiz_title;
		if(title) {
			title = title.replace(/-/g, " ")
			addTopic(title)
		}
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.params.quiz_title !== nextProps.params.quiz_title) {
			const title = nextProps.params.quiz_title.replace(/-/g, " ")
			this.props.clearQuiz()
			this.props.addTopic(title)
		}
	}

	componentWillUnmount() {
		const { clearQuiz } = this.props;
		clearQuiz()
	}

	render() {
		const style = require('./Quiz.scss');
		const { isMobile, scrolling, title, definition, items_count, loaded, pushState } = this.props;
		return (
			<div  style={{maxWidth: '1050px'}} className="display_flex flex_container_center">
				<div style={{width: '100%'}} className="flex_vertical">
					<QuizHeader 
						openModal={this.props.openModal}
						loaded={loaded} 
						title={title} 
						definition={definition} 
						count={items_count} 
						isMobile={isMobile}
						scrolling={scrolling}/>
					<div style={{padding: isMobile ? '' : '0 25px'}}>
						<div 
						style={{color: '#A8B6C1', fontSize: isMobile ? '14px' : '16px', marginTop: '2em', marginBottom: '1em'}} 
						className="flex_horizontal">
							<p style={{width: '50%', marginLeft: isMobile ? '1.5em' : '0'}}> 
								Definitions
							</p>
							<p style={{width: '50%'}} className="flex_item_align_right">
								Concepts
							</p>
						</div>
						<QuizContent isMobile={isMobile} pushState={pushState}/>
					</div>
				</div>
			</div>
		);
	}
}
