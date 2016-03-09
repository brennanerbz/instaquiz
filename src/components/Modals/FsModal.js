import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import * as overlayActions from '../../redux/modules/overlays';

@connect(
  state => ({
  	open: state.overlays.fsModalOpen,
  	type: state.overlays.fsModalType,
  }),
  dispatch => ({
    ...bindActionCreators({
      ...overlayActions,
      pushState
    }, dispatch)
  })
)
export default class MenuModal extends Component {
	static propTypes = {
	}

	render() {
		const { isMobile } = this.props;
		const deleteIcon = require('../../../static/icons/deleteWhite.png');
		const { open, type } = this.props;
		const styles = {
			container: {
				height: '100%',
				width: '100%',
				background: '#1FB6FF',
				position: 'absolute',
				left: '0',
				top: '0',
				visibility: open ? 'visible' : 'hidden'
			},
			list: {
				margin: '20px 0 0 0',
				textAlign: 'center'
			},
			link: {
				fontSize: '20px',
				color: '#fff',
				textAlign: 'center',
				padding: '20px 15px',
				display: 'block'
			}
		}
		return (
			<div 
			style={styles.container} 
			className={'display_flex flex_center flex_vertical fade' + ' ' + (open ? 'in' : '')}>
				<img 
				onClick={() => {
					this.props.closeFsModal()
				}} 
				src={deleteIcon} 
				style={{
					height: isMobile ? '15px' : '16px',
					position: 'absolute',
					top: isMobile ? '1.25em' : '2em',
					right: '2em',
					cursor: 'pointer'
				}}/>
				<ul style={styles.list} className="link_list">
					<li>
						<a style={styles.link}>How It Works</a>
					</li>
					<li>
						<a style={styles.link}>Sign Up</a>
					</li>
					<li>
						<a style={styles.link}>Log In</a>
					</li>
				</ul>
			</div>
		);
	}
}
