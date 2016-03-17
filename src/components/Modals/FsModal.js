import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import * as overlayActions from '../../redux/modules/overlays';
import { logOut } from '../../redux/modules/user'

@connect(
  state => ({
  	open: state.overlays.fsModalOpen,
  	type: state.overlays.fsModalType,
  }),
  dispatch => ({
    ...bindActionCreators({
      ...overlayActions,
      logOut,
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
				visibility: open ? 'visible' : 'hidden',
				zIndex: '100'
			},
			list: {
				margin: '20px 0 0 0',
				textAlign: 'center'
			},
			link: {
				fontSize: '22px',
				color: '#fff',
				textAlign: 'center',
				padding: '25px 15px',
				display: 'block'
			}
		}
		const account = cookie.load('account', {path: '/'})
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
					{!account && <li
					onClick={() => {
						this.props.closeFsModal()
						this.props.openModal('login')
					}}>
						<a style={styles.link}>Log In</a>
					</li>}
					{!account && <li
					onClick={() => {
						this.props.closeFsModal()
						this.props.openModal('signup')
					}}>
						<a style={styles.link}>Sign Up</a>
					</li>}
					{account && <li
					onClick={() => {
						this.props.closeFsModal()
						this.props.logOut()
					}}>
						<a style={styles.link}>Log Out</a>
					</li>
					}
					<li
					onClick={() => {
						this.props.closeFsModal()
						this.props.openModal('create_assignment')
					}}>
						<a style={styles.link}>Create Assignment</a>
					</li>
				</ul>
			</div>
		);
	}
}
