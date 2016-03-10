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
		text: '',
		touching: '',
		trending: ['Wikipedia', 'CNN', 'Bloomberg Business']
	}

	componentDidMount() {
		const node = this.refs.assignment_text;
		// $(node).on('input', function() {
		// 	this.style.height = 'auto'
		// 	this.style.height = (this.scrollHeight) + 'px'
		// })
		const { title, text } = this.props;
		if(title) this.setState({title: title});
		if(text) this.setState({text: text});
	}

	componentWillReceiveProps(nextProps) {
		const { assignment } = nextProps;
		if(!this.props.finished && nextProps.finished) {
			this.props.pushState(null, `/assignment/${assignment.token}/questions`)
			this.props.close()
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
			// this.props.close()
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
		const { trending } = this.state;
		// Loading
		const { creating } = this.props;
		// Items
		const { items, editing } = this.props;
		// Touch
		const { touching } = this.state;
		return (
			<div id="create" className="display_flex flex_vertical relative">
				<img 
				onTouchStart={() => this.setState({touching: 'close'})}
				onTouchEnd={() => this.setState({touching: ''})}
				className={touching === 'close' ? 'touching' : ''}
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
						fontWeight: '600',
						color: '#283643'
					}}>
					{(editing ? 'Edit' : 'Create') + ' Assignment'}
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
					// autoFocus={true}
					style={{height: '50px', lineHeight: isMobile ? '18px' : '50px'}}
					placeholder="Assignment name"
					className={isMobile ? 'mobile' : ''}
					value={title}
					onChange={(e) => this.setState({title: e.target.value})}
					onBlur={() => this.props.updateTitle(title)}/>

					{!creating && !editing &&
						<textarea 
						type="text"
						name="text"
						ariaLabel="Assignment text"
						ref="assignment_text"
						style={{margin: isMobile ? '10px 0 0' : '20px 0 0', overflowY: 'scroll'}} 
						placeholder={'Paste text here...'}
						className={(isMobile ? 'mobile' : '') + ' ' + style.textarea}
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
										<li className="">
											<a style={{display: 'block', padding: '8px 12px'}} className="link">{trending}</a>
										</li>
									)
								})
							}
						</ul>
					</div>

					{!isMobile &&
					<div style={{width: '100%'}} className="display_flex">
						<div className="flex_container_right">
							<button 
							onClick={() => {
								this.props.close()
							}}
							style={{height: '44px', lineHeight: '44px', padding: '0 25px'}} 
							className="button primary_white">
								Cancel
							</button>
							<button 
							onClick={() => {
								if(!editing) this.handleCreateAssignment()
								if(editing) this.handleFinishAssignment()
							}}
							style={{height: '44px', lineHeight: '44px', padding: '0 25px', margin: '0 0 0 10px'}} 
							className="button primary_blue">
								{editing ? 'Finish' : 'Submit'}
							</button>
						</div>
					</div>}

				</div>
			</div>
		);
	}
}
