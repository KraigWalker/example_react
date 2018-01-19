import React, {Component} from 'react';
import Modal from '../Modal/';
import {SwitchButton} from '../SwitchButton';
import s from './styles.css';
class OverlayMenu extends Component {

	constructor() {
		super();
		this.renderOptionList = this.renderOptionList.bind(this);
	}

	renderOptionList() {
		const listItems = this.props.options.map((item, index) => {
			return (
				<SwitchButton 
					key={index}
					className={s.switchButton}
					src={item.src}
					id={item.id}
					label={item.title}
					width={this.props.buttonInnerSizing}
					href={item.href || ''}
				>{item.useChildren === true && item.children}
				</SwitchButton>
			);
		});
		return listItems;
	}

	render() {
		return (
			<Modal 
				isOpen={this.props.modalIsOpen}
				contentLabel={"Select a Platform"}
				portalClassName={s.platformSelectFrame}
				className={{base: s.modal}}
				overlayClassName={{base: s.overlay}}
			>
				<header className={s.header}>
					<div className={s.buttonContainer}>
						<button 
							aria-label="Close" 
							className={s.closeButton} 
							onClick={this.props.onClickHandler} 
							onTouchEnd={this.props.onClickHandler}
						>
							<span role="presentation">&#215;</span>
						</button>
					</div>
					<div className={s.titleContainer}>
						<h1 className={s.title}>{this.props.title}</h1>
					</div>
				</header>
				<div className={s.contentWrapper}>{/* wrap content in container that takes the remaining viewport space */}
					<div className={s.content}>	{/* gives content vertical scrollable length */}
						<div className={s.switchButtonContainer}>
							{this.renderOptionList()}
						</div>
						{/* By Google's request, we need to include this text if we use a Google Play badge*/}
						{this.props.requireLegalFooter === true &&
						<footer className={s.footer}>
							<small className={s.platformSelectLegal} id="platformSelectLegal">
								{'Google Play and the Google Play logo are trademarks of Google LLC.'}
							</small>
						</footer>}	
					</div>
				</div>
			</Modal>
		);
	}
}

export {OverlayMenu};