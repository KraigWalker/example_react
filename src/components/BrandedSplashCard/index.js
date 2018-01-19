import React from 'react';
import { ImageWithErrorHandler } from '../ImageWithErrorHandler/';
import s from './styles.css';

const getCdnFolder = () => '/Images/BrandedSplash/';

/**
 * Introductory Card that's displayed at the top of a Deck
 * 
 */
class BrandedSplash extends React.Component { 

	constructor() {
		super();
		this.chooseDefaultLogo = this.chooseDefaultLogo.bind(this);
		this.state = {
			logo: null
		}
	}

	shouldComponentUpdate() {
		return false;
	}

	chooseDefaultLogo() {
		if(this.props.isCollectivWorks === true) {
			import('./cwLogo.js')
				.then(module => this.setState({logo: module.Logo}))
				.catch(error => console.log(error));
		} else {
			import('./cityverveLogo.js')
				.then(module => this.setState({logo: module.Logo}))
				.catch(error => console.log(error));
		}
	}

	render() { 
		const props = this.props;
		const Logo = this.state.Logo;
		return(
			<div className={s.brandedSplash} style={{'background': (props.clearColor ? props.clearColor : '#000')}}>
				<div className={s.container}>
					<div className={s.content}>
						<p className={`${s.action} ${props.textColor === "Dark" ? s.dark : ''}`}>{props.action}</p>
						<div className={s.hero}>
							{(props.logo.url && props.logo.url.length !== 0) ? <img className={`${s.logo} ${s.custom}`} src={props.logo.url} alt="" /> 
							: <Logo />}
							<h1 className={`${s.intro} ${props.textColor === "Dark" ? s.dark : ''}`}>{props.intro}</h1>
							<p className={s.vanity}>{ 'Powered by CollectivWorks®' }</p>
						</div>
						<p className={`${s.termsTitle} ${props.textColor === "Dark" ? s.dark : ''}`}>{ 'By swiping you agree to our' }
							<br />
							<button className={`${s.button} ${props.textColor === "Dark" ? s.dark : ''}`}
								onClick={props.onTermsClick}>{ 'Terms & Conditions' }</button>
						</p>
					</div>
					<ImageWithErrorHandler 
						className={s.background}
						src={getBackgroundSrc(props.customBackground)}
						srcSet={getBackgroundSrcSet(props.customBackground)}
						alt={props.backgroundAlt}
						style={{'backgroundColor': (props.clearColor ? props.clearColor : '#000')}}
						sizes="(min-width: 48em) 450px, 300px"
					/>
				</div>
			</div>
		);
	}
}

/**
 * 
 * 
 * 
 * @param {string} backgroundPath Path to the background image to display at 1x resolution
 * @returns 
 */
function getBackgroundSrc(backgroundPath) {
	try {
		if (backgroundPath.length !== 0) {
			return `${backgroundPath}?w=450&h=549&mode=crop`;
		}
	} catch(e) {
		new Error(e);
	}
	return `${getCdnFolder()}Splash@1x.jpg`;
}

function getBackgroundSrcSet(backgroundPath) {
	if (backgroundPath.length !== 0) { 
		return `${backgroundPath}?w=450&h=549&mode=crop 1x, ${backgroundPath}?w=900&h=1098&mode=crop 2x,`;
	}
	return `${getCdnFolder()}Splash@1x.jpg 1x, ${getCdnFolder()}Splash@2x.jpg 2x, ${getCdnFolder()}Splash@3x.jpg 3x`;
}

export default BrandedSplash;
