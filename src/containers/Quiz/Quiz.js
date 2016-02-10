import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import cookie from 'react-cookie';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';

// Components 
import QuizHeader from '../../components/QuizHeader/QuizHeader';
import QuizContent from '../../components/QuizContent/QuizContent';

@connect(state => ({
	}),
	dispatch => ({
		...bindActionCreators({
			pushState
		}, dispatch)
	})
)
export default class Quiz extends Component {
	static propTypes = {
		pushState: PropTypes.func
	}

	componentDidMount() {
		// window.addEventListener('scroll', ::this.handleScroll)
	}

	

	render() {
		const style = require('./Quiz.scss');
		const { isMobile, scrolling } = this.props;
		return (
			<div  style={{maxWidth: '1000px'}} className="display_flex flex_container_center">
				<div style={{width: '100%'}} className="flex_vertical">
					<QuizHeader isMobile={isMobile} scrolling={scrolling}/>
					<QuizContent/>
				</div>
			</div>
		);
	}
}
