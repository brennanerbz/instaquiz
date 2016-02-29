import React, { Component, PropTypes } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import $ from 'jquery';

import * as assignmentActions from '../../redux/modules/assignments';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import EditingList from '../EditingList/EditingList';

@connect(
  state => ({
  	user_id: state.user.id,
  	title: state.assignments.title,
  	text: state.assignments.text,
  	creating: state.assignments.creating,
  	editing: state.assignments.editing,
  	finished: state.assignments.finished,
  	items: state.assignments.items,
  	assignment: state.assignments.assignment
  }),
  dispatch => ({
    ...bindActionCreators({
      ...assignmentActions,
      pushState
    }, dispatch)
  })
)
export default class CreateAssignment extends Component {
	static propTypes = {
	}

	state = {
		title: '',
		text: ''
	}

	componentDidMount() {
		const node = this.refs.assignment_text;
		$(node).on('input', function() {
			this.style.height = 'auto'
			this.style.height = (this.scrollHeight) + 'px'
		})
		const { title, text } = this.props;
		if(title) this.setState({title: title});
		if(text) this.setState({text: text});
	}

	componentWillReceiveProps(nextProps) {
		const { assignment } = nextProps;
		if(!this.props.finished && nextProps.finished) {
			this.props.close()
			this.props.pushState(null, `/assignment/${assignment.token}/questions`)
		}
	}

	handleCreateAssignment() {
		const token = cookie.load('token', {path: '/'})
		const { createAssignment, user_id} = this.props;
		const { title, text } = this.state;
		createAssignment(token, title, text)
	}

	handleFinishAssignment() {
		const token = cookie.load('token', {path: '/'})
		const { items, assignment } = this.props;
		var delete_ids = [];
		items.forEach((item, i) => {
			if(!item.selected) {
				delete_ids.push(item.id)
			}
		})
		if(delete_ids.length > 0) {
			this.props.deleteItems(delete_ids, token)
		} else {
			this.props.close()
			this.props.pushState(null, `/assignment/${assignment.token}/questions`)
		}
	}

	render() {
		const style = require('./Modals.scss')
		const { isMobile } = this.props;
		const { createAssignment } = this.props;
		// Icons
		const deleteIcon = require('../../../static/icons/delete.png');
		const question = require('../../../static/icons/question.png');
		// State
		const { title, text } = this.state;
		// Loading
		const { creating } = this.props;
		// Items
		const { items, editing } = this.props;
		return (
			<div id="create" className="display_flex flex_vertical relative">
				<img 
				onClick={() => {
					this.props.close()
					this.props.clearDraft()
				}} 
				src={deleteIcon} 
				style={{
					height: isMobile ? '15px' : '16px',
					position: 'absolute',
					top: isMobile ? '1.25em' : '2em',
					left: isMobile ? '1em' : '',
					right: isMobile ? '' : '2em',
					cursor: 'pointer'
				}}/>
				<div 
				style={{padding: isMobile ? '1.25em 0' : '2em 2em 0', background: '#fff'}} 
				className={'display_flex flex_horizontal' + ' ' + (isMobile ? 'flex_center' : '')}>
					<h1 
					className={isMobile ? '' : 'flex_item_align_left'}
					style={{
						fontSize: isMobile ? '17px' : '19px',
						fontWeight: '500',
						color: '#283643'
					}}>
					{(editing ? 'Edit' : 'Create') + ' Assignment'}
					</h1>
					{isMobile &&
					<a
					onClick={() => {
						if(!editing) this.handleCreateAssignment()
						if(editing) this.handleFinishAssignment()
					}}
					style={{
						position: 'absolute',
						top: '1.25em',
						right: '1em',
						fontSize: '17px'
					}}
					className="link">
						{editing ? 'Finish' : 'Submit'}
					</a>}
				</div>
				<div 
				className="flex_vertical" 
				style={{padding: isMobile ? '' : '2em'}}>
					<input 
					type="text"
					name="title"
					ariaLabel="Assignment title"
					autoFocus={true}
					style={{height: '50px', lineHeight: isMobile ? '18px' : '50px'}}
					placeholder="Assignment name"
					className={isMobile ? 'mobile' : ''}
					value={title}
					onChange={(e) => this.setState({title: e.target.value})}
					onBlur={() => this.props.updateTitle(title)}/>

					{!creating && !editing &&
						<textarea 
						type="submit"
						name="text"
						ariaLabel="Assignment text"
						ref="assignment_text"
						style={{minHeight: '350px', margin: isMobile ? '10px 0' : '20px 0'}} 
						placeholder={'Paste text here to...\n\n1. Process text\n2. Generate questions\n3. Create automatic assignment for you'}
						className={isMobile ? 'mobile' : ''}
						onChange={(e) => this.setState({text: e.target.value})}
						onBlur={() => this.props.updateText(text)}
						onKeyDown={(e) => {
							if(e.which === 13) {
								this.handleCreateAssignment()
							}
						}}
						value={text}/>}

					{creating && !editing &&
					<LoadingSpinner size={4}/>}

					{editing &&
						<EditingList 
							isMobile={isMobile}
							items={items}
							handleSelectItem={(id) => {
								this.props.selectItem(id)
							}}
						/>
					}

					{!isMobile &&
					<div style={{width: '100%'}} className="display_flex">
						<span style={{lineHeight: '45px'}}>
							<img src={question} style={{height: '16px', marginRight: '15px'}}/>
							<a className="grey link">Wondering how this works?</a>
						</span>
						<button 
						onClick={() => {
							if(!editing) this.handleCreateAssignment()
							if(editing) this.handleFinishAssignment()
						}}
						style={{height: '50px', lineHeight: '50px', padding: '0 25px'}} 
						className="button primary_blue flex_item_align_right">
							{editing ? 'Finish' : 'Submit'}
						</button>
					</div>}

				</div>
			</div>
		);
	}
}
