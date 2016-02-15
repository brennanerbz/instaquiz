import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

@connect(state => ({
		items: state.quiz.items,
		loaded: state.quiz.loaded,
		modalOpen: state.overlays.modalOpen
	})
)
export default class QuizContent extends Component {
	static propTypes = {
		items: PropTypes.array,
		loaded: PropTypes.bool
	}

	render() {
		const style = require('./QuizContent.scss');
		const { items, loaded, modalOpen, isMobile, pushState } = this.props;
		const itemList = [];
		items.map((item, i) => {
			const term = item[1];
			var question = item[2];
			question = question
			.replace(new RegExp('(^|\\s)(' + term + ')(\\s|$)','ig'), '$1<b>$2</b>$3')
			itemList.push(
				<li key={term + i} style={{position: 'relative', padding: '0.5em', borderTop: i !== 0 ? '1px solid #DAE0E7' : ''}} className="display_flex flex_horizontal">
					<p 
					style={{width: '50%', padding: isMobile ? '0.5em 0.5em 0.5em 0' : '1em 1em 1em 0.5em'}} 
					className="flex_item_align_left"
					dangerouslySetInnerHTML={{__html: question}}>
					</p>
					<p 
					style={{width: '50%', padding:  isMobile ? '0.5em 0em 0.5em 0.5em' : '0.5em 0.5em 1em 1em', position: 'absolute', top: isMobile ? '6.5px' : '15px'}} 
					className="flex_item_align_right">
					<b>{term}</b>
					</p>
				</li>
			)
		})
		return (
			<ul style={{marginBottom: '2em', padding: '0.25em 1em', border: '1px solid #DAE0E7', borderRadius: '0.25em', width: '100%', fontSize: isMobile ? '14px' : ''}}>
				{itemList}
				{
					!loaded && !modalOpen
					&&
					<li style={{padding: '0.5em'}} className="display_flex flex_center">
						<LoadingSpinner size={4}/>
					</li>
				}				
			</ul>
		);
	}
}
