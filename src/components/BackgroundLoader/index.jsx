import React, { Component } from 'react';

/**
 * Displays a placeholder image that is hosted locally while it waits for
 * a remote image to load. 
 * @example
 * <BackgroundImage img={source} placeholder={localImage} {... other attributes}>
 * 		{...child components}
 * </BackgroundImage>
 * 
 * @export
 * @class BackgroundLoader
 * @extends {React.Component}
 */
class BackgroundImage extends Component {

/**
 * Creates an instance of BackgroundLoader.
 * 
 * @param {any} props
 * 
 * @memberOf BackgroundLoader
 */
  constructor(props) {
	super(props);
	
	this.state = {
		loaded: false,
		error: false,
	};

	this.handleLoad = this.handleLoad.bind(this);
	this.handleError = this.handleError.bind(this);
  }

  /**
   * 
   * 
   * 
   * @memberOf BackgroundLoader
   */
  componentDidMount() {
	// Making this a global so it can be later
	// nullified when the component unmounts
	this.image = new Image();
	this.image.src = this.props.src;
	this.image.onload = this.handleLoad;
	this.image.onerror = this.handleError;
  }

	/**
	 * 
	 * 
	 * @param {any} nextState
	 * @param {any} nextProps
	 * @returns
	 * 
	 * @memberOf BackgroundLoader
	 */
	shouldComponentUpdate(nextState, nextProps) {
		return !this.state.loaded;
	}

  /**
   * 
   * 
   * 
   * @memberOf BackgroundLoader
   */
  componentWillUnmount() {
    this.image = null;
  }

  /**
   * 
   * 
   * @param {any} e
   * 
   * @memberOf BackgroundLoader
   */
  handleLoad(e) {
	this.setState({
		loaded: true,
	});
  }

  /**
   * 
   * 
   * @param {any} e
   * 
   * @memberOf BackgroundLoader
   */
  handleError(e) {
	console.error('Failed to load ', this.props.src);

	this.setState({
	  error: true,
	});
  }

  /**
   * 
   * 
   * @returns
   * 
   * @memberOf BackgroundLoader
   */
  render() {
	const {src, placeholder, children, ...props} = this.props;
	const source = !this.state.loaded || this.state.error ? placeholder : src;

	return (
		<div style={{backgroundImage: `url(${source})`}} {...props}>
		{children}
		</div>
	);
  }
}

export { BackgroundImage };