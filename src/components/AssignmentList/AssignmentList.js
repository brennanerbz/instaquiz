import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import { LoadingSpinner } from '../';

export default class AssignmentList extends Component {
	static propTypes = {
	}

	state = {
		touching: -1,
		hovering: -1,
		loading: true
	}

	componentDidMount() {
		const { loading } = this.props;
		setTimeout(() => {
			this.setState({
				loading: false
			});
		}, 3000)
	}

	render() {
		const { isMobile } = this.props;
		const { assignments } = this.props;
		const assignmentsLength = assignments && assignments.length;
		const emptyRows = assignmentsLength < 6 ? (6 - assignmentsLength) : 0
		const forwardArrow = require('../../../static/icons/forwardArrowGrey.png')
		const setIcon = require('../../../static/icons/set_icon_lines.png')
		// Prompt
		const { promptOpen } = this.props;
		// Touch
		const { touching } = this.state;
		// Hover
		const { hovering } = this.state;
		// Loading
		const { loading } = this.state;
		const loadingStyles = {
			container: {
				margin: '3em 0'
			}
		}
		return (
			<div 
			className="display_flex flex_vertical flex_container_center relative" 
			style={{maxWidth: !isMobile ? '1050px' : '', minWidth: isMobile ? '' : '950px', padding: isMobile ? '' : '0 25px'}}>
				<ul 
				style={{
					padding: isMobile ? `${promptOpen ? '0em' : '3.5em'} 0 0` : '',
					margin: isMobile ? '0' : `${promptOpen ? '0' : '6em'} 0`,
					listStyleType: 'none',  
					width: '100%',
					border: isMobile ? '' : '1px solid #E6E8EA',
					borderRadius: '4px',
					background: '#fff',
					boxShadow: isMobile ? '' : '0 1px 1px 0 rgba(31,45,61,0.05)'
				}}>
					{!loading && assignments && assignments.map((assignment, i) => {
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
								padding: isMobile ? '1em 0 1em 0em' : '1em 1em 1em 0', 
								margin: isMobile ? '0 0 0 1em' : '0 0 0 1em', 
								borderBottom: renderBorder ? '1px solid #E6E8EA' : '',
								background: (touching === i) ? '#F5FAFE' : '#fff',
								cursor: 'pointer'
							}}
							key={assignment.title + i} 
							className="display_flex flex_horizontal flex_nowrap">
								<img src={setIcon} style={{height: '32px', width: '27px'}}/>
								<span style={{marginLeft: '20px', fontSize: isMobile ? '16px' : '17px'}}>
									<p style={{fontSize: isMobile ? '17px' : '18px', fontWeight: '600', color: '#333333'}}>
									{!isMobile && assignment.title}
									{isMobile && assignment.title.slice(0, 27) + (assignment.title.length > 27 ? '...' : '')}
									</p>
									<p style={{fontSize: isMobile ? '14px' : '15px', fontWeight: '400', color: '#AEB6BD', lineHeight: '1.75em'}}>
									{assignment.items_count} questions
									</p> 
								</span>
								<span 
								style={{
									position: 'absolute', 
									right: isMobile ? '1em' : '3em', 
									fontSize: isMobile ? '14px' : '15px', 
									color: '#AEB6BD'
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
						!loading && Array.from({length: emptyRows}).map((a, i) => {
							const last = i === emptyRows - 1
							return (
								<li 
								key={i} 
								style={{
									height: '67px', 
									marginLeft: '1em', 
									borderBottom: last ? '' : '1px solid #e4e4e4'}}>
								</li>
							)
						})
					}
					{
						true && Array.from({length: 6}).map((a, i) => {
							const last = i === 5
							return (
								<li 
								key={i} 
								style={{
									height: '67px', 
									marginLeft: '1em', 
									borderBottom: last ? '' : '1px solid #e4e4e4'}}>
									<div className="loading-item">
										<div className="animated-background">
										  <div className="background-masker header-top"></div>
									      <div className="background-masker header-left"></div>
									      <div className="background-masker header-right"></div>
									      <div className="background-masker header-bottom"></div>
									      <div className="background-masker subheader-left"></div>
									      <div className="background-masker subheader-right"></div>
									      <div className="background-masker subheader-bottom"></div>
										</div>
									</div>
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}
}
