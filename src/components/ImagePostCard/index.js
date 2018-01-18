import React, { Component } from 'react';
import { BackgroundImage } from '../BackgroundLoader/'
import s from './styles.css';
/**
 * An image only full size digital flyer card
 */
class ImagePost extends Component {

	shouldComponentUpdate() {
		return false;
	}

	/**
	 * [render description]
	 * @return {[type]} [description]
	 */
	render() {
		return(
			<div className={s.imagePost}>
				<div className={s.container}>
					<BackgroundImage className={s.imageCover} 
						src={this.props.image}
						placeholder=""
					>
					</BackgroundImage>
				</div>
			</div>
		);
	}
}

export default ImagePost;