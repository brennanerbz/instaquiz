import React, { Component, PropTypes } from 'react';
import { Tooltip, Overlay } from 'react-bootstrap';


export default class HomeworkReading extends Component {
	static propTypes = {
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.invalid && nextProps.invalid) this.refs.name_input.focus()
	}

	tooltip() {
		// add node getboundingrect
		return (
			<div style={{top: '95px', left: '65px'}} className="tooltip bottom in">
				<div style={{left: '12%'}} className="tooltip-arrow">
				</div>
				<div style={{maxWidth: '350px'}} className="tooltip-inner">
					Oops! Add your name to continue!
				</div>
			</div>
		)
	}

	render() {
		const { isMobile } = this.props;
		const { reading } = this.props;
		const { invalid } = this.props;
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
						ref="name_input"
						autoFocus={true}
						style={{
							border: 'none',
							width: '85%',
							lineHeight: '18px'
						}}
						onChange={(e) => {
							this.props.updateName(e.target.value)
						}}
						type="text"
						placeholder="Enter your real name for credit..."
					/>
				</div>
				<div className={'fade' + ' ' + (invalid && 'in')}>
				{this.tooltip()}
				</div>
				<section id="reading_section" style={{margin: '0'}}>
					<article id="text" 
					style={{
						color: '#002735', 
						borderRadius: '4px', 
						border: isMobile ? '' : '1px solid #DAE0E7', 
						padding: '1em', 
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
