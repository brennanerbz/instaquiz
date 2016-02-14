import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import cookie from 'react-cookie';
import { pushState } from 'redux-router';

// Components
import WikiForm from '../../components/WikiForm/WikiForm';
import WikiTrendingList from '../../components/WikiTrendingList/WikiTrendingList';

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
		const logo = require('../../components/WikiForm/QuizlyLogo.png');
		return (
			<div id={style.landing} style={{height: '88%'}} id={style.landing} className="display_flex flex_center">
				<div className="flex_container_center">
					<div 
						style={{padding: isMobile ? '0px 20px' : ''}} 
						className="display_flex flex_vertical flex_center">
						<h1 
							style={{
								fontSize: isMobile ? '30px' : '36px', 
								fontWeight: '600', 
								color: '#2C3239', 
								marginBottom: '20px'
							}}>
							<span className="inline_block">
								<img style={{height: isMobile ? '26px' : '30px', marginRight: '5px'}} src={logo}/>
							</span>
								Quizly
							<span 
							style={{
								fontSize: '17px', 
								color: '#A8B6C1', 
								marginLeft: '5px'
							}} 
							className="inline_block small_text">
								BETA
							</span>
						</h1>
						<h2 style={{
							fontSize: isMobile ? '22px' : '26px',
							fontWeight: '300', 
							color: '#2C3239', 
							marginBottom: '20px', 
							textAlign: 'center'}}>
							Instantly transform any Wikipedia page into quiz questions
						</h2>
						<WikiForm isNotHomeView={false} {...this.props}/>
					</div>
					<WikiTrendingList {...this.props}/>
				</div>
			</div>
		);
	}
}
