import React, { Component, PropTypes } from 'react';
import { Tooltip, Overlay } from 'react-bootstrap';


export default class HomeworkReading extends Component {
	static propTypes = {
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.invalid && nextProps.invalid) this.refs.name_input.focus()
	}

	tooltip() {
		const node = this.refs.name_input
		const rect = node ? node.getBoundingClientRect() : null
		if(rect) {
			const style = {
				top: rect.top > 0 ? rect.top + rect.height - 10 : 135,
				left: rect.left
			}
			return (
				<div style={style} className="tooltip bottom in">
					<div style={{left: '12%'}} className="tooltip-arrow">
					</div>
					<div style={{maxWidth: '350px'}} className="tooltip-inner">
						Oops! Add your name to continue!
					</div>
				</div>
			)
		}		
	}

	render() {
		const { isMobile } = this.props;
		const { reading } = this.props;
		const { invalid } = this.props;
		const { route_token } = this.props;
		return (
			<div id="reading" style={{fontSize: isMobile ? '16px' : '18px'}}>
				<div 
					className="display_flex flex_horizontal flex_nowrap" 
					style={{padding: isMobile ? '0' : '15px 15px 0 15px', borderBottom: isMobile ? '1px solid #DAE0E7' : ''}}>
					<label 
					style={{marginLeft: '1em', fontWeight: '500', color: '#3C4858', width: isMobile ? '15%' : '10%', lineHeight: '50px'}}>
						Name
					</label>
					<input
						ref="name_input"
						autoFocus={true}
						style={{
							border: 'none',
							width: '85%',
							lineHeight: '18px',
							fontSize: 'inherit'
						}}
						onChange={(e) => {
							this.props.updateName(e.target.value)
						}}
						type="text"
						placeholder="Enter your name or ID for credit..."
					/>
				</div>
				<div className={'fade' + ' ' + (invalid && 'in')}>
				{this.tooltip()}
				</div>
				<section id="reading_section" style={{margin: '1em'}}>
					<article id="text" 
					style={{
						color: '#002735', 
						borderRadius: '4px', 
						border: '1px solid #DAE0E7', 
						padding: '1em', 
						lineHeight: '1.5em'
					}}>
						<b style={{color: '#3C4858'}}>Instructions:</b><br/> 
						Read this page then move on to the questions. <i>Make sure you read</i>, you won't be able to come back to this.
					</article>
				</section>
				<section id="reading_section" style={{margin: '1em'}}>
					<article 
					oncopy="return false;"
					oncut="return false;"
					onpaste="return false;"
					unselectable="on"
					onselectstart="return false;" 
					onmousedown="return false;"
					id="text" 
					style={{
						color: '#002735', 
						borderRadius: '4px', 
						border: '1px solid #DAE0E7', 
						padding: '1em', 
						lineHeight: '1.5',
						whiteSpace: 'pre-wrap!important',
						MozUserSelect: 'none',
						WebkitUserSelect: 'none',
						msUserSelect: 'none',
						userSelect: 'none',
						OUserSelect: 'none'
					}}>
					<b style={{color: '#3C4858'}}>Reading:</b><br/>
					{reading}
					</article>
				</section>
				{!isMobile &&
					<button 
					style={{
						marginLeft: '1em',
						marginBottom: '2em',
						fontSize: '16px',
						fontWeight: '600'
					}}
					onClick={() => {
						if(this.refs.name_input.value.length === 0) {
							document.body.scrollTop = 0
							this.props.nameError()
						}
						else this.props.pushState(null, `/homework/${route_token}/questions`)
					}}
					className="button primary_blue">
						Continue to questions
					</button>}
			</div>
		);
	}
}
