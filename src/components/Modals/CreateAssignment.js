import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import $ from 'jquery';

import assignmentActions from '../../redux/modules/assignments';

@connect(
  state => ({
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
		setTimeout(() => {
			node.trigger('input')
		}, 1)
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
		return (
			<div id="create" className="display_flex flex_vertical relative">
				<img 
				onClick={() => this.props.close()} 
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
					Create Assignment</h1>
					{isMobile &&
					<a
					style={{
						position: 'absolute',
						top: '1.25em',
						right: '1em',
						fontSize: '17px'
					}}
					className="link">
						Submit
					</a>}
				</div>
				<div className="flex_vertical" style={{padding: isMobile ? '' : '2em'}}>
					<input 
					autoFocus={true}
					style={{height: '50px', lineHeight: isMobile ? '15px' : '50px'}}
					placeholder="Assignment name"
					className={isMobile ? 'mobile' : ''}
					value={title}
					onChange={(e) => this.setState({title: e.target.value})}/>
					<textarea 
					ref="assignment_text"
					style={{minHeight: '350px', margin: isMobile ? '10px 0' : '20px 0'}} 
					placeholder="Paste text here..."
					className={isMobile ? 'mobile' : ''}
					onChange={(e) => this.setState({text: e.target.value})}
					value={text}/>
					{!isMobile &&
					<div style={{width: '100%'}} className="display_flex">
						<span style={{lineHeight: '45px'}}>
							<img src={question} style={{height: '16px', marginRight: '15px'}}/>
							<a className="grey link">Wondering how this works?</a>
						</span>
						<button style={{height: '50px', lineHeight: '50px', padding: '0 25px'}} className="button primary_green flex_item_align_right">
							Submit
						</button>
					</div>}
				</div>
			</div>
		);
	}
}
