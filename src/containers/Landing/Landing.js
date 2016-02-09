import React, { Component, PropTypes } from 'react';
// Components
import WikiForm from '../../components/WikiForm/WikiForm';
import WikiTrendingList from '../../components/WikiTrendingList/WikiTrendingList';

export default class Landing extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./Landing.scss');
		return (
			<div id={style.landing} style={{height: '100%'}} id={style.landing} className="display_flex flex_center">
				<div className="flex_container_center">
					<WikiForm/>
					<WikiTrendingList/>
				</div>
			</div>
		);
	}
}
