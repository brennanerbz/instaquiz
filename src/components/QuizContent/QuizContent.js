import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

@connect(state => ({
		items: state.assignments.items,
		modalOpen: state.overlays.modalOpen
	})
)
export default class QuizContent extends Component {
	static propTypes = {
		items: PropTypes.array
	}

	render() {
		const style = require('./QuizContent.scss');
		const { items, modalOpen, isMobile, pushState } = this.props;
		const itemList = [];
		items.map((item, i) => {
			const term = item.target;
			var question = item.cue;
			question = question
			.replace(new RegExp('(^|\\s)(' + term + ')(\\s|$)','ig'), '$1<b>$2</b>$3')
			itemList.push(
				<li 
				key={term + i} 
				style={{position: 'relative', padding: '0.5em', borderTop: i !== 0 ? '1px solid #DAE0E7' : '', lineHeight: '1.15em'}} 
				className="display_flex flex_horizontal">
					<p 
					style={{width: '50%', padding: isMobile ? '0.5em 0.5em 0.5em 0' : '1em 1em 1em 0.5em', whiteSpace: 'pre-wrap'}} 
					className="flex_item_align_left">
					<b>{term}</b>
					</p>
					<p 
					style={{width: '50%', padding:  isMobile ? '0.5em 0em 0.5em 0.5em' : '0.5em 0.5em 1em 0em', whiteSpace: 'pre-wrap' }} 
					className="flex_item_align_right"
					dangerouslySetInnerHTML={{__html: question}}>
					</p>
				</li>
			)
		})
		// Loading
		const { loading } = this.props;
		const loadingStyles = {
			container: {
				margin: '3em 0'
			}
		}
		return (
			<ul 
			style={{
				marginBottom: '2em', 
				padding: '0.25em 1em', 
				border: '1px solid #DAE0E7', 
				borderRadius: '0.25em', 
				width: '100%', 
				fontSize: isMobile ? '14px' : '',
				color: '#333333',
				listStyleType: 'none'
			}}>
				{!isMobile && loading && <div style={loadingStyles.container}><LoadingSpinner size={4}/></div>}
				{
					isMobile && loading && Array.from({length: 6}).map((a, i) => {
						const last = i === 5
						return (
							<li 
							key={i} 
							style={{
								position: 'relative', 
								padding: '0.5em', 
								borderTop: i !== 0 ? '1px solid #DAE0E7' : '', 
								lineHeight: '1.15em'}}>
								<div className="loading-item">
									<div className="animated-background">
									  <div className="question_item background-masker header-top"></div>
								      <div className="question_item background-masker header-left"></div>
								      <div className="question_item background-masker header-right"></div>
								      <div className="question_item background-masker header-bottom"></div>
								      <div className="question_item background-masker subheader-left"></div>
								      <div className="question_item background-masker subheader-right"></div>
								      <div className="question_item background-masker subheader-bottom"></div>
									</div>
								</div>
							</li>
						)
					})
				}
				{!loading && itemList}
			</ul>
		);
	}
}
