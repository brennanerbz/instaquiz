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

	state = {
		promptOpen: true
	}

	componentWillMount() {
		const token = cookie.load('token', {path: '/'})
		this.props.fetchAssignments(token)
	}

	componentDidMount() {
		const teacher = cookie.load('teacher', {path: '/'})
		this.setState({
			promptOpen: !teacher
		});
	}

	
	render() {
		const { isMobile } = this.props;
		const deleteIcon = require('../../../static/icons/deleteWhite.png');
		const moon = require('../../../static/icons/moon.png');

		const { promptOpen } = this.state;
		const promptStyles = {
			container: {
				flex: '1',
				background: '#00B5FF',
				padding: isMobile ? '2em 0 2em 0' : '2em',
				margin: isMobile ? '3.5em auto 0 auto' : '5.5em auto 1em auto',
				display: promptOpen ? '' : 'none',
				maxWidth: '1000px',
				borderRadius: !isMobile && '5px'
			}, 
			text: {
				color: '#fff',
				fontSize: isMobile ? '19px' : '20px',
				margin: isMobile ? '10px 0 10px 0' : '15px 0 15px 0'
			}
		}
		return (
			<div>
				{
					promptOpen &&
					<div 
					style={promptStyles.container} 
					className={'display_flex flex_center flex_vertical relative' + ' ' + (isMobile ? 'flex_container_center' : 'flex_container_left')}>
						<img 
						onClick={() => {
							this.setState({promptOpen: false})
						}} 
						src={deleteIcon} 
						style={{
							height: isMobile ? '14px' : '16px',
							position: 'absolute',
							top: '1em',
							right: '1em',
							cursor: 'pointer'
						}}/>
						{
							!isMobile
							&&
							<img 
							src={moon} 
							style={{
								height: '65px',
								position: 'absolute',
								bottom: '1em',
								right: '7em',
							}}/>
						}
						<h1 style={promptStyles.text}>
						{
							isMobile 
							? 'Want to save your assignments?'
							: 'Like what you\'ve created so far? Create a free account to save it all.'
						}
						</h1>
						<button 
						onClick={() => this.props.openModal('signup')} 
						style={{border: 'none'}} 
						className="button primary_white">
						Create free account
						</button>
					</div>
				}
				<AssignmentList 
				promptOpen={promptOpen}
				isMobile={this.props.isMobile}
				assignments={this.props.assignments} 
				pushState={this.props.pushState}/>
			</div>
		);
	}
}
