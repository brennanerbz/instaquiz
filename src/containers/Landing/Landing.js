import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import cookie from 'react-cookie';
import { pushState } from 'redux-router';

// Children
import Features from './Features';

@connect(state => ({
	// the list of top wiki articles
	}),
	dispatch => ({
		...bindActionCreators({
			pushState
		}, dispatch)
	})
)
export default class Landing extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./Landing.scss');
		const { location, isMobile } = this.props;
		const halfiPhone = require('../../../static/images/halfIphone.png');
		const whiteLogo = require('../../../static/logo/nightlyLogoWhite.png')
		return (
			<div id="landing">
				<div id="hero">
					<div id={style.landing} style={{borderBottom: '1px solid #D7D8DA'}} id={style.landing} className="display_flex flex_center">
						<div style={{marginBottom: '0', marginTop: '0'}} className="flex_container_center">
							<div 
								style={{padding: isMobile ? '0px 20px' : ''}} 
								className="display_flex flex_vertical flex_center">
								<h1 
									style={{
										fontSize: isMobile ? '28px' : '34px', 
										fontWeight: '600', 
										color: '#3C4858', 
										marginBottom: '20px'
									}}>
									Homework. Automated. 
								</h1>
								<h2 
									style={{
										maxWidth: isMobile ? '350px' : '550px',
										fontSize: isMobile ? '21px' : '24px',
										fontWeight: '300',
										color: '#8492A6',
										textAlign: 'center'
									}}>
									A simple app that automates the way teachers create, assign and grade homework.
								</h2>
								<button style={{margin: '20px 0'}} className="button primary_blue">
									Create assignment
								</button>
								<img src={halfiPhone} style={{height: isMobile ? '285px' : '350px'}}/>
							</div>
						</div>
					</div>
				</div>
				<Features isMobile={isMobile}/>
				<div id="create bottom" style={{background: '#00B5FF', padding: '10em 0', marginTop: '80px'}} className="display_flex flex_center flex_vertical">
					<h1 style={{fontSize: '28px', fontWeight: '300', color: '#fff', marginBottom: '30px', textAlign: 'center'}}>You and your class will do great things with Nightly.</h1>
					<button className="button" style={{background: '#009CEE', color: '#fff'}}>
						Create a new assignment
					</button>
				</div>
				<div 
				id={style.landing_footer}
				className="display_flex flex_center"
				style={{padding: '7em 0', background: '#263345'}}>
					<div style={{width: '100%', maxWidth: '1000px'}} className={(isMobile ? 'flex_center ' : '') + 'flex_horizontal flex_wrap'}>
						<div style={{order: '1', minWidth: '200px', marginBottom: '40px'}} className="span_1_of_4 flex_vertical">
							<img src={whiteLogo} style={{height: '73px', width: '157px'}}/>
						</div>
						<div style={{order: '2', minWidth: '200px', marginBottom: '40px'}} className="span_1_of_4 flex_vertical">
							<ul className="link_list">
								<li className={style.footer_link_header}>
									PRODUCT
								</li>
								<li className={style.footer_link}>
								How It Works
								</li>
							</ul>
						</div>
						<div style={{order: '3', minWidth: '200px', marginBottom: '40px'}} className="span_1_of_4 flex_vertical">
							<ul className="link_list">
								<li className={style.footer_link_header}>
									COMPANY
								</li>
								<li className={style.footer_link}>
								About Us
								</li>
							</ul>
						</div>
						<div style={{order: '4', minWidth: '200px', marginBottom: '40px'}} className="span_1_of_4 flex_vertical">
							<ul className="link_list">
								<li className={style.footer_link_header}>
									HANDY LINKS
								</li>
								<li className={style.footer_link}>
									Create a new assignment
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
