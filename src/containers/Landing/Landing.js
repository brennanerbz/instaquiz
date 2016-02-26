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
		const halfiPhone = require('../../../static/images/halfIphone.png');
		return (
			<div id={style.landing} style={{height: '88%', borderBottom: '1px solid #8492A6'}} id={style.landing} className="display_flex flex_center">
				<div style={{marginBottom: '0'}} className="flex_container_center">
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
		);
	}
}
