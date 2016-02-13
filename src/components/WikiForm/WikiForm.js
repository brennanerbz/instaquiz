import React, { Component, PropTypes } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';

const articles = [
	  {
	    name: 'C',
	    year: 1972
	  },
	  {
	    name: 'C#',
	    year: 2000
	  },
	  {
	    name: 'C++',
	    year: 1983
	  },
	  {
	    name: 'Clojure',
	    year: 2007
	  },
	  {
	    name: 'Elm',
	    year: 2012
	  },
	  {
	    name: 'Go',
	    year: 2009
	  },
	  {
	    name: 'Haskell',
	    year: 1990
	  },
	  {
	    name: 'Java',
	    year: 1995
	  },
	  {
	    name: 'Javascript',
	    year: 1995
	  },
	  {
	    name: 'Perl',
	    year: 1987
	  },
	  {
	    name: 'PHP',
	    year: 1995
	  },
	  {
	    name: 'Python',
	    year: 1991
	  },
	  {
	    name: 'Ruby',
	    year: 1995
	  },
	  {
	    name: 'Scala',
	    year: 2003
	  }
]

function getArticleSuggestions(value) {
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;

	return inputLength === 0 ? [] : articles.filter(article =>
		article.name.toLowerCase().slice(0, inputLength) === inputValue
	);
}

function getSuggestionValue(suggestion) {
	return suggestion.name;
}

function renderSuggestion(suggestion) {
	return (
		<span>{suggestion.name}</span>
	);
}

export default class WikiForm extends Component {
	static propTypes = {
		isMobile: PropTypes.bool
	}

	state = {
		value: '',
		articles: getArticleSuggestions('')
	}

	onChange(event, { newValue, method }) {
		this.setState({value: newValue});
	}

	onSuggestionsUpdateRequested({ value }) {
		this.setState({
			articles: getArticleSuggestions(value)
		});
	}

	onSuggestionSelected(event, {suggestion, suggestionValue, method}) {
	}

	handleSubmitLink(event) {
		if(event.which === 13) {
			const { pushState } = this.props;
			const { value } = this.state;
			if(value.length > 0) {
				const articleTitle = value.replace(/ /g, '-')
				pushState(null, `/quiz/${articleTitle}`)
			}
		}
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
		const { value, articles } = this.state;
		const inputProps = {
			autoFocus: true,
			style: {
				height: '48px',
				fontSize: isMobile ? '16px' : '18px',
				lineHeight: '22px'
			},
			placeholder: 'Search Wikipedia articles...',
			value,
			onChange: ::this.onChange,
			onKeyDown: ::this.handleSubmitLink
		}
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
				<div 
					id={style.wiki_form} 
					className="display_flex flex_vertical flex_center">
					<div style={{marginBottom: '20px', width: '100%'}} className="input_wrapper relative">
						<Autosuggest
							suggestions={articles}
							onSuggestionsUpdateRequested={::this.onSuggestionsUpdateRequested}
		                    getSuggestionValue={getSuggestionValue}
		                    onSuggestionSelected={::this.onSuggestionSelected}
		                    renderSuggestion={renderSuggestion}
		                    inputProps={inputProps}
						/>
						<OverlayTrigger 
							delayShow={500} 
							delayHide={0} 
							placement="bottom" 
							overlay={::this.tooltip('Click to transform value page')}>
							<span 
								style={{
									fontSize: '1.1em'
								}}
								onClick={() => {
									if(value.length > 0) {
										this.handleSubmitLink()
									} else {
										this.refs.wiki_input.focus()
									}
								}}
								id={style.input_icon}
								className="fa fa-search right">
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
								onClick={() => { 
									if(value.length > 0) {
										this.handleSubmitLink()
									}
								}}
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
				</div>
			</div>
		);
	}
}
