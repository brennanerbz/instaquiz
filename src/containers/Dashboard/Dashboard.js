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

	
	render() {
		const { isMobile } = this.props;
		const deleteIcon = require('../../../static/icons/deleteWhite.png');
		const { promptOpen } = this.state;
		const promptStyles = {
			container: {
				flex: '1',
				background: '#00B5FF',
				padding: '5em 0 2em 0',
				display: promptOpen ? '' : 'none'
			}, 
			text: {
				color: '#fff',
				fontSize: '19px',
				margin: '10px 0 10px 0'
			}
		}
		return (
			<div>
				{
					true &&
					<div style={promptStyles.container} className="display_flex flex_center flex_vertical">
						<img 
						onClick={() => {
							this.setState({promptOpen: false})
						}} 
						src={deleteIcon} 
						style={{
							height: isMobile ? '14px' : '16px',
							position: 'absolute',
							top: isMobile ? '4.25em' : '2em',
							right: '1em',
							cursor: 'pointer'
						}}/>
						<h1 style={promptStyles.text}>Want to save your assignments?</h1>
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
