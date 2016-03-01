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
					borderRadius: '4px',
					background: '#fff',
					boxShadow: isMobile ? '' : '0 1px 1px 0 rgba(31,45,61,0.05)'
				}}>
					{assignments && assignments.map((assignment, i) => {
						const length = assignments.length - 1;
						let renderBorder = true;
						if(length > 6 && i === length) renderBorder = false;
						return (
							<li 
							onTouchStart={() => this.setState({touching: i})}
							onTouchEnd={() => this.setState({touching: -1})}
							onMouseOver={() => this.setState({hovering: i})}
							onMouseLeave={() => this.setState({hovering: -1})}
							onClick={() => this.props.pushState(null, `/assignment/${assignment.token}/questions`)}
							style={{
								borderTopLeftRadius: '4px',
								borderTopRightRadius: '4px',
								padding: isMobile ? '1em 0 1em 0em' : '1em', 
								margin: isMobile ? '0 0 0 1em' : '0', 
								borderBottom: renderBorder ? '1px solid #e4e4e4' : '',
								background: (touching === i) ? '#F5FAFE' : '#fff',
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
							const last = i === emptyRows - 1
							return (
								<li 
								key={i} 
								style={{
									height: '67px', 
									marginLeft: isMobile ? '1em' : '0', 
									borderBottom: last ? '' : '1px solid #e4e4e4'}}>
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}
}
