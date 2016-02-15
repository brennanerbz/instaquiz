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
		const logo = require('../WikiForm/QuizlyLogo.png');
		const { isMobile, show, params, location, pushState, scrolling } = this.props;
		const isNotHomeView = location.pathname.match(/quiz/gi);
		return (
			<div 
				style={{
					position: isNotHomeView ? 'fixed' : '',
					background: '#fff',
					width: '100%', 
					height: isNotHomeView && isMobile ? '' : (isMobile ? '40px' : '48px'), 
					lineHeight: isMobile ? '40px' : '48px',
					boxShadow: isNotHomeView ? '0px 1px 1px 0px rgba(203,203,203,0.50)' : '',
					padding: (isNotHomeView && !isMobile) ? '2em 50px' : '',
					zIndex: '2'
				}} 
				className={'display_flex flex_horizontal ' + (isNotHomeView ? 'flex_center' : '')}>
				<div 
				style={{maxWidth: '1000px', width: '100%'}} 
				className={(isMobile ? 'display_flex ' : '') + (isNotHomeView && !isMobile ? 'flex_center' : '')}>
					{
						isMobile && !isNotHomeView
						&&
						<div style={{marginLeft: 'auto', marginTop: '10px', marginRight: '20px'}} className="flex_item_align_right">
							<a onClick={() => this.props.openHowItWorks(!show)} className="link">How It Works</a>
						</div> 
					}
					<div style={{width: isMobile ? '100%' : '', padding: isMobile ? '0 1em' : ''}} className="flex_horizontal flex_nowrap">
						{
							isNotHomeView
							&&
							<h1 
								onClick={() => pushState(null, '/')}
								style={{
									fontSize: isMobile ? '20px' : '26px', 
									fontWeight: '600', 
									color: '#2C3239', 
									marginBottom: isMobile ? '15px' : '20px',
									marginTop: '13px!important',
									cursor: 'pointer',
								}}
								className={'fade in flex_item_align_left'}>
								<span className="inline_block">
									<img style={{height: '20px', marginRight: '5px'}} src={logo}/>
								</span>
								{
									!isMobile && isNotHomeView
									&&
									<span>
										Quizly
										<span 
										style={{
											fontSize: '14px', 
											color: '#A8B6C1', 
											marginLeft: '5px'
										}} 
										className="inline_block small_text">
											BETA
										</span>
									</span>
								}
							</h1>
						}
						{
							isNotHomeView
							&&
							<div style={{margin: '5px 0 0 15px', width: isMobile ? '100%' : '50%' }} className="flex_item_align_left">
								<WikiForm isNotHomeView={isNotHomeView} {...this.props}/>
							</div>
						}
					</div>
				</div>
			</div>
		);
	}
}
