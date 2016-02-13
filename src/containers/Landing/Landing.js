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
		return (
			<div id={style.landing} style={{height: '88%'}} id={style.landing} className="display_flex flex_center">
				<div className="flex_container_center">
					<WikiForm {...this.props}/>
					<WikiTrendingList {...this.props}/>
				</div>
			</div>
		);
	}
}
