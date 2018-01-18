import React from 'react';
import s from './styles.css';
import {OverlayMenu} from '../OverlayMenu'; 

class CallToActionBase extends React.Component {

	constructor(props) {
		super(props);
		this.getButtonLink = this.getButtonLink.bind(this);
		this.openPlatformSelectModal = this.openPlatformSelectModal.bind(this);
		this.state = {
			buttonLink: this.getButtonLink(),
			useModal: true,
			modalIsOpen: true, //false,
			imgWidth: '100%',
			imgHeight: '100%'
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.imgWidth !== nextState.imgWidth || this.state.imgHeight !== nextState.imgHeight ) {
			return true
		}
		if (this.state.modalIsOpen !== nextState.modalIsOpen) {
			return true;
		}
		return false;
	}

	detectUserAgent() {

		const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    	// Windows Phone must come first because its UA also contains "Android"
		if (/windows phone/i.test(userAgent)) {
    		return 1;
		}

		if (/android/i.test(userAgent)) {
			return 2;
		}
	
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			return 3;
		}

		if (/Silk-Accelerated|Kindle/.test(userAgent) && !window.MSStream) {
			return 4;
		}

		/**
		 * else, return "unknown"
		 * @todo set a campaign variable to write a window variable CW_DEV_APPLINK_PLATFORM_SPOOF
		 * to manually override the platform setting for testing.
		 */
		  return 0;

	}

	setButtonUrlProp(label) {
		if (this.props.hasOwnProperty(label)) {
			return this.props.button.urls[label] 
		} else { 
			return '';
		}
	}

	/**
	 * DetectUA should run first. If we get a value, then
	 * 
	 * @returns 
	 * @memberof CallToActionBase
	 */
	getButtonLink() {
		switch(this.props.linkType) {
			case 0: {
				switch(this.detectUserAgent()) {
					case 1: {
						return this.setButtonUrlProp('windows');
					}
					case 2: {
						return this.setButtonUrlProp('android'); 
					}
					case 3: {
						return this.setButtonUrlProp('ios');
					}
					case 4: {
						return this.setButtonUrlProp('amazon'); 
					}
					case 0:
					default: {
						//return this.props.urls['windows'];
						/**
						 * @todo display a modal asking the user to select from all platforms provided.
						 */
						return this.setButtonUrlProp('web');
					}
				}
			}
			case 1:
			default: {
				return this.props.button.urls.web;
			}
		}
	}

	buildSrcUrl() {
		if (this.props.images[0]) {

		} else {
			return '';
		}
	}

	openPlatformSelectModal() {
		this.setState({modalIsOpen: true});
	}

	render() {
		return (
			<div className={s.callToAction}>
				<div className={s.container}>
					<div className={s.inner}>
						<div className={s.titleContainer}>
							{this.props.title && <h1 className={`${s.title} ${this.props.title.colour === 0 ? s.dark : s.light }`}>{this.props.title.text}</h1>}
						</div>
						<div className={s.buttonContainer}>
							{this.props.button.linkType === 1 ? 
							<a 
								className={`${s.button} ${this.props.button.colour === 0 ? s.buttonDark : s.buttonLight}`} 
								href={this.state.buttonLink} 
								rel="nofollow noopener"
							>
								{this.props.button.text}
							</a> :
							<button 
								className={`${s.button} ${'-' + this.props.button.colour === 0 ? s.buttonDark : s.buttonLight}`} 
								onClick={this.openPlatformSelectModal}
							>{this.props.button.text}</button>
							}
						</div>
					</div>
					{this.props.images && this.props.images.length > 0 ?
					<figure className={s.imageContainer}>
						<img
							ref={(img) => {this.imgElement = img;}}
							width={this.state.imgWidth} height={this.state.imgHeight}
							className={s.image}
							src={this.props.images[0] ? `..${this.props.images[0]}?w=450&h=549&mode=crop&scale=both` : ''}
							srcSet={this.props.images[0] ? `..${this.props.images[0]}?w=450&h=549&mode=crop&scale=both 1x` : ''}
							alt={this.props.altText}
						/>
					</figure>: null}
				</div>
				<OverlayMenu modalIsOpen={this.state.modalIsOpen} />
			</div>
		);
	}
};

export default CallToActionBase;