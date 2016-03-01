import React, { Component, PropTypes } from 'react';
import cookie from 'react-cookie';
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

	state = {
		progress: 0,
		length: 0,
		touching: ''
	}

	componentDidMount() {
		this.setProgressWidth(this.props)
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.homework_sequence.questions_completed !== nextProps.questions_completed) {
			this.setProgressWidth(nextProps)
		}
	}

	setProgressWidth(props) {
		// Progress
		const { homework_sequence } = props;
		const windowWidth = window ? window.innerWidth : 0;
		const progress = homework_sequence.questions_completed / (homework_sequence.questions_completed + homework_sequence.questions_remaining)
		this.setState({
			progress: progress,
			length: windowWidth * progress
		});
	}

	render() {
		const blueLogo = require('../../../static/logo/nightlyLogoBlue.png');
		const soloLogo = require('../../../static/logo/nightlySolo.png');
		const whiteLogo = require('../../../static/logo/nightlyLogoWhite.png');
		const backArrow = require('../../../static/icons/backArrow.png')
		const forwardArrow = require('../../../static/icons/forwardArrow.png')
		const forwardArrowGrey = require('../../../static/icons/forwardArrowGrey.png')
		const add = require('../../../static/icons/add.png')

		const { isMobile, show, params, location, pushState, scrolling } = this.props;
		const route = location.pathname.split('/')[2]
		const isNotHomeView = location.pathname.match(/assignment|homework/gi);
		// Assignment | Teacher
		const assignmentView = location.pathname.match(/assignment/gi);
		// Assignment | Index | Teacher
		const { user, teacher } = this.props;
		const assignmentsView = user && teacher && location.pathname == "/"
		// Homework | Student
		const homeworkView = location.pathname.match(/homework/gi);
		const readingView = location.pathname.match(/read/gi);
		const questionsView = location.pathname.match(/questions/gi);
		const { student_name, selected } = this.props;
		const student = cookie.load('student', {path: '/'})
		// Progress length
		const { progress, length } = this.state;
		// Touch
		const { touching } = this.state;
 		return (
			<div 
				style={{
					position: isNotHomeView || assignmentsView ? 'fixed' : '',
					background: '#fff',
					width: '100%', 
					boxShadow: isNotHomeView || assignmentsView ? '0px 1px 1px 0px rgba(203,203,203,0.50)' : '',
					zIndex: '2'
				}} 
				className={'display_flex flex_center'}>

				{isMobile && 
				<div 
				className="animate_width"
				style={{position: 'fixed', top: '0', width: isNaN(length) ? 0 : length, height: '3px', background: '#1FB7FF'}}>
				</div>}

				<div 
				className="flex_horizontal relative" 
				style={{
					maxWidth: homeworkView ? '750px' : '1050px', 
					minWidth: isMobile || homeworkView ? '' : '950px', 
					width: '100%', 
					padding: isMobile ? '15px 10px 10px' : '15px 25px 10px'
				}}>

					{(isMobile && isNotHomeView) || assignmentsView
					? null
					: <img 
					onClick={() => {
						if(!student) {
							pushState(null, '/')
						}
					}} 
					src={blueLogo} 
					style={{
						height: isMobile ? '40px' : (isNotHomeView ? '45px' : '55px'),
						cursor: !student && 'pointer',
						position: homeworkView ? '' : 'absolute',
						left: '25px'
					}}/>}
					{
						isMobile && (homeworkView || assignmentsView) &&
						<img src={soloLogo} style={{height: '31px', position: 'absolute', left: '1em'}}/>
					}
					{<span style={{minHeight: isMobile ? '30px' : '40px'}}>&nbsp;</span>}

					{assignmentsView && isMobile && 
					<span className="flex_item_align_center" style={{height: '30px', lineHeight: '25px', fontSize: '16.5px' }}>
						<p style={{fontWeight: '600', color: '#3C4858'}}>
						Assignments
						</p>
					</span>}
					{assignmentsView && isMobile &&
					<img 
					onTouchStart={() => this.setState({touching: 'add'})}
					onTouchEnd={() => this.setState({touching: ''})}
					onClick={() => this.props.openModal('create_assignment')} 
					src={add} 
					className={touching === 'add' ? 'touching' : ''}
					style={{height: '18.5px', position: 'absolute', right: '10px', top: '18px'}}/>}
					{assignmentView && isMobile &&
					<span 
					onTouchStart={() => this.setState({touching: 'assignments'})}
					onTouchEnd={() => this.setState({touching: ''})}
					className={touching === 'assignments' ? 'touching' : ''}
					onClick={() => pushState(null, '/')} style={{height: '30px', lineHeight: '25px', fontSize: '16.5px' }}>
						<img src={backArrow} style={{height: '18.5px', position: 'absolute', top: '18px'}}/>
						<a style={{marginLeft: '17px'}} className="link">Assignments</a>
					</span>}


					{homeworkView && isMobile &&
					<span 
					className="flex_item_align_center" 
					style={{height: '30px', lineHeight: '25px', fontSize: '16.5px', maxWidth: '200px'}}>
						<p style={{fontWeight: '600', color: '#3C4858'}} className="overflow_ellipsis">
						{this.props.homework_title}
						</p>
					</span>}
					{homeworkView && !isMobile && 
					<span 
					className="flex_item_align_center" 
					style={{
						height: isMobile ? '30px' : '45px', lineHeight: isMobile ? '25px' : '40px', fontSize: isMobile ? '16.5px' : '18.5px',
						maxWidth: '200px'
					}}>
						<p 
						style={{fontWeight: '600', color: '#3C4858'}} 
						className="overflow_ellipsis">
						{this.props.homework_title}
						</p>
					</span>}
					{
						!isMobile && questionsView &&
						<span 
							style={{
								background: '#e4e4e4', 
								height: '8px', 
								width: '150px', 
								borderRadius: '4px',
								margin: '1em 1em 0 0'
							}}>
							<span 
							className="display_flex" 
							style={{
								background: '#1FB7FF', 
								width: progress * 150 + 'px', 
								height: '8px',
								borderTopLeftRadius: '4px',
								borderBottomLeftRadius: '4px'
							}}>
							</span>
						</span>
					}
					{homeworkView && readingView && isMobile &&
					<span style={{position: 'absolute', right: '10px', top: '18px'}}>
						<a onClick={() => {
								if(student_name === null || student_name === undefined || student_name.length === 0) {
									this.props.nameError()
								} else {
									this.props.pushState(null, `/homework/${route}/questions`)
								}
							}} 
							style={{marginRight: '27px'}} 
							className="link">Questions</a>
						<img src={forwardArrow} style={{height: '18.5px', position: 'absolute', right: '10px', top: '0'}}/>
					</span>}

					{
						!isNotHomeView && !assignmentsView
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
