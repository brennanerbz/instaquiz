import React, { Component, PropTypes } from 'react';

export default class QuizContent extends Component {
	static propTypes = {
	}

	state = {
		questions: [
			{
				question: 'What is a?',
				answer: 'b'
			},
			{
				question: 'What is b?',
				answer: 'a'
			},
			{
				question: 'What is a?',
				answer: 'b'
			},
			{
				question: 'What is b?',
				answer: 'a'
			},
			{
				question: 'What is a?',
				answer: 'b'
			},
			{
				question: 'What is b?',
				answer: 'a'
			},
			{
				question: 'What is a?',
				answer: 'b'
			},
			{
				question: 'What is b?',
				answer: 'a'
			},
			{
				question: 'What is a?',
				answer: 'b'
			},
			{
				question: 'What is b?',
				answer: 'a'
			},
			{
				question: 'What is a?',
				answer: 'b'
			},
			{
				question: 'What is b?',
				answer: 'a'
			},
			{
				question: 'What is a?',
				answer: 'b'
			},
			{
				question: 'What is b?',
				answer: 'a'
			},
			{
				question: 'What is a?',
				answer: 'b'
			},
			{
				question: 'What is b?',
				answer: 'a'
			},
			{
				question: 'What is a?',
				answer: 'b'
			},
			{
				question: 'What is b?',
				answer: 'a'
			}
		]
	}

	render() {
		const style = require('./QuizContent.scss');
		const { questions } = this.state;
		return (
			<ul style={{marginTop: '2em', marginBottom: '2em', padding: '0.25em 1em', border: '1px solid #DAE0E7', borderRadius: '0.25em', width: '100%'}}>
				{
					questions.map((question, i) => {
						return (
							<li key={i} style={{padding: '1em', borderTop: i !== 0 ? '1px solid #DAE0E7' : ''}} className="display_flex flex_horizontal">
								<p style={{width: '50%'}} className="flex_item_align_left">
								{question.question}
								</p>
								<p style={{width: '50%'}} className="flex_item_align_right">
								{question.answer}
								</p>
							</li>
						)
					})
				}
			</ul>
		);
	}
}
