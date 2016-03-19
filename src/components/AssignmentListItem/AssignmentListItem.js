import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class AssignmentListItem extends Component {
	static propTypes = {
	}

	state = { 
		touching: false,
		hovering: false
	}

	render() {
		const forwardArrow = require('../../../static/icons/forwardArrowGrey.png')
		const setIcon = require('../../../static/icons/set_icon_lines.png')
		const { assignment, renderBorder, isMobile } = this.props;
		const { touching } = this.state;
		const { hovering } = this.state;
		const styles = {
			listItem: {
				borderTopLeftRadius: '4px',
				borderTopRightRadius: '4px',
				background: touching ? '#F2F2F2' : '#fff',
				cursor: 'pointer',
				width: '100%'
			},
			wrapper: {
				padding: isMobile ? '1em 0 1em 0em' : '1em 1em 1em 0', 
				margin: isMobile ? '0 0 0 1em' : '0 0 0 1em', 
				borderBottom: renderBorder ? '1px solid #E6E8EA' : '',
			},
			contentContainer: {
				display: 'block', 
				margin: '0 0 0 20px', 
				fontSize: isMobile ? '16px' : '17px'
			},
			title: {
				margin: '0 95px 0 0', 
				fontSize: isMobile ? '17px' : '18px', 
				fontWeight: '600', 
				color: '#333333', 
				lineHeight: isMobile ? '18px': '19px'
			},
			count: {
				fontSize: isMobile ? '14px' : '15px', 
				fontWeight: '400', 
				color: '#AEB6BD', 
				lineHeight: '1.75em'
			},
			time: {
				position: 'absolute', 
				right: isMobile ? '1em' : '3em', 
				fontSize: isMobile ? '14px' : '15px', 
				color: '#AEB6BD'
			}
		}
		return (
			<li 
			onTouchStart={() => this.setState({touching: true})}
			onTouchEnd={() => this.setState({touching: false})}
			onMouseOver={() => this.setState({hovering: true})}
			onMouseLeave={() => this.setState({hovering: false})}
			onClick={() => this.props.pushState(null, `/assignment/${assignment.token}/questions`)}
			style={styles.listItem}>
				<div style={styles.wrapper} className="display_flex flex_horizontal flex_nowrap">
					<img src={setIcon} style={{height: '32px', width: '27px'}}/>
					<span className="flex_spacer" style={styles.contentContainer}>
						<p className="overflow_ellipsis" style={styles.title}>
						{assignment.title}
						</p>
						<p style={styles.count}>
						{assignment.items_count} questions
						</p> 
					</span>
					<span style={styles.time} className="display_flex flex_horizontal">
						<p style={{marginRight: '5px'}}>
						{moment.utc(assignment.created).calendar(null, {
						    sameDay: '[Today]',
					        nextDay: '[Tomorrow]',
					        nextWeek: 'dddd',
					        lastDay: '[Yesterday]',
					        lastWeek: '[Last] dddd',
					        sameElse: 'DD/MM/YYYY'
						})}
						</p>
						<img src={forwardArrow} style={{height: '10px', position: 'absolute', top: '3px'}}/>
					</span>
				</div>
			</li>
		);
	}
}
