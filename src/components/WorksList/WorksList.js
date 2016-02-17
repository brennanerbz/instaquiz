import React, { Component, PropTypes } from 'react';
import WorksItem from '../WorksItem/WorksItem';

export default class WorksList extends Component {
	static propTypes = {

	}

	state = {
		hiwItems: [
			{
				title: 'Search for article',
				message: 'Once selected, the Wikipedia article is sent to an A.I.',
				image: require('../WorksItem/search.png')
			},
			{
				title: 'Our A.I. reads article',
				message: 'As the A.I. reads the page, it looks for key concepts, facts and explanations.',
				image: require('../WorksItem/bot.png')
			},
			{
				title: 'Practice with A.I.',
				message: 'The AI turns each piece it\'s collected into an engaging practice question.',
				image: require('../WorksItem/chat.png')
			}
		]
	}

	render() {
		const { isMobile, show } = this.props;
		const { hiwItems } = this.state;
		const style = require('./WorksList.scss');
		return (
			<div style={{display: show ? 'block' : 'none', boxSizing: 'border-box', position: 'relative'}}>
				<div 
				style={{width: '100%', padding: isMobile ? '5em 0 0 0' : '5em 0', borderBottom: '1px solid #DAE0E7'}} 
				className="display_flex flex_vertical">
					<i 
					id={style.close_icon}
					onClick={() => this.props.closeHowItWorks()} 
					className="fa fa-times"></i>
					<div className="flex_item_align_center">
					<h2 
						style={{
							fontSize: isMobile ? '19px' : '22px',
							fontWeight: '500', 
							color: '#2C3239', 
							marginBottom: '45px', 
							textAlign: 'center',
							paddingBottom: '10px',
							borderBottom: '2px solid #00E05A'
						}}>
						How It Works
					</h2>
					</div>
					<ul style={{padding: '0px 30px'}} className={style.hiw_list}>
						{
							hiwItems.map((item, i) => {
								return (
									<WorksItem 
									key={item.title + i}
									index={i} 
									item={item}/>
								)
							})
						}
					</ul>
				</div>
			</div>
		);
	}
}
