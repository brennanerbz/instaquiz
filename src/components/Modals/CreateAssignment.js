import React, { Component, PropTypes } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import $ from 'jquery';
import Radium from 'radium';
import color from 'color';
import LaddaButton from 'react-ladda';

import * as assignmentActions from '../../redux/modules/assignments';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import EditingList from '../EditingList/EditingList';
import ProcessingModal from './ProcessingModal';

@connect(
  state => ({
  	user_id: state.user.id,
  	title: state.assignments.title,
  	text: state.assignments.text,
  	fetching: state.assignments.fetching,
  	creating: state.assignments.creating,
  	editing: state.assignments.editing,
  	deleting: state.assignments.deleting,
  	finished: state.assignments.finished,
  	items: state.assignments.items,
  	assignment: state.assignments.assignment,
  	error: state.assignments.error
  }),
  dispatch => ({
    ...bindActionCreators({
      ...assignmentActions,
      pushState
    }, dispatch)
  })
)
@Radium
export default class CreateAssignment extends Component {
	static propTypes = {
	}

	state = {
		title: '',
		text: '',
		isTextLink: false,
		subject: null,
		readingLevel: null,
		touching: '',
		trending: ['Wikipedia', 'CNN', 'Bloomberg Business'],
		subjects: [
			{text: 'Subject', value: null},
			{text: 'English', value: 'english'},
			{text: 'Math', value: 'math'},
			{text: 'Science', value: 'science'},
			{text: 'History & Social Sciences', value: 'history and social sciences'},
			{text: 'Technology & Computer Science', value: 'technology and computer science'},
			{text: 'Spanish', value: 'spanish'},
			{text: 'French', value: 'french'},
			{text: 'German', value: 'german'},
			{text: 'Latin', value: 'latin'},
		],
		readingLevels: [
			{text: 'Grade level', value: null},
			{text: 'Adult', value: 'adult'},
			{text: 'Graduate', value: 'graduate'},
			{text: 'College', value: 'college'},
			{text: '12th', value: '12'},
			{text: '11th', value: '11'},
			{text: '10th', value: '10'},
			{text: '9th', value: '9'},
			{text: '8th', value: '8'},
			{text: '7th', value: '7'},
			{text: '6th', value: '6'},
			{text: '5th', value: '5'},
			{text: '4th', value: '4'},
			{text: '3rd', value: '3'},
			{text: '2nd', value: '2'},
			{text: '1st', value: '1'},
			{text: 'Kindergarten', value: 'K'}
		],
		error: {
			code: null,
			no_content: 'It looks like that site has too many ads. Try pasting the text?', // 204
			no_url: 'Oh no! That URL is protected. Try pasting the text?' // 303
		}
	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
		const { assignment } = nextProps;
		if(!this.props.finished && nextProps.finished) {
			this.props.pushState(null, `/assignment/${assignment.token}/questions`)
			this.props.close()
		}
		// Incoming text & title from link
		const { title, text } = nextProps;
		const { isTextLink } = this.state;
		if(isTextLink && (text !== this.state.text)) {
			this.setState({
				title: title,
				text: text,
				isTextLink: false
			});
		}
		// Error
		const { error } = nextProps;
		let errorMessage = ''
		if(error) {
			if(error.match(/303/g)) {
				this.setState({
					error: {
						...this.state.error,
						code: 303
					}
				});
			} else if(error.match(/204/g)) {
				this.setState({
					error: {
						...this.state.error,
						code: 204
					}
				});
			}
		}
	}

	findLink(text) {
		var linkText = text.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig)
		if(linkText && text.length < 400) {
			const link = text;
			const token = cookie.load('token', {path: '/'})
			this.props.fetchArticle(link, token)
			this.setState({
				isTextLink: true,
				text: text
			});
		} else {
			this.setState({
				isTextLink: false,
				text: text
			});
		}
	}

	handleCreateAssignment() {
		const token = cookie.load('token', {path: '/'})
		const { createAssignment, user_id} = this.props;
		const { title, text, subject, readingLevel } = this.state;
		if(title.length > 0 && text.length > 0) {
			createAssignment(token, title, text, subject, readingLevel)
		} else {
			if((title.length === 0 && text.length === 0) || text.length === 0) this.refs.assignment_text.focus() 
			else if(title.length === 0) this.refs.assignment_title.focus()
		}
	}

	handleFinishAssignment() {
		const token = cookie.load('token', {path: '/'})
		const { items, assignment } = this.props;
		var delete_ids = [];
		items.forEach((item, i) => {
			if(!item.selected) {
				item.deleted = true;
			} else {
				item.deleted = false;
			}
			delete_ids.push(item)
		})
		this.props.deleteItems(delete_ids, assignment.id, token)
		// if(delete_ids.length > 0) {
			
		// } else {
		// 	this.props.close()
		// 	this.props.pushState(null, `/assignment/${assignment.token}/questions`)
		// }
	}

	render() {
		const style = require('./Modals.scss')
		const { isMobile } = this.props;
		const { createAssignment } = this.props;
		// Assignment 
		const { assignment } = this.props;
		const token = cookie.load('token', {path: '/'})
		// Icons
		const deleteIcon = require('../../../static/icons/delete.png');
		const question = require('../../../static/icons/question.png');
		// State
		const { title, text } = this.state;
		const { trending } = this.state;
		// Loading
		const { creating, fetching, deleting } = this.props;
		// Items
		const { items, editing } = this.props;
		// Touch
		const { touching } = this.state;
		// Subject and reading level
		const selectStyles = {
			container: {
				margin: isMobile ? '10px 0 0' : '20px 0 20px',
				padding: '0 0em'
			},
			label: {
				position: 'relative',
				width: '50%'
			},
			select: {
				fontSize: '1em',
				lineHeight: 'normal',
				background: '#fff',
				border: '1px solid #DFE6ED',
				borderRadius: '0.25em',
				outline: 'none',
				width: '100%',
				margin: '0 0 .5rem',
				boxShadow: 'none',
				height: 'auto',
				padding: '0.45rem 2rem 0.55rem 0.75rem',
				height: '40px'
			},
			icon: {
				position: 'absolute', 
				right: '18px', 
				top: '12px'
			}
		}
		const { subjects, readingLevels } = this.state;
		const { subject, readingLevel } = this.state;
		// Textare and Error
		const { error } = this.state;
		const textAreaStyle = {
			text: {
				margin: isMobile ? '10px 0 0' : '20px 0 0', 
				overflowY: 'scroll'
			},
			error: {
				border: isMobile ? '' : '1px solid red'
			}
		}
		const errorMessage = {
			margin: isMobile ? '10px 0 0px 10px' : '10px 0 0 0',
			fontSize: '14px',
			lineHeight: '14px',
			color: 'red'
		}
		return (
			<div id="create" className="display_flex flex_vertical relative">
				<img 
				onTouchStart={() => this.setState({touching: 'close'})}
				onTouchEnd={() => this.setState({touching: ''})}
				className={touching === 'close' ? 'touching' : ''}
				onClick={() => {
					this.props.close()
					this.props.clearDraft()
					if(assignment) {
						this.props.deleteAssignment(assignment.id, token)
					}
				}} 
				src={deleteIcon} 
				style={{
					height: isMobile ? '15px' : '16px',
					position: 'absolute',
					top: isMobile ? '1.25em' : '2em',
					left: isMobile ? '1em' : '',
					right: isMobile ? '' : '2em',
					cursor: 'pointer',
					display: !isMobile && editing && 'none'
				}}/>
				<div 
				style={{padding: isMobile ? '1.25em 0' : '2em 2em 0', background: '#fff'}} 
				className={'display_flex flex_horizontal' + ' ' + (isMobile ? 'flex_center' : '')}>
					<h1 
					className={isMobile ? '' : 'flex_item_align_left'}
					style={{
						fontSize: isMobile ? '17px' : '19px',
						fontWeight: '600',
						color: '#283643'
					}}>
					{!editing && 'Create Assignment'}
					{editing && 'Select Questions'}
					</h1>
					{isMobile &&
					<a
					onTouchStart={() => this.setState({touching: 'submit'})}
					onTouchEnd={() => this.setState({touching: ''})}
					className={touching === 'submit' ? 'touching' : ''}
					onClick={() => {
						if(!editing) this.handleCreateAssignment()
						if(editing) this.handleFinishAssignment()
					}}
					style={{
						position: 'absolute',
						top: '1.25em',
						right: '1em',
						fontSize: '17px',
						fontWeight: '600'
					}}
					className="link">
						{editing ? 'Finish' : 'Submit'}
					</a>}
				</div>
				{editing && !isMobile &&
				<div style={{width: '100%', position: 'absolute', right: '2em', top: '1em'}} className="display_flex">
					<div className="flex_container_right">
						<button 
						onClick={() => {
							this.props.close()
							this.props.clearDraft()
							if(assignment) {
								this.props.deleteAssignment(assignment.id, token)
							}
						}}
						style={{height: '44px', lineHeight: '44px', padding: '0 25px'}} 
						className="button primary_white">
							Cancel
						</button>
						<LaddaButton 
						loading={fetching || creating || deleting}
						spinnerSize={30}
						className={'button primary_blue' + ' ' + ((fetching || creating || deleting) && 'open')}
						spinnerColor='#fff'
						buttonStyle="expand-left"
						style={{height: '44px', lineHeight: '44px', padding: '0 25px', margin: '0 0 0 10px'}}
						onClick={() => {
							if(!editing) this.handleCreateAssignment()
							if(editing) this.handleFinishAssignment()
						}}>
						{editing ? 'Finish' : 'Submit'}
						</LaddaButton>
					</div>
				</div>}
				{/* Title and text */}
				<div 
				className="flex_vertical" 
				style={{
					padding: isMobile ? '' : (editing ? '0.5em 2em 2em' : '2em 2em 2em'),
					borderTop: isMobile ? '1px solid #DFE6ED' : ''
				}}>
					{
						!editing && isMobile
						&&
						<div style={selectStyles.container} className="display_flex flex_horizontal">
							<label style={Object.assign({...selectStyles.label}, {margin: '0 10px 0 0'})}>
								<select 
									style={selectStyles.select}
									disabled={editing}
									onChange={(e) => {
										this.setState({subject: e.target.value})
									}}>
									{subjects.map((subject, i) => {
										return (
											<option key={subject.value + i} value={subject.value}>
												{subject.text}
											</option>
										)
									})}
								</select>
								<i style={selectStyles.icon} className="fa fa-caret-down"></i>
							</label>
							<label style={selectStyles.label}>
								<select 
									style={selectStyles.select}
									disabled={editing}
									onChange={(e) => {
										this.setState({readingLevel: e.target.value})
									}}>
									{readingLevels.map((level, i) => {
										return (
											<option key={level.text + level.value + i} value={level.value}>
												{level.text}
											</option>
										)
									})}
								</select>
								<i style={selectStyles.icon} className="fa fa-caret-down"></i>
							</label>
						</div>
					}
					{
						!editing &&
						<input 
						type="text"
						name="title"
						ref="assignment_title"
						ariaLabel="Assignment title"
						style={{height: '42px', lineHeight: '18px',}}
						placeholder="Assignment name"
						className={isMobile ? 'mobile' : ''}
						value={title}
						onChange={(e) => this.setState({title: e.target.value})}
						onBlur={() => this.props.updateTitle(title)}/>
					}

					{isMobile && error.code && 
					<p style={errorMessage}>
					{error.code === 303 && error.no_url}
					{error.code === 204 && error.no_content}
					</p>}

					{!creating && !fetching && !editing &&
						<textarea 
						type="text"
						name="text"
						autoFocus={!isMobile}
						ariaLabel="Assignment text"
						ref="assignment_text"
						style={[textAreaStyle.text, error.code && textAreaStyle.error]} 
						placeholder={isMobile ? 'Paste URL or text here...' : 'Paste website URL or text here...'}
						className={(isMobile ? 'mobile' : '') + ' ' + style.textarea}
						onChange={(e) => {
							this.setState({
								error: {
									...this.state.error,
									code: null
								}
							})
							this.findLink(e.target.value)
						}}
						onBlur={() => this.props.updateText(text)}
						value={text}/>}

					{!isMobile && error.code && 
					<p style={errorMessage}>
					{error.code === 303 && error.no_url}
					{error.code === 204 && error.no_content}
					</p>}

					{/* Loading Spinner and Messages */}
					{(creating || fetching || deleting) &&
					<ProcessingModal 
					text={text} 
					size={isMobile ? 4 : 5} 
					fetching={fetching} 
					creating={creating} 
					deleting={deleting} 
					isMobile={isMobile}/>}

					{!deleting && editing &&
						<EditingList 
							isMobile={isMobile}
							items={items}
							handleSelectItem={(id) => {
								this.props.selectItem(id)
							}}
						/>
					}

					{/* Subject and Reading Level */}
					{
						!editing && !isMobile
						&&
						<div style={selectStyles.container} className="display_flex flex_horizontal">
							<label style={Object.assign({...selectStyles.label}, {margin: '0 10px 0 0'})}>
								<select 
									style={selectStyles.select}
									disabled={editing}
									onChange={(e) => {
										this.setState({subject: e.target.value})
									}}>
									{subjects.map((subject, i) => {
										return (
											<option key={subject.value + i} value={subject.value}>
												{subject.text}
											</option>
										)
									})}
								</select>
								<i style={selectStyles.icon} className="fa fa-caret-down"></i>
							</label>
							<label style={selectStyles.label}>
								<select 
									style={selectStyles.select}
									disabled={editing}
									onChange={(e) => {
										this.setState({readingLevel: e.target.value})
									}}>
									{readingLevels.map((level, i) => {
										return (
											<option key={level.text + level.value + i} value={level.value}>
												{level.text}
											</option>
										)
									})}
								</select>
								<i style={selectStyles.icon} className="fa fa-caret-down"></i>
							</label>
						</div>
					}
					
					{!isMobile && !editing &&
					<div style={{width: '100%'}} className="display_flex">
						<div className="flex_container_right">
							<button 
							onClick={() => {
								this.props.close()
								this.props.clearDraft()
								if(assignment) {
									this.props.deleteAssignment(assignment.id, token)
								}
							}}
							style={{height: '44px', lineHeight: '44px', padding: '0 25px'}} 
							className="button primary_white">
								Cancel
							</button>
							<LaddaButton 
							loading={fetching || creating || deleting}
							spinnerSize={30}
							className={'button primary_blue' + ' ' + ((fetching || creating || deleting) && 'open')}
							spinnerColor='#fff'
							buttonStyle="expand-left"
							style={{height: '44px', lineHeight: '44px', padding: '0 25px', margin: '0 0 0 10px'}}
							onClick={() => {
								if(!editing) this.handleCreateAssignment()
								if(editing) this.handleFinishAssignment()
							}}>
							{editing ? 'Finish' : 'Submit'}
							</LaddaButton>
						</div>
					</div>}

				</div>
			</div>
		);
	}
}

/*
<button 
onClick={() => {
	if(!editing) this.handleCreateAssignment()
	if(editing) this.handleFinishAssignment()
}}
style={{height: '44px', lineHeight: '44px', padding: '0 25px', margin: '0 0 0 10px'}} 
className="button primary_blue">
	{editing ? 'Finish' : 'Submit'}
</button>
*/
/*
<div style={{textAlign: 'center', clear: 'both', width: '90%'}} className="display_flex flex_container_center relative">
	<div style={{margin: '10px auto', background: isMobile ? '#F9FAFC' : '#fff', zIndex: '1', padding: '0 1em'}} className="display_flex">
	or
	</div>
	<hr style={{position: 'absolute', top: '0rem', left: '0', right: '0', borderTop: '1px solid #e8e8e8'}} className="separator"/>
</div>
<div 
className="display_flex flex_vertical flex_center" 
style={{
	background: '#fff', 
	width: '100%', 
	textAlign: 'center', 
	margin: isMobile ? '0.25em 0 0' : '', 
	padding: isMobile ? '1em' : '10px',
	borderTop: isMobile ? '1px solid #DFE6ED' : ''
}}>
	<h3 style={{fontWeight: '600', margin: '0 auto'}}>Trending Articles</h3>
	<ul
	style={{listStyleType: 'none', margin: '0.5em 0 0.5em'}}
	className="">
		{
			trending.map((trending, i) => {
				return (
					<li key={i} className="">
						<a style={{display: 'block', padding: '8px 12px'}} className="link">{trending}</a>
					</li>
				)
			})
		}
	</ul>
</div>
*/
