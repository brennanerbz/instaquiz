import React, { Component, PropTypes } from 'react';

export default class HomeworkQuestions extends Component {
	static propTypes = {
	}

	state = {
		selected: -1
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.question.cue !== nextProps.question.cue) this.setState({selected: ''})
	}

	render() {
		const { question } = this.props;
		const { isMobile } = this.props;
		return (
			<div id="questions" style={{background: '#fff', height: '100%', fontSize: isMobile ? '16px' : '18px'}} className="display_flex flex_vertical">
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
					overflow: 'scroll'
				}}>
				{question && question.cue}
				</div>
				<ul id="choices" style={{margin: 'auto 1em 1em', listStyleType: 'none'}} className="">
					{
						question && question.choices && question.choices.map((choice, i) => {
							const selected = this.state.selected === i
							return (
								<li 
								onClick={() => {
									this.setState({
										selected: i
									});
									this.props.selectAnswer(choice)
									this.props.selected()
								}}
								className="display_flex"
								style={{
									background: selected ? '#1FB6FF' : '#fff', 
									border: '1px solid', 
									borderColor: selected ? '#1FB6FF' : '#E4E4E4',
									borderRadius: '4px', 
									margin: '1em 0 0',
									boxShadow: '0 1px 1px 0 rgba(31,45,61,0.05)',
									cursor: 'pointer'
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
				{!isMobile &&
				<button 
				onClick={() => this.props.submitAnswer()}
				style={{
					width: '150px', 
					marginLeft: '1em', 
					marginRight: 'auto', 
					boxShadow: this.state.selected < 0 ? 'none' : '',
					cursor: this.state.selected < 0 ? 'default' : 'pointer'
				}} 
				type="button" 
				className={'button' + ' ' + (this.state.selected > -1 ? 'primary_blue' : '')}>
					Next
				</button>}
			</div>
		);
	}
}
