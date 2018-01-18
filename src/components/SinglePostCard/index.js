import React from 'react';
import ProfileSnippet from '../ProfileSnippet/';
import { ImageWithErrorHandler } from '../ImageWithErrorHandler/';
import s from './styles.css';
//import analytics from '../analytics.js';
//import ga from 'react-ga';


/**
 * Decodes an HTML encoded string returned by the server
 * @param  {string} html String of html encoded text
 * @return {string}      Decoded native JavaScript
 */
function decodeHtml(html) {
	// create a dummy html textarea
	var txt = document.createElement("textarea");
	// populate the textarea with our string
	txt.innerHTML = html;
	// the textarea's value is returned as a JS String.
	return txt.value;
}

/**
 * Post that is sponsored by a paying member or brand
 * style={{'backgroundImage': `url(${props.image})`}}
 */
class SinglePost extends React.Component {

	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	shouldComponentUpdate() {
		return false;
	}

	handleClick(e) {
		e.preventDefault();
		e.stopPropagation();
		window.location.href = e.target.getAttribute('href');
	}

	render() {
		return (
			<div className={s.singlePost}>
				<div className={s.container}>
					<div className={s.imageCover}>
					{ (this.props.title !== '') &&
						<header className={s.titleContainer}>
							<div className={s.gradientOverlay}></div> 
							<h1 className={s.title}>{this.props.title}</h1>
						</header>
					}
						<ImageWithErrorHandler 
							className={s.imageHidden} 
							src={this.props.image} 
							alt={this.props.description}
						/>
					</div>
					<div className={s.innerContainer}>
						<ProfileSnippet {...this.props.user} 
							source="via KILTR"
						/>
						<div className={s.content}>
							<p>{decodeHtml(this.props.content)}</p>
						</div>
					</div>
					{ (this.props.url && <a className={s.button} onTouchEnd={this.handleClick} href={this.props.url}>Read More</a>) }
				</div>
			</div>
		);
	}
};

export default SinglePost;
