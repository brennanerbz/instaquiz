import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import { Modal } from 'react-bootstrap';

import * as overlayActions from '../../redux/modules/overlays';
import { startQuiz } from '../../redux/modules/quiz';
import PhoneModal from './PhoneModal';
import Success from './SuccessModal';

@connect(
  state => ({
  	open: state.overlays.modalOpen,
  	type: state.overlays.modalType
  }),
  dispatch => ({
    ...bindActionCreators({
      ...overlayActions,
      startQuiz,
      pushState
    }, dispatch)
  })
)
export default class DefaultModal extends Component {
	static propTypes = {
	}

	close() {
		const { closeModal } = this.props;
		closeModal()
	}

	render() {
		const style = require('./Modals.scss');
		const { open, type, isMobile, startQuiz } = this.props;
		return (
			<Modal
			bsClass={(isMobile ? 'mobile' : 'desktop') + ' ' + 'modal'}
			dialogClassName={(isMobile ? 'mobile' : '') + ' ' + 'modal-dialog'}
			show={open}
			onHide={::this.close}>
				<Modal.Body>
					{
						type == 'phone'
						&&
						<PhoneModal
							isMobile={isMobile}
							close={::this.close}
							startQuiz={startQuiz}
						/>
					}
					{
						type == 'quiz_success'
						&&
						<Success/>
					}
					{
						type == 'contact'
						&&
						<div>
							<h1 style={{fontWeight: '600', fontSize: isMobile ? '24px' : '32px', color: '#2C3239', margin: '0.5em 0 1em 0!important'}}>
							Contact us
							</h1>
							<p style={{fontWeight: '400', fontSize: isMobile ? '15px' : '20px', color: '#A8B6C1'}}>Email</p>
							<h2 style={{fontWeight: '500', fontSize: isMobile ? '19px' : '25px', color: '#2C3239', margin: '0 0 0.5em 0!important' }}><a className="link" href="mailto:team@quizly.com">team@quizly.com</a></h2>
							<p style={{fontWeight: '400', fontSize: isMobile ? '15px' : '20px', color: '#A8B6C1', marginTop: '1.5em'}}>Twitter</p>
							<h2 style={{fontWeight: '500', fontSize: isMobile ? '19px' : '25px', color: '#2C3239', margin: '0 0 0.5em 0!important' }}>@quizlyapp</h2>
						</div>
					}
				</Modal.Body>
				{
					type == 'quiz_success'
					&&
					<Modal.Footer style={{borderTop: '1px solid #DAE0E7'}}>
						<div className="display_flex flex_center">
							<h3 style={{fontSize: isMobile ? '14px' : '17px', color: '#1AD877'}}>Check your phone!</h3>
						</div>
					</Modal.Footer>
				}
			</Modal>
		);
	}
}
