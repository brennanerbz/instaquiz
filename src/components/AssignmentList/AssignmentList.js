import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class AssignmentList extends Component {
	static propTypes = {
	}

	state = {
		touching: -1,
		hovering: -1
	}

	render() {
		const { isMobile } = this.props;
		const { assignments } = this.props;
		const assignmentsLength = assignments && assignments.length;
		const emptyRows = assignmentsLength < 6 ? (6 - assignmentsLength) : 0
		const forwardArrow = require('../../../static/icons/forwardArrowGrey.png')
		const setIcon = require('../../../static/icons/set_icon_lines.png')

		// Touch
		const { touching } = this.state;
		// Hover
		const { hovering } = this.state;
		return (
			<div 
			className="display_flex flex_vertical flex_container_center relative" 
			style={{maxWidth: !isMobile ? '1050px' : '', padding: isMobile ? '' : '0 25px'}}>
				<ul 
				style={{
					padding: isMobile ? '3.5em 0 0' : '',
					margin: isMobile ? '0' : '6em 0',
					listStyleType: 'none',  
					width: '100%',
					border: isMobile ? '' : '1px solid #e4e4e4',
					borderRadius: '4px'
				}}>
					{assignments && assignments.map((assignment, i) => {
						return (
							<li 
							onTouchStart={() => this.setState({touching: i})}
							onTouchEnd={() => this.setState({touching: -1})}
							onMouseOver={() => this.setState({hovering: i})}
							onMouseLeave={() => this.setState({hovering: -1})}
							onClick={() => this.props.pushState(null, `/assignment/${assignment.token}/questions`)}
							style={{
								padding: isMobile ? '1em 0 1em 0em' : '1em', 
								margin: isMobile ? '0 0 0 1em' : '0', 
								borderBottom: (i !== assignments.length - 1) && (i !== 0) ? '1px solid #e4e4e4' : '',
								background: ((touching === i) || (hovering === i)) ? '#F5FAFE' : '#fff',
								cursor: 'pointer'
							}}
							key={assignment.title + i} 
							className="display_flex flex_horizontal flex_nowrap">
								<img src={setIcon} style={{height: '32px', width: '27px'}}/>
								<span style={{marginLeft: '20px', fontSize: isMobile ? '16px' : '17px'}}>
									<p style={{fontWeight: '600', color: '#3C4858'}}>{assignment.title}</p>
									<p style={{fontWeight: '400', color: '#8492A6', lineHeight: '1.25em'}}>
									{assignment.text.slice(0, 30) + (assignment.text.length > 30 && '...')}
									</p> 
								</span>
								<span 
								style={{
									position: 'absolute', 
									right: isMobile ? '1em' : '3em', 
									fontSize: isMobile ? '15px' : '16px', 
									color: '#8492A6'
								}} className="display_flex flex_horizontal">
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
							</li>
						)
					})}
					{
						Array.from({length: emptyRows}).map((a, i) => {
							return (
								<li key={i} style={{height: '67px', marginLeft: '1em', borderBottom: '1px solid #e4e4e4'}}>
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}
}
