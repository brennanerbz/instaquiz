import React, { Component, PropTypes } from 'react';

export default class HomeworkReading extends Component {
	static propTypes = {
	}

	render() {
		const { isMobile } = this.props;
		const { reading } = this.props;
		return (
			<div id="reading">
				<div 
					className="display_flex flex_horizontal flex_nowrap" 
					style={{padding: isMobile ? '0' : '15px', borderBottom: '1px solid #E4E4E4'}}>
					<label 
					style={{marginLeft: '1em', fontSize: '16px', fontWeight: '500', color: '#3C4858', width: '15%', lineHeight: '50px'}}>
						Name
					</label>
					<input
						style={{
							border: 'none',
							width: '85%',
							lineHeight: '18px'
						}}
						type="text"
						placeholder="Enter your real name for credit..."
					/>
				</div>
				<section id="reading_section" style={{margin: '0'}}>
					<article id="text" 
					style={{
						// background: '#fbfbfb', 
						color: '#002735', 
						borderRadius: '4px', 
						border: isMobile ? '' : '1px solid #DAE0E7', 
						padding: '1em', 
						fontSize: '15px',
						lineHeight: '1.5em'
					}}>
						<b style={{color: '#3C4858'}}>Instructions:</b><br/> 
						Read this page then move on to the questions. Make sure you read, you won't be able to come back to this.
						<br/><br/>
						<b style={{color: '#3C4858'}}>Reading:</b><br/>
						{reading}
					</article>
				</section>
			</div>
		);
	}
}
