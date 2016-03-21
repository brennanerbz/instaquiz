import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import cookie from 'react-cookie';
import { pushState } from 'redux-router';

import { createUser } from '../../redux/modules/user';
import * as overlayActions from '../../redux/modules/overlays';

// Children
import Features from './Features';

@connect(state => ({
	}),
	dispatch => ({
		...bindActionCreators({
			pushState,
			createUser,
			...overlayActions
		}, dispatch)
	})
)
export default class Landing extends Component {
	static propTypes = {
	}

	componentDidMount() {
		console.log('Landing mounted')
		setTimeout(() => {
			console.log('ES6 Timeout worked')
		})
	}

	render() {
		const style = require('./Landing.scss');
		const { location, isMobile, pushState } = this.props;
		const halfiPhone = require('../../../static/images/halfIphone.png');
		const whiteLogo = require('../../../static/logo/nightlyLogoWhite.png')
		// Modal Actions
		const { openModal, closeModal } = this.props;
		// isTeacher
		const isTeacher = cookie.load('token', {path: '/'})
		return (
			<div id="landing">
				<div id="hero">
					<div style={{borderBottom: '1px solid #D7D8DA', display: 'block'}}>
						<div style={{marginBottom: '0', marginTop: '0'}} className="flex_container_center">
							<div 
								style={{padding: isMobile ? '10px 20px 0' : '70px 0 0'}} 
								className="display_flex flex_vertical flex_center">
								<h1 
									className={style.hero_heading}
									style={{
										fontWeight: '600', 
										color: '#3C4858', 
										marginBottom: '20px'
									}}>
									Homework. Automated. 
								</h1>
								<h2 
									style={{
										maxWidth: isMobile ? '350px' : '550px',
										fontSize: isMobile ? '18px' : '24px',
										fontWeight: '300',
										color: '#8492A6',
										textAlign: 'center'
									}}>
									A simple app that automates the way teachers create, assign and grade homework.
								</h2>
								<button 
								onClick={() => {
									if(!isTeacher) {
										this.props.createUser()
									}
									openModal('create_assignment')
								}} 
								style={{ margin: isMobile ? '20px 0' : '20px 0 50px'}} 
								className="button primary_blue">
									Create new assignment
								</button>
								<img src={halfiPhone} style={{height: isMobile ? '265px' : '350px'}}/>
							</div>
						</div>
					</div>
				</div>
				<Features isMobile={isMobile}/>
				<div 
				id="create bottom" 
				style={{background: '#00B5FF', padding: '10em 1em', marginTop: '80px'}} className="display_flex flex_center flex_vertical">
					<h1 
					className={style.action_heading}
					style={{fontWeight: '300', color: '#fff', marginBottom: '30px', textAlign: 'center'}}>
					You and your class will do great things with Nightly.
					</h1>
					<button 
					onClick={() => {
						if(!isTeacher) {
							this.props.createUser()
						}
						openModal('create_assignment')
					}} 
					className="button" 
					style={{background: '#009CEE', color: '#fff', border: 'none'}}>
						Create a new assignment
					</button>
				</div>
				<div 
				id={style.landing_footer}
				className="display_flex flex_center"
				style={{padding: '7em 0', background: '#263345'}}>
					<div style={{
							width: '100%',  
							maxWidth: '1050px', 
							minWidth: isMobile ? '' : '950px', 
							padding: '0 25px'
						}} 
						className={(isMobile ? 'flex_center ' : '') + 'flex_horizontal flex_wrap'}>
						<div 
						style={{order: '0', width: isMobile ? '100%' : '23.8%', minWidth: isMobile ? '' : '200px', marginBottom: '40px'}} 
						className={'flex_vertical' + ' ' + (isMobile ? 'flex_center' : '')}>
							<img 
							onClick={() => pushState(null, '/')} 
							src={whiteLogo} 
							style={{height: isMobile ? '45px' : '55px', width: isMobile ? '115px' : '140px', cursor: 'pointer'}}/>
						</div>
						<div 
						style={{order: '1', width: isMobile ? '100%' : '23.8%', minWidth: isMobile ? '' : '200px', marginBottom: '40px'}} 
						className={'flex_vertical'}>
							<ul className={'link_list' + ' ' + (isMobile ? 'display_flex flex_center flex_vertical' : '')}>
								<li className={style.footer_link_header}>
									PRODUCT
								</li>
								<li className={style.footer_link}>
									<a href="#features">How It Works</a>
								</li>
							</ul>
						</div>
						<div 
						style={{order: '2', width: isMobile ? '100%' : '23.8%', minWidth: isMobile ? '' : '200px', marginBottom: '40px'}} 
						className={'flex_vertical'}>
							<ul className={'link_list' + ' ' + (isMobile ? 'display_flex flex_center flex_vertical' : '')}>
								<li className={style.footer_link_header}>
									COMPANY
								</li>
								<li className={style.footer_link}>
									<a>About Us</a>
								</li>
							</ul>
						</div>
						<div 
						style={{order: '3', width: isMobile ? '100%' : '23.8%', minWidth: isMobile ? '' : '200px', marginBottom: '40px'}} 
						className={'flex_vertical'}>
							<ul className={'link_list' + ' ' + (isMobile ? 'display_flex flex_center flex_vertical' : '')}>
								<li className={style.footer_link_header}>
									HANDY LINKS
								</li>
								<li 
								onClick={() => {openModal('create_assignment')}}
								className={style.footer_link}>
									<a>Create a new assignment</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
