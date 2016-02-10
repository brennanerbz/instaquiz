import React, { Component, PropTypes } from 'react';
// Components
import WikiForm from '../../components/WikiForm/WikiForm';
import WikiTrendingList from '../../components/WikiTrendingList/WikiTrendingList';

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
