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
		fetchingAssignments: state.assignments.fetchingAssignments,
		loading: state.assignments.loading,
		loaded: state.assignments.loaded,
		user: state.user.user,
		assignments: state.assignments.assignments,
		modalOpen: state.overlays.modalOpen,
		modalType: state.overlays.modalType
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

	componentDidMount() {
		const account = cookie.load('account', {path: '/'})
		const token = cookie.load('token', {path: '/'})
		this.setState({
			promptOpen: !account
		});
		const { loaded, modalOpen } = this.props;
		
		if(!loaded) {
			this.props.fetchAssignments(token)
		}
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.user && !this.props.user.email && nextProps.user.email) this.setState({promptOpen: false})
	}

	componentWillUnmount() {
		this.props.clearDashboard()
	}

	render() {
		const { isMobile } = this.props;
		const deleteIcon = require('../../../static/icons/deleteWhite.png');
		const moon = require('../../../static/icons/moon.png');

		const { promptOpen } = this.state;
		const promptStyles = {
			wrapper: { 
				margin: isMobile ? '' : '0 25px',
			},
			container: {
				flex: '1',
				background: '#00B5FF',
				padding: isMobile ? '2em 0 2em 0' : '2em',
				margin: isMobile ? '3.5em auto 0 auto' : '5.5em auto 1em auto',
				display: promptOpen ? '' : 'none',
				maxWidth: '1000px',
				minWidth: isMobile ? '' : '900px',
				borderRadius: !isMobile && '5px'
			}, 
			text: {
				color: '#fff',
				fontSize: isMobile ? '19px' : '20px',
				margin: isMobile ? '15px 0 10px 0' : '15px 0 15px 0'
			}
		}
		// Loading
		const { fetchingAssignments } = this.props;
		return (
			<div>
				{
					promptOpen &&
					<div style={promptStyles.wrapper}>
					<div 
					style={promptStyles.container} 
					className={'display_flex flex_center flex_vertical relative' + ' ' + (isMobile ? 'flex_container_center' : 'flex_container_left')}>
						<img 
						onClick={() => {this.setState({promptOpen: false})}} 
						src={deleteIcon} 
						style={{
							height: isMobile ? '14px' : '16px',
							position: 'absolute',
							top: '0.75em',
							right: '0.75em',
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
					</div>
				}
				<AssignmentList 
				promptOpen={promptOpen}
				isMobile={this.props.isMobile}
				assignments={this.props.assignments} 
				pushState={this.props.pushState}
				loading={fetchingAssignments}/>
			</div>
		);
	}
}
