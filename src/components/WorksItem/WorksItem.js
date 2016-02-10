import React, { Component, PropTypes } from 'react';

export default class WorksItem extends Component {
	static propTypes = {
	}

	render() {
		const { item, index } = this.props;
		const style = require('./WorksItem.scss');
		return (
			<div style={{padding: '0 0.5em'}} order={index} className={style.hiw_item}>
				<div className={style.hiw_item_icon}>
					<img src={item.image}/>
				</div>
				<h3 className={style.hiw_item_title}>
					{item.title}
				</h3>
				<p className={style.hiw_item_content}>
					{item.message}
				</p>
			</div>
		);
	}
}
