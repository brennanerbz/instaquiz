import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';

import * as overlayActions from '../../redux/modules/overlays';

@connect(
  state => ({
  }),
  dispatch => ({
    ...bindActionCreators({
      ...overlayActions,
      pushState
    }, dispatch)
  })
)
export default class Footer extends Component {
	static propTypes = {
	}

	render() {
		return (
			<div style={{
				// position: 'absolute', 
				background: '#fff',
				bottom: '0', 
				width: '100%', 
				height: '54px', 
				lineHeight: '48px',
				padding: '0 10px',
				maxWidth: '1000px'
			}}
			className="display_flex flex_container_center">
				<div style={{width: '100%'}} className="flex_horizontal">
					<div 
						className="flex_container_left grey">
						<a style={{color: '#A8B6C1', fontWeight: '500', textDecoration: 'none'}}>&copy; Quizly 2016.</a>
					</div>
					<div 
						style={{marginLeft: 'auto'}} 
						className="flex_container_right grey">
						<a 
						onClick={() => this.props.openModal('contact')}
						style={{color: '#A8B6C1'}} 
						className="link">Contact us</a>
					</div> 
				</div>
			</div>
		);
	}
}
