import React, { Component, PropTypes } from 'react';

export default class WikiForm extends Component {
	static propTypes = {
		isMobile: PropTypes.bool
	}

	state = {
		quizzes: ['Neuron', 'Osmosis', 'Debt', 'Interest', 'Cell',  'Supply and demand', 'Venture capital', 'Private equity']
	}

	render() {
		const { isMobile, pushState } = this.props;
		const { quizzes } = this.state;
		return (
			<div 
			style={{marginTop: isMobile ? '20px' : '60px'}} 
			className="display_flex flex_vertical flex_center">
				<h2 style={{fontSize: '24px', fontWeight: '300', color: '#2C3239', marginBottom: '20px'}}>
					Popular quizzes
				</h2>
				<div id="popular_list" className="flex_horizontal">
					<ul className="list">
						{
							quizzes
							.filter((q, i) => { return  i < 4 })
							.map((quiz) => {
								return (
									<li style={{textAlign: isMobile ? 'center' : ''}} className="list_item">
										<a 
										onClick={() => pushState(null, `/quiz/${quiz.replace(/ /g, '-')}`)}
										className="link">{quiz}</a>
									</li>
								)
							})
						}
					</ul>
					{
						!isMobile
						&&
						<ul className="list">
							{
								quizzes
								.filter((q, i) => { return  i > 3 && i < 8 })
								.map((quiz) => {
									return (
										<li className="list_item">
											<a 
											onClick={() => pushState(null, `/quiz/${quiz.replace(/ /g, '-')}`)}
											className="link">{quiz}</a>
										</li>
									)
								})
							}
						</ul>
					}
				</div>
			</div>
		);
	}
}
