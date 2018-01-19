import React from 'react';
import ReactDOM from 'react-dom';
import s from './styles/App.css';

window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload() 
    }
};

const _remote = '/remote.jpg.ashx?', 
	h1 = '340', 
	h2 = '549',
	_size = 'width=450&height=', 
	_scaleAndMode = '&scale=both&mode=crop';

// Fix for IE10 & Win 8.0 Media Query Bug.
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement('style');
	msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
	document.querySelector('head').appendChild(msViewportStyle);
}

/**
 * Processes the provided image url to determine whether it's a remote image, or a user uploaded image.
 * 
 * @param {String} url 
 * @param {Number} cardFormat 
 * @returns 
 */
function processImageURL(url, cardFormat) {
	if (!url || typeof url !== 'string') {
		return '';
	}

	return url + (url.startsWith(_remote) ? '&' : '?') + _size + (cardFormat === 1 ? h1 : cardFormat === 2 ? h2 : '') + _scaleAndMode;
}

/**
 * Renders the App and handles KILTR specific data transformations
 */
class Wrapper extends React.Component {

	constructor(props) {
		super(props);
		this.disableScroll();

		// get cards as an array
		let isCollectivWorks = false;
		if (document.getElementById('env') !== null) {
			isCollectivWorks = true;
		}
		const cards = this.mapCards(JSON.parse(document.getElementById('cards').text).cards, campaign, isCollectivWorks);

		// Initial State
		this.state = {
			clientredirectrurl: campaign.ClientRedirectUrl,	// aka link to post/wifi profile
			grantURL: campaign.GrantUrl,	// generated by the wifi controller unit (Coming Soon)
			campaign: campaign,
			cards: cards,
			connectionurl: `/wifi/connect?grantUrl=${campaign.ClientRedirectUrl}`,
			//connectionurl: `/wifi/connect?grantUrl=${escape(campaign.GrantUrl)}`, -- bugged
			termsModalIsOpen: false,
			TermsAndConditionsContainer: null,
			CardDeck: null,
			cssBundlePrefix: props.cssBundlePrefix || '/static/',
			jsModulePrefix: props.jsModulePrefix,
			isCollectivWorks: isCollectivWorks, 
			termsURL: campaign.termsURL || 'https://www.kiltr.com/wifiterms'
		}
		this.preventDocumentScrollOniOS = this.preventDocumentScrollOniOS.bind(this);

		document.addEventListener('touchmove', this.preventDocumentScrollOniOS);

		this.toggleTermsModal = this.toggleTermsModal.bind(this);
	}

	preventDocumentScrollOniOS(e) {
		if (this.state.termsModalIsOpen !== true) {
			e.preventDefault();
		}
	}

	/**
	 * Disable the browser's default scroll events in order to prevent the window from triggering
	 * the elastic overscroll effect in environments like iOS captive portal. 
	 */
	disableScroll() {
		if (window.addEventListener) // older FF
			window.addEventListener('DOMMouseScroll', this.preventDefault, false);
		window.onwheel = this.preventDefault; // modern standard
		window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
	}

	getParameterByName(name, url) {
		if (!url) {
			url = window.location.href;
		}
		name = name.replace(/[\[\]]/g, "\\$&");	// eslint-disable-line no-useless-escape
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	/**
	 * When the App successfully renders, log a Page View to Google Analytics
	 */
	componentDidMount() {
		import(/* webpackChunkName: 'TermsAndConditionsContainer' */ `./components/TermsAndConditionsContainer/index.js`).then(module => this.setState({TermsAndConditionsContainer: module.TermsAndConditionsContainer})).catch(reason => console.log(reason));
		import(/* webpackChunkName: 'CardDeck' */ `./components/CardDeck/index.js`)
			.then(module => this.setState({CardDeck: module.CardDeck}))
			.catch(reason => console.log(reason));
		window.addEventListener('keyup', this.handleKeyPress);
	}

	/**
	 * Transfroms an Array of post data into a card Object, for consumption by the Card Deck & Card components
	 * @param  {Array} cardArray			Array of Objects with Post data and content 
	 * @param  {Object} campaign     		Campaign Object to retrive the appropriate grant url from
	 * @param  {String} antiForgeryToken	(Optional ) Token to pass to the server when submitting form data
	 * @return {Array} cardArray            A new array of Card Objects, which can then be rendered as components
	 */
	mapCards(cardArray, campaign, env/*, antiForgeryToken*/) {

		// reverse the order of the array
		cardArray.reverse();
		
		// Map each object in the array into a Sponsored Post object
		cardArray = cardArray.map((object, index) => {

			switch(object.Type) {
				case 'CallToActionCard': {
					const obj = {
						type: 'CallToActionBase',
						content: {
							title: {
								text: object.Title,
								colour: object.TitleColour
							},
							images: [object.CtaBackgroundImagePath],
							button: {
								urls: {
									amazon: object.AmazonUrl,
									android: object.AndroidUrl,
									ios: object.IosUrl,
									web: object.WebUrl,
									windows: object.WindowsUrl
								},
								style: object.ButtonStyle,
								colour: object.ButtonColour,
								linkType: object.ButtonLinkType,
								text: object.ButtonText
							}
						} 
					}; 
					console.dir(obj);
					return obj;
				}
				default: {
					if (object.Title === null && (object.Caption === "" || object.Caption === null)) {
						return {
							type: 'ImagePost',
							content: {
								id: object.Id,
								position: index + 1,
								image: processImageURL(object.AttachmentImageUrl, 2),
								url: `/wifi/connect?grantUrl=${escape(object.GrantUrl)}`,
								color: '#fff',
							}
						};
					} else {
						// returns a new object in place
						return {
							type: 'SinglePost',
							content: { 
								id: object.Id || 0,
								position: index + 1,
								user: {
									name: object.PostedByDisplayName,
									image: (object.PostedByProfileImage || ''),
									profileLink: object.PostedBySlug,
								},
								image: processImageURL(object.AttachmentImageUrl, 1),
								title: (object.Title || ''), 
								content: object.Caption,
								url: `/wifi/connect?grantUrl=${escape(object.GrantUrl)}`,
								color: '#fff',
							}
						};
					}
				}
			}
		});
		cardArray.push({
			type: 'BrandedSplash',
			content: {
				logo: {
					url: campaign.DefaultCardLogo || '',
					size: [56, 56],
					type: 'kiltr'
				},
				isCollectivWorks: env,
				textColor: campaign.TextColour || 'Light',
				position: 0,
				customBackground: campaign.DefaultCardBackgroundImage,
				image: campaign.ThemeBackgroundUrl,
				intro: (campaign.AlternateDisplayText && campaign.AlternateDisplayText.length > 0) ? campaign.AlternateDisplayText :`Welcome to ${campaign.ThemeDisplayName}`, // else You are now connecting <br/>to CityVerve WiFi
				action: 'Swipe to Connect™',
				color: '#fff',
				clearColor: '#2c2c2c',
				onTermsClick: this.toggleTermsModal
			}
		});

		return cardArray;
	}

	/**
	 * Retrieve a query parameter from a url string provided.
	 * Falls back to using the current window url if no url is provided.
	 * @param  String name Name of the query parameter value to fetch
	 * @param  String url  URL string to be parsed. 
	 * @return String      Value of the query parameter
	 */
	getQueryParameterByName(name, url) {
		if (!url) {
			url = window.location.href;
		}
		name = name.replace(/[\[\]]/g, '\\$&');	// eslint-disable-line no-useless-escape
		const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) {
			return null;
		}
		if (!results[2]) {
			return '';
		}
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}
	
	/**
	 * Toggle whether the Terms and Conditions modal should be shown
	 * or hidden
	 * 
	 * @memberOf Wrapper
	 */
	toggleTermsModal() {
		this.setState({
			termsModalIsOpen: !this.state.termsModalIsOpen
		});
	}

	/**
	 * [render description]
	 * @return {[type]} [description]
	 */
	render() {
		let { 
			TermsAndConditionsContainer, 
			cards, 
			campaign, 
			CardDeck, 
			jsModulePrefix, 
			cssBundlePrefix, 
			grantURL, 
			termsURL 
		} = this.state;
		
		return (
			<div onTouchMove={e => { e.preventDefault()}}>
				{CardDeck !== null && 
					<CardDeck
						jsModulePrefix={jsModulePrefix}
						cssBundlePrefix={cssBundlePrefix}
						cards={cards}
						profile= {campaign.TargetUserId}
						clientMac= {campaign.ClientMac}
						grantUrl={campaign.GrantUrl}
						queryString={campaign.QueryString}
						clientRedirect={campaign.ClientRedirectUrl}
					/>
				}
				<div className={s.footerLink}>
					{(TermsAndConditionsContainer !== null) &&
						<button 
							className={s.link} 
							onClick={this.toggleTermsModal}
							href={`/wifi/connecttowifiandredirect?url=${termsURL}&granturl=${grantURL}`}
						>
							{'Terms and Conditions'}
							<TermsAndConditionsContainer 
								jsModulePrefix={jsModulePrefix}	
								isOpen={this.state.termsModalIsOpen} 
								onClickHandler={this.toggleTermsModal} 
							/>
						</button>
					}
				</div>
			</div>
		);
	}
}

const campaignObject = JSON.parse(document.getElementById('data').text),
	campaign = campaignObject.data,
	cssBundlePrefix = campaignObject.data.cssBundlePrefix || '',
	jsModulePrefix = campaignObject.data.jsModulePrefix || '';

export { Wrapper };

const render = Component => {
	ReactDOM.render(
		<Wrapper 
			campaignObject={JSON.parse(document.getElementById('data').text)}
			cssBundlePrefix={cssBundlePrefix}
			jsModulePrefix={jsModulePrefix} 
			gaTrackingID={campaign.hasOwnProperty('gaProperty') === true ? campaign.gaProperty : 'UA-4114951-10'} 
			options={{debug: false}}
		/>, 
	document.getElementById('root'));
}
render(Wrapper);