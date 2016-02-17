import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';

import * as overlayActions from '../../redux/modules/overlays';

@connect(
  state => ({
  	title: state.quiz.title,
  	error: state.quiz.error,
  	loaded: state.quiz.loaded
  }),
  dispatch => ({
    ...bindActionCreators({
      ...overlayActions,
      pushState
    }, dispatch)
  })
)
export default class Footer extends Component {
	static propTypes = {
	}

	render() {
		const { loaded, title, error, location } = this.props;
		const isNotHomeView = location.pathname.match(/quiz/gi);
		return (
			<div style={{
				// position: (!title || error) ? 'absolute' : '', 
				background: (!loaded && isNotHomeView) ? '#fff' : '#21D931',
				bottom: '0', 
				width: '100%', 
				height: '54px', 
				lineHeight: '48px',
				padding: '0 10px',
			}}
			className="display_flex flex_container_center flex_center">
				<div style={{width: '100%', maxWidth: '1000px'}} className="flex_horizontal">
					<div 
						className="flex_container_left grey">
						<a style={{color: '#fff', fontWeight: '500', textDecoration: 'none'}}>&copy; Quizly 2016.</a>
					</div>
					<div 
						style={{marginLeft: 'auto'}} 
						className="flex_container_right grey">
						<a 
						onClick={() => this.props.openModal('contact')}
						style={{color: '#fff'}} 
						className="link">Contact us</a>
					</div> 
				</div>
			</div>
		);
	}
}
