import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import { Modal } from 'react-bootstrap';

import * as overlayActions from '../../redux/modules/overlays';
import { startQuiz } from '../../redux/modules/quiz';
import PhoneModal from './PhoneModal';
import Success from './SuccessModal';
import Processing from './ProcessingModal';
import CreateAssignment from './CreateAssignment';


@connect(
  state => ({
  	path: state.router.location.pathname,
  	open: state.overlays.modalOpen,
  	type: state.overlays.modalType,
  	title: state.quiz.title,
  	loaded: state.quiz.loaded,
  	error: state.quiz.error
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

	state = {
		copied: false
	}

	close() {
		const { closeModal } = this.props;
		this.setState({
			copied: false
		});
		closeModal()
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.open && nextProps.open) {
			if(nextProps.isMobile) {
				$('.modal-backdrop').addClass('mobile')
			}
		}
	}

	render() {
		const style = require('./Modals.scss');
		const { open, type, isMobile, startQuiz, loaded, title, error } = this.props;
		let bodyPadding;
		if(type == 'processing') bodyPadding = '2em 0 2.75em 0'
		if(type == 'create_assignment') bodyPadding = '0'
		const { copied } = this.state;
		return (
			<Modal
			bsClass={(isMobile ? 'mobile' : 'desktop') + ' ' + 'modal'}
			dialogClassName={
				(type == 'processing' ? 'processing' : '') 
				+ ' ' + (isMobile ? 'mobile' : '') 
				+ ' ' + (type == 'create_assignment' && !isMobile ? 'create' : '')
				+ ' ' + 'modal-dialog'}
			show={open}
			onHide={::this.close}>
				{
					copied
					&&
					<div
					className="display_flex flex_center" 
					style={{
						width: '100%', 
						padding: '0.75em 1em', 
						background: '#1FB6FF',
						color: '#fff',
						borderTopLeftRadius: !isMobile ? '4px' : '',
						borderTopRightRadius: !isMobile ? '4px' : ''
					}}>
						Copied!
					</div>
				}
				<Modal.Body 
				style={{
					padding: bodyPadding,
					background: type == 'create_assignment' && isMobile ? '#F9FAFC' : ''
				}}>
					{
						type == 'create_assignment'
						&&
						<CreateAssignment
							isMobile={isMobile}
							close={::this.close}
						/>
					}
					{
						type == 'phone'
						&&
						<PhoneModal
							isMobile={isMobile}
							close={::this.close}
							startQuiz={startQuiz}
							path={this.props.path}
							copy={() => this.setState({copied: true})}
						/>
					}
					{
						type == 'quiz_success'
						&&
						<Success/>
					}
					{
						type == 'processing'
						&&
						<Processing
						close={::this.close}
						title={title}
						loaded={loaded}
						error={error}
						/>
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
