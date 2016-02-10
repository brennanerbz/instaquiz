import React, { Component, PropTypes } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default class WikiForm extends Component {
	static propTypes = {
		isMobile: PropTypes.bool
	}

	state = {
		wikiLink: ''
	}

	handleSubmitLink() {

	}

	tooltip(text) {
		return (
			<Tooltip id={'wiki_input' + text}><b>{text}</b></Tooltip>
		)
	}

	render() {
		const style = require('./WikiForm.scss');
		const logo = require('./QuizlyLogo.png');
		const { isMobile } = this.props;
		const { wikiLink } = this.state;
		return (
			<div 
				style={{padding: isMobile ? '0px 20px' : ''}} 
				id={style.wiki_form} 
				className="display_flex flex_vertical flex_center">
				<h1 
					style={{
						fontSize: isMobile ? '30px' : '36px', 
						fontWeight: '600', 
						color: '#2C3239', 
						marginBottom: '20px'
					}}>
					<span className="inline_block">
						<img style={{height: isMobile ? '26px' : '30px', marginRight: '5px'}} src={logo}/>
					</span>
						Quizly
					<span 
					style={{
						fontSize: '17px', 
						color: '#A8B6C1', 
						marginLeft: '5px'
					}} 
					className="inline_block small_text">
						BETA
					</span>
				</h1>
				<h2 style={{
					fontSize: isMobile ? '22px' : '26px',
					fontWeight: '300', 
					color: '#2C3239', 
					marginBottom: '20px', 
					textAlign: 'center'}}>
					Instantly transform any Wikipedia page into quiz questions
				</h2>
				<form 
					onSubmit={(e) => e.preventDefault()} 
					id={style.wiki_form} 
					className="display_flex flex_vertical flex_center">
					<div style={{marginBottom: '20px', width: '100%'}} className="input_wrapper relative">
						<input
							style={{
								height: '48px',
								fontSize: isMobile ? '16px' : '18px',
								lineHeight: '22px'
							}}
							type="submit"
							ref="wiki_input"
							className="input_with_icon"
							placeholder="Paste Wikipedia article URL here..."
							value={wikiLink}
							onChange={(e) => {
								this.setState({
									wikiLink: e.target.value
								});
							}}
							onKeyDown={(e) => {
								if(e.which === 13) {
									e.preventDefault()
									this.handleSubmitLink()
								}
							}}
							autoFocus={true}
						/>
						<OverlayTrigger 
							delayShow={500} 
							delayHide={0} 
							placement="bottom" 
							overlay={::this.tooltip('Click to transform Wiki page')}>
							<span 
								style={{
									fontSize: '1.1em'
								}}
								onClick={() => {
									if(wikiLink.length > 0) {
										this.handleSubmitLink()
									} else {
										this.refs.wiki_input.focus()
									}
								}}
								id={style.input_icon}
								className="fa fa-arrow-right right">
							</span>
						</OverlayTrigger>
					</div>
					{
						!isMobile
						&&
						<div className="flex_horizontal">
							<button 
								style={{
									marginRight: '10px'
								}}
								onClick={::this.handleSubmitLink}
								className="button primary_green">
								Transform
							</button>
							<button 
								onClick={() => this.props.openHowItWorks()}
								className="button primary_white">
								How It Works
							</button>
						</div>
					}
				</form>
			</div>
		);
	}
}
