import React, { Component, PropTypes } from 'react';
import { isEmpty } from '../../utils/helperfunctions';

export default class Header extends Component {

	static propTypes = {
		isMobile: PropTypes.bool,
		show: PropTypes.bool,
		params: PropTypes.object,
		location: PropTypes.object,
		pushState: PropTypes.func
	}

	render() {
		const logo = require('../WikiForm/QuizlyLogo.png');
		const { isMobile, show, params, location, pushState, scrolling } = this.props;
		const isNotHomeView = location.pathname.match(/quiz/gi);
		return (
			<div 
				style={{
					position: isNotHomeView ? 'fixed' : '',
					background: '#fff',
					width: '100%', 
					height: isMobile ? '40px' : '48px', 
					lineHeight: isMobile ? '40px' : '48px',
					padding: '0 25px',
					boxShadow: isNotHomeView ? '0px 1px 1px 0px rgba(203,203,203,0.50)' : '',
					padding: isNotHomeView ? '2em 50px' : '',
					zIndex: '2'
				}} 
				className={'display_flex flex_horizontal ' + (isNotHomeView ? 'flex_center' : '')}>
				{
					isMobile && !isNotHomeView
					&&
					<div style={{marginLeft: 'auto', marginTop: '10px', marginRight: '20px'}} className="flex_container_right">
						<a onClick={() => this.props.openHowItWorks(!show)} className="link">How It Works</a>
					</div> 
				}
				{
					isNotHomeView
					&&
					<h1 
						onClick={() => pushState(null, '/')}
						style={{
							fontSize: isMobile ? '24px' : '32px', 
							fontWeight: '600', 
							color: '#2C3239', 
							marginBottom: '20px',
							marginTop: '10px!important',
							cursor: 'pointer'
						}}
						className={'fade in'}>
						<span className="inline_block">
							<img style={{height: isMobile ? '20px' : '26px', marginRight: '5px'}} src={logo}/>
						</span>
							Quizly
						<span 
						style={{
							fontSize: '15px', 
							color: '#A8B6C1', 
							marginLeft: '5px'
						}} 
						className="inline_block small_text">
							BETA
						</span>
					</h1>
				}
			</div>
		);
	}
}
