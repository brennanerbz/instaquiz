import React, { Component, PropTypes } from 'react';

export default class ProductDetails extends Component {
	static propTypes = {
	}

	state = {
		features: [
			{
				heading: 'Snap',
				message: 'You snap a photo of any material to create an assignment.',
				image: require('./images/snap.png'),
			},
			{
				heading: 'Crack',
				message: 'We read the text to find all the key concepts and facts.',
				image: require('./images/crack.png'),
			},
			{
				heading: 'Tap',
				message: 'You swipe and tap to customize the auto-generated content.',
				image: require('./images/tap.png'),
			},
			{
				heading: 'Push',
				message: 'A single button sends it to all of your students.',
				image: require('./images/push.png'),
			},
			{
				heading: 'Read',
				message: 'Your students do the reading.',
				image: require('./images/read.png'),
			},
			{
				heading: 'Pop',
				message: 'Then get quizzed by adaptive system, which outsmarts cheaters.',
				image: require('./images/pop.png'),
			},
			{
				heading: 'Watch',
				message: 'Live scores roll in.',
				image: require('./images/watch.png'),
			}
		]
	}

	render() {
		// Style & More...
		const style = require('./Landing.scss');
		const arrowDown = require('../../../static/images/arrowDown.png');
		const { isMobile } = this.props;
		const { features } = this.state;
		return (
			<div id="features">
				<div style={{width: '100%', padding: '1em'}} id="arrow_to_features" className="display_flex flex_center flex_vertical">
					<img src={arrowDown} style={{height: '15px', margin: '20px 0!important'}}/>
					<h1 
						style={{
							color: '#3C4858',
							fontSize: '24px',
							marginTop: '20px!important', 
							paddingBottom: '15px', 
							borderBottom: '2px solid #1FB6FF'
						}}>
						How It Works
					</h1>
				</div>
				<div id="features_container" className="display_flex flex_center">
					<ul 
					id={style.features_list} 
					className={'dislay_flex flex_vertical' + ' ' + (isMobile ? style.mobile : '')} 
					style={{width: '100%', maxWidth: '1050px', minWidth: '950px', padding: '25px'}}>
						{
							features.map((feature, i) => {
								let even = i % 2 === 0;
								return (
									<li className={'flex_horizontal flex_wrap ' + style.feature + (isMobile ? ' flex_center ' : '')}>
										<span 
										style={{order: (even && !isMobile ? 1 : 2), width: '50%', minWidth: '350px'}} 
										className={'display_flex ' + (isMobile ? 'flex_center' : '')}>
											{
												feature.heading === 'Snap' || feature.heading === 'Watch'
												? <img src={feature.image} className={(!isMobile ? (even ? 'flex_item_align_left ' : 'flex_item_align_right ') : '') + style.feature_phone}/>
												: <img src={feature.image} className={(!isMobile ? (even ? 'flex_item_align_left ' : 'flex_item_align_right ' ) : '') + style.feature_closeup}/>
											}
										</span>
										<span 
										style={{
											order: (even && !isMobile ? 2 : 1), 
											width: '50%', 
											minWidth: '350px',
											textAlign: isMobile ? 'center' : '',
											marginBottom: isMobile ? '20px' : ''
										}} 
										className={'flex_container_center'}>
											<h1 className={style.feature_heading}>{feature.heading}</h1>
											<h3 className={style.feature_message}>{feature.message}</h3>
										</span>
									</li>
								)
							})
						}
					</ul>
				</div>
			</div>
		);
	}
}
