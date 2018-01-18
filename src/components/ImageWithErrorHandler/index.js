import React, { Component } from 'react';

class ImageWithErrorHandler extends Component {

	constructor(props) {
		super(props);
		this.state = {
			errored: false
		};
		this.handleError = this.handleError.bind(this);
	}

	/**
	 * Catches Image loading errors and reports the error to Google Analytics.
	 * Since this is an Image Load Error, the result will usually include the offending URL.
	 * Will also set the component's state to errored.
	 * @return {[type]} [description]
	 */
	handleError(error) {
	}

	/**
	 * Render's an <img> element with an error handler. If the image has failed to load,
	 * the component will return null instead of returning a React DOM String
	 * @return {[type]} [description]
	 */
	render() {
		if (this.state.errored) {
			return null;
		} else {
			return (<img style={{pointerEvents: 'none'}} onError={this.handleError} {...this.props} alt={this.props.alt} />);
		}
	}

}

export { ImageWithErrorHandler };