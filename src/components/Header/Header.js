import React, { Component, PropTypes } from 'react';
import { isEmpty } from '../../utils/helperfunctions';
import WikiForm from '../WikiForm/WikiForm';

export default class Header extends Component {

	static propTypes = {
		isMobile: PropTypes.bool,
		show: PropTypes.bool,
		params: PropTypes.object,
		location: PropTypes.object,
		pushState: PropTypes.func
	}

	render() {
		const blueLogo = require('../../../static/logo/nightlyLogoBlue.png');
		const whiteLogo = require('../../../static/logo/nightlyLogoWhite.png');
		const backArrow = require('../../../static/icons/backArrow.png')
		const forwardArrow = require('../../../static/icons/forwardArrow.png')

		const { isMobile, show, params, location, pushState, scrolling } = this.props;
		const isNotHomeView = location.pathname.match(/assignment|homework/gi);
		// Assignment | Teacher
		const assignmentView = location.pathname.match(/assignment/gi);
		// Homework | Student
		const homeworkView = location.pathname.match(/homework/gi);
		const readingView = location.pathname.match(/read/gi);
		const questionsView = location.pathname.match(/questions/gi);
		return (
			<div 
				style={{
					position: isNotHomeView ? 'fixed' : '',
					background: '#fff',
					width: '100%', 
					boxShadow: isNotHomeView ? '0px 1px 1px 0px rgba(203,203,203,0.50)' : '',
					zIndex: '2'
				}} 
				className={'display_flex flex_center'}>
				<div className="flex_horizontal" style={{maxWidth: '1050px', minWidth: isMobile ? '' : '950px', width: '100%', padding: isMobile ? '15px 10px 10px' : '15px 25px 10px'}}>
					{isMobile && isNotHomeView
					? null
					: <img 
					onClick={() => pushState(null, '/')} 
					src={blueLogo} 
					style={{
						height: isMobile ? '40px' : (isNotHomeView ? '45px' : '55px'),
						cursor: 'pointer'
					}}/>}
					{assignmentView && isMobile &&
					<span onClick={() => pushState(null, '/')} style={{height: '30px', lineHeight: '25px', fontSize: '16.5px' }}>
						<img src={backArrow} style={{height: '18.5px', position: 'absolute', top: '18px'}}/>
						<a style={{marginLeft: '17px'}} className="link">Assignments</a>
					</span>}
					{homeworkView && isMobile &&
					<span className="flex_item_align_center" style={{height: '30px', lineHeight: '25px', fontSize: '16.5px' }}>
						<p style={{fontWeight: '500', color: '#3C4858'}}>
						{readingView && 'Reading'}{questionsView && 'Questions'}
						</p>
					</span>}
					{homeworkView && readingView && isMobile &&
					<span style={{position: 'absolute', right: '10px', top: '18px'}}>
						<a style={{marginRight: '27px'}} className="link">Questions</a>
						<img src={forwardArrow} style={{height: '18.5px', position: 'absolute', right: '10px', top: '0'}}/>
					</span>}
					{
						!isNotHomeView
						&&
						<ul style={{lineHeight: isMobile ? '45px' : '55px'}} className="flex_container_right link_list">
							<li className="link_list_item">
								<a href="#features" className="grey link">How It Works</a>
							</li>
						</ul>

					}
				</div>
			</div>
		);
	}
}
