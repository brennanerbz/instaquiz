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
		return (
			<div id="create" className="display_flex flex_vertical relative">
				<img 
				onClick={() => this.props.close()} 
				src={deleteIcon} 
				style={{
					height: isMobile ? '15px' : '16px',
					position: 'absolute',
					top: '1em',
					left: '1em',
					cursor: 'pointer'
				}}/>
				<div style={{padding: '1em', borderBottom: '1px solid #E4E4E4'}} className="display_flex flex_horizontal">
					<h1 
					className="flex_item_align_center"
					style={{
						fontSize: isMobile ? '17px' : '19px',
						fontWeight: '500',
						color: '#283643'
					}}>
					Create Assignment</h1>
					{isMobile &&
					<button className="button primary_green flex_item_align_right">
						Submit
					</button>}
				</div>
				<div className="flex_vertical" style={{padding: isMobile ? '' : '1em'}}>
					<input 
					style={{height: '50px', lineHeight: '50px'}}
					placeholder="Assignment name"/>
					<textarea 
					ref="assignment_text"
					style={{minHeight: '400px'}} 
					placeholder="Paste text here..."/>
					{!isMobile &&
					<div style={{width: '100%'}} className="display_flex">
						<button className="button primary_green flex_item_align_right">
							Submit
						</button>
					</div>}
				</div>
			</div>
		);
	}
}
