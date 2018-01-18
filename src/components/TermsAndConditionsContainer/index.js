import React, { Component } from 'react';
import Modal from '../Modal/';
import TermsAndConditionsContent from '../TermsAndConditions/';
import s from './styles.css';

class TermsAndConditionsContainer extends Component {

	shouldComponentUpdate(nextProps) {
		return (this.props !== nextProps);
	}

	render() {
		return (
			<Modal 
				className={s.modal}
				isOpen={this.props.isOpen}
				contentLabel="Terms and Conditions Modal"
				overlayClassName={s.modalContainer}
				closeTimeoutMS={100}
				shouldCloseOnOverlayClick={false}
			>
				<TermsAndConditionsContent key={1} onClickHandler={this.props.onClickHandler} />
			</Modal>
		);
	}
}

export { TermsAndConditionsContainer };
