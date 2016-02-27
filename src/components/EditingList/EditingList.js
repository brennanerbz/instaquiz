import React, { Component, PropTypes } from 'react';

export default class EditingList extends Component {
	static propTypes = {
	}

	state = {
		isMouseOver: false,
		hovering: null
	}

	render() {
		const checkmark = require('../../../static/icons/select.png');
		const style = require('./EditingList.scss');
		const { items } = this.props;
		const { isMobile } = this.props;
		const { isMouseOver, hovering } = this.state;
		return (
			<ul style={{
				border: '1px solid #DFE6ED', 
				borderRadius: isMobile ? '1px' : '4px', 
				padding: '1em', 
				margin: isMobile ? '10px 0' : '20px 0', 
				background: '#fff'}}>
				{items.map((item, i)=> {
					return (
						<li 
						key={item.target + i}
						// onMouseEnter={() => {
						// 	this.setState({
						// 		isMouseOver: true,
						// 		hovering: i
						// 	});
						// }}
						// onMouseLeave={() => {
						// 	this.setState({
						// 		isMouseOver: false,
						// 		hovering: null
						// 	});
						// }}
						onClick={() => this.props.handleSelectItem(item.id)}
						style={{
							cursor: 'pointer', 
							fontSize: isMobile ? '14px' : '15px',
							// background: (isMouseOver && hovering == i) ? '#fafafa!important' : ''
						}}
						className={style.list_item + ' ' + 'display_flex flex_horizontal'}>
							<span id="check" style={{
								// opacity: (isMouseOver && hovering == i) ? '100%' : '90%',
								width: '10%',
								padding: (i == 0 && '0 0 1em 0') || (i == items.length - 1 && '1em 0 0 0') || '1em 0', 
							}}>
								{item.selected && <img src={checkmark} style={{width: '18px'}} />}
								{!item.selected && 
								<span style={{width: '18px', height: '18px', display: 'block', border: '1px solid #ccc', borderRadius: '2px'}}></span>}
							</span>
							<span id="target" style={{
								padding: (i == 0 && '0 0 1em 0') || (i == items.length - 1 && '1em 0 0 0') || '1em 0', 
								width: '45%', borderBottom: (i !== items.length - 1 && '1px solid #DFE6ED')
							}}>
								<b>{item.target}</b>
							</span>
							<span id="cue" style={{
								padding: (i == 0 && '0 0 1em 0') || (i == items.length - 1 && '1em 0 0 0') || '1em 0', 
								width: '45%', borderBottom: (i !== items.length - 1 && '1px solid #DFE6ED')
							}}>
								{item.cue}
							</span>
						</li>
					)
				})}
			</ul>
		);
	}
}
