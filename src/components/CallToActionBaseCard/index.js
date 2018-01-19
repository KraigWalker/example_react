import React from 'react';
import s from './styles.css';
import {OverlayMenu} from '../OverlayMenu';
import {AmazonBadge} from '../AmazonBadge/';
import appStoreBadge from '../OverlayMenu/img/appstore.svg';
import googlePlayBadge from '../OverlayMenu/img/GooglePlay.svg';
import msftBadge from '../OverlayMenu/img/English_get it from MS_864X312.svg';

class CallToActionBase extends React.Component {

	constructor(props) {
		super(props);
		this.getButtonLink = this.getButtonLink.bind(this);
		this.setButtonUrlProp = this.setButtonUrlProp.bind(this);
		this.openPlatformSelectModal = this.openPlatformSelectModal.bind(this);
		this.buildOverlayMenuOptions = this.buildOverlayMenuOptions.bind(this);
		this.closePlatformSelectModal = this.closePlatformSelectModal.bind(this);
		this.state = {
			buttonLink: this.getButtonLink(),
			useModal: true,
			modalIsOpen: false
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
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
		if (this.props.button.urls.hasOwnProperty(label)) {
			console.log('fetching url for ' + label);
			console.log('url: ' + this.props.button.urls[label]);
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
		console.log(this.props.button.linkType);
		switch(this.props.button.linkType) {
			case 0: {
				switch(this.detectUserAgent()) {
					case 1: {
						return this.setButtonUrlProp('windows');
					}
					case 2: {
						return this.setButtonUrlProp('android');
					}
					case 3: {
						console.log('lucky no. 3');
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
						return false; //this.setButtonUrlProp('web');
					}
				}
			}
			case 1:
			default: {
				return this.props.button.urls.web;
			}
		}
	}

	buildOverlayMenuOptions() {
		const types = ['amazon', 'android', 'ios', 'windows'];
		const urls = this.props.button.urls;
		const availableTypes = types.filter(type => urls[type] !== null 
			&& urls[type].length !== 0);

		return availableTypes.map(item => {
			switch(item) {
				case 'amazon': {
					return {		
						title: "Amazon Appstore",
						id: "AmazonBtn",
						href: this.props.button.urls['amazon'],
						useChildren: true,
						children: <AmazonBadge />
					};
				}
				case 'android': {
					return {
						title: "Google Play",
						id: "AndroidBtn",
						src: googlePlayBadge,
						href: this.props.button.urls['android'],
					};
				}
				case 'ios': {
					return {
						title: "iOS",
						id: "iOSBtn",
						src: appStoreBadge,
						href: this.props.button.urls['ios'],
					};
				}
				case 'windows': {
					return {
						title: "Microsoft Store",
						id: "WindowsBtn",
						src: msftBadge,
						href: this.props.button.urls['windows'],
					};
				}
				default: {
					return {};
				}
			}
		});
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

	closePlatformSelectModal() {
		this.setState({modalIsOpen: false});
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
							{this.props.button.linkType === 1 ? 	//web link
							<a 
								className={`${s.button} ${this.props.button.colour === 0 ? s.buttonDark : s.buttonLight}`} 
								href={this.state.buttonLink} 
								rel="nofollow noopener"
							>
								{this.props.button.text}
							</a> 		
							: (this.state.buttonLink !== false)
								? <a 
									className={`${s.button} ${this.props.button.colour === 0 ? s.buttonDark : s.buttonLight}`} 
									href={this.state.buttonLink} 
									rel="nofollow noopener"
								>
									{this.props.button.text}
								</a> 
								: <button 
									className={`${s.button} ${'-' + this.props.button.colour === 0 ? s.buttonDark : s.buttonLight}`} 
									onClick={this.openPlatformSelectModal} 
									onTouchEnd={this.openPlatformSelectModal}
								>{this.props.button.text}</button>}
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
				{this.props.linkType !== 1 && 
					<OverlayMenu 
						modalIsOpen={this.state.modalIsOpen} 
						onClickHandler={this.closePlatformSelectModal}
						buttonInnerSizing="180px"
						title="Select a Platform"
						requireLegalFooter={true}
						options={this.buildOverlayMenuOptions()} 
					/>
				}
			</div>
		);
	}
};

export default CallToActionBase;