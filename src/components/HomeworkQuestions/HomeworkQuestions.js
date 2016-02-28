import React, { Component, PropTypes } from 'react';

export default class HomeworkQuestions extends Component {
	static propTypes = {
	}

	state = {
		selected: ''
	}

	render() {
		const choices = ['Series A Round', "Seed round", 'Angel investor', 'Initial public offering']
		return (
			<div id="questions" style={{background: '#fff', height: '100%'}} className="display_flex flex_vertical">
				<div 
				id="cue" 
				style={{
					lineHeight: '1.25em', 
					margin: '1em', 
					padding: '1em', 
					background: '#fff', 
					border: '1px solid #E4E4E4', 
					borderRadius: '4px',
					boxShadow: '0 1px 7px 0 rgba(31,45,61,0.1)',
					fontSize: '17px'
				}}>
					What is a form of securities offering in which an investor invests capital in exchange for an equity stake in the company?
				</div>
				<ul id="choices" style={{margin: 'auto 1em 1em', listStyleType: 'none'}} className="">
					{
						choices.map((choice, i) => {
							const selected = this.state.selected === i
							return (
								<li 
								onClick={() => {
									this.setState({selected: i})
									this.props.selected()
								}}
								className="display_flex"
								style={{
									background: selected ? '#1FB6FF' : '#fff', 
									border: '1px solid', 
									borderColor: selected ? '#1FB6FF' : '#E4E4E4',
									borderRadius: '4px', 
									margin: '1em 0 0',
									boxShadow: '0 1px 1px 0 rgba(31,45,61,0.05)'
								}} 
								key={choice + i}>
									<a style={{
										padding: '15px 20px', 
										color: selected ? '#fff' : '#283643', 
										fontWeight: selected ? '500' : '400',
										textDecoration: 'none'
									}}>
										{choice}
									</a>
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}
}
