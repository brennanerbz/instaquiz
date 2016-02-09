import React, { Component, PropTypes } from 'react';
import WorksItem from '../WorksItem/WorksItem';

export default class WorksList extends Component {
	static propTypes = {

	}

	state = {
		hiwItems: [
			{
				title: 'Paste a link',
				message: 'The Wikipedia article is sent to an artificially intelligent bot.',
				image: require('../WorksItem/share.png')
			},
			{
				title: 'Robot AI reads page',
				message: 'As the AI reads the page, it looks for key concepts, facts and explanations.',
				image: require('../WorksItem/bot.png')
			},
			{
				title: 'Generate questions',
				message: 'Using the material its gathered, it turns each piece into an engaging question.',
				image: require('../WorksItem/chat.png')
			}
		]
	}

	render() {
		const { isMobile } = this.props;
		const { hiwItems } = this.state;
		const style = require('./WorksList.scss');
		return (
			<div 
			style={{width: '100%', padding: '4em 0', borderBottom: '1px solid #DAE0E7'}} 
			className="display_flex flex_vertical">
				<i onClick={() => this.props.closeHowItWorks()} 
				style={{position: 'absolute', right: '25px', top: '25px', fontSize: '1.3em', color: '#A8B6C1', cursor: 'pointer'}} 
				className="fa fa-times"></i>
				<div className="flex_item_align_center">
				<h2 
					style={{
						fontSize: isMobile ? '18px' : '22px',
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
				<ul className={style.hiw_list}>
					{
						hiwItems.map((item, i) => {
							return (
								<WorksItem 
								index={i} 
								item={item}/>
							)
						})
					}
				</ul>
			</div>
		);
	}
}
