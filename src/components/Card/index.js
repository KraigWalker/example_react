import React, { Component } from 'react';
import s from './styles.css';
import Motion from '../../../node_modules/react-motion/lib/Motion.js';
import spring from '../../../node_modules/react-motion/lib/spring.js';

class Card extends Component {

	constructor (props) {
		super(props);

		this.state = {
			CardView: null,
			startPos: [0, 0],
			startX: 0,
			position: props.position,
			id: props.id,
			startY: 0,
			deltaX: 0,
			deltaY: 0,
			isPressed: false,
			style: {x: 0, y: 0, r: 0, scale: 1}
		}
		this.setRef = this.setRef.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onTouchStart = this.onTouchStart.bind(this);
		this.onTouchMove = this.onTouchMove.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
		this.update = this.update.bind(this);
	}

	requestPaint = false;

	/**
	 * On mount, import the card view component
	 * @todo Move this work one level up (into CardDeck) to 
	 * prevent Cards importing the same view over the network.
	 */
	componentDidMount() {
		/**
		 * @todo detect support for passive event listeners
		 */
		this.element.addEventListener('mousedown', this.onMouseDown, {passive: false});
		this.element.addEventListener('mousemove', this.onMouseMove, {passive: false});
		this.element.addEventListener('mouseup', this.onMouseUp, {passive: true});
		this.element.addEventListener('mouseleave', this.onMouseUp, {passive: false});
		this.element.addEventListener('touchstart', this.onTouchStart, {passive: false});
		this.element.addEventListener('touchmove', this.onTouchMove, {passive: false});
		this.element.addEventListener('touchcancel', this.onTouchEnd, {passive: false});
		this.element.addEventListener('touchend', this.onTouchEnd, {passive: false});

		import(/* webpackChunkName: './cards/[request]' */`../${this.props.type}Card/index.js`)
			.then(module => {
				this.setState({ CardView: module.default });
			})
			.catch(error => { console.error(error)});
	}

	componentWillUnmount() {
		this.element.removeEventListener('mousedown', this.onMouseDown, {passive: true});
		this.element.removeEventListener('mousemove', this.onMouseMove, {passive: true});
		this.element.removeEventListener('mouseup', this.onMouseUp, {passive: true});
		this.element.removeEventListener('mouseleave', this.onMouseUp, {passive: true});
		this.element.removeEventListener('touchstart', this.onTouchStart, {passive: true});
		this.element.removeEventListener('touchmove', this.onTouchMove, {passive: true});
		this.element.removeEventListener('touchcancel', this.onTouchEnd, {passive: false});
		this.element.removeEventListener('touchend', this.onTouchEnd, {passive: false});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.position !== this.state.position) {
			switch(nextProps.position) {
				case 'left': {
					this.setState(() => ({
						style: this.leaveLeftStyle
					}));
					break;
				}
				case 'right': {
					this.setState(() => ({
						style: this.leaveRightStyle
					}));
					break;
				}
				case 'center': 
				default: {
					this.setState(() => ({
						style: this.restStyle
					}));
					break;
				}
			}

			this.setState(() => ({
				position: nextProps.position
			}))
		}
	}

	/**
	 * [handleTouchStart description]
	 * @param  {[type]} options.touches [description]
	 * @return {[type]}                 [description]
	 */
	onTouchStart(e) {
		e.preventDefault();
		this.onMouseDown(e.touches[0]);
	}

	/**
	 * [handleTouchEnd description]
	 * @param  {[type]} options.touches [description]
	 * @return {[type]}                 [description]
	 */
	onTouchEnd(e) {
		e.preventDefault();
		this.onMouseUp(e);
	}

	/**
	 * Set the state of card being touched to isPressed
	 * and set the initial animation delta variables at the location of the press
	 * @param  {[type]} id Id of the card being interacted with
	 * @param  {[type]} e  [description]
	 * @return {[type]}    [description]
	 */
	onMouseDown(e) {
		// Ignore right clicks from the user.
		if (e.button && e.button === 2) {
			return;
		}

		//e.persist();
	
		/**
		 * - Set the initial start position (an x,y pair)
		 * - Reset the delta to 0 since this is a new interaction,
		 * - Set/Update the id (key) of the card being interacted with.
		 */
		this.setState({
			startX: e.pageX, 
			startY:	e.pageY,
			deltaX: 0,
			deltaY: 0,
			style: this.dragStyle,
			isPressed: true
		});
		return;
	}

	/**
	 * [handleTouchMove description]
	 * @param  {[type]} options.touches [description]
	 * @return {[type]}                 [description]
	 */
	onTouchMove(e) {
		e.preventDefault();
		if (this.requestPaint === false && this.state.isPressed === true) {
			this.onMouseMove(e.touches[0]);
		}
	}

	/**
	 * Determine whether the user has moved beyond the threshold.
	 * @param  {Object} e [description]
	 * @return {[type]}   [description]
	 */
	onMouseMove({pageX, pageY}) {
		if (this.state.isPressed === true && this.requestPaint === false) {
			this.setState({
				isPressed: true,
				deltaX:  pageX - this.state.startX,
				deltaY: pageY - this.state.startY,
				style:{ x: pageX - this.state.startX, y: pageY - this.state.startY, r: 0, scale: 1}
			}, function(){
				this.requestPaint = true; 
					requestAnimationFrame(this.update);
				});
		}
	}

	/**
	 * 
	 * 
	 * @memberof Card
	 */
	update() {
		this.requestPaint = false
	}

	restStyle = {
		x: spring(0, {stiffness: 120, damping: 17}),
		y: spring(0, {stiffness: 120, damping: 17}),
		r: 0,
		scale: 1
	}

	enterStyle = {
		x: spring(0, {stiffness: 50, damping: 17}),
		y: spring(0, {stiffness: 120, damping: 17}),
		r: 0,
		scale: 1
	}

	leaveRightStyle = {
		x: spring((window.innerWidth * 1), {stiffness: 50, damping: 17}),
		y: spring(0, {stiffness: 120, damping: 17}),
		r: 0,
		scale: 1
	}

	leaveLeftStyle = {
		x: spring((window.innerWidth * -1), {stiffness: 50, damping: 17}),
		y: spring(0, {stiffness: 120, damping: 17}),
		r: 0,
		scale: 1
	}

	/**
	 * [handleMouseUp description]
	 * @param  {Object} e [description]
	 */
	onMouseUp(e) {
		if (this.state.isPressed === false) {
			return;
		}

		const threshold = (window.innerWidth / 3);
		let style = this.restStyle,
			position = 'center';

		if (this.state.deltaX >= threshold) { // probably need a better number than just 300 out of the blue
			style = this.leaveRightStyle;
			position = 'right';
			this.props.onSwipe(this.state.id, position)
		} else if (this.state.deltaX <= -threshold) {
			style = this.leaveLeftStyle;
			position = 'left';
			this.props.onSwipe(this.state.id, position)
		}
		
		this.setState(() => ({ 
			position: position,
			isPressed: false, 
			style: style 
		}));
	}

	/**
	 * [getTransform description]
	 * @param  {[type]} x [description]
	 * @param  {[type]} y [description]
	 * @param  {[type]} r [description]
	 * @return {[type]}   [description]
	 */
	getTransform({x, y, r, scale}) {
		//rotate(${r}deg) 
		return {transform: `translate3d(${x}px, ${y}px, 0px)`, willChange: 'transform'};
	}

	getStyle() {
		return this.state.isPressed
		? { x: this.state.deltaX, y: this.state.deltaY, r: 0, scale: 1}
		: this.state.style
	}

	setRef(el) {
		this.element = el;
	}

	render() {
		const {cssBundlePrefix, jsModulePrefix, viewProps} = this.props;
		const { CardView } = this.state;
		return (
			<Motion 
				defaultStyle={{x: 0, y: 0, r: 0, scale: 1}}
				style={this.getStyle()}
			>
				{(interpolatedStyles) => 
					<article
						ref={this.setRef}
						className={s.card}
						style={this.getTransform(interpolatedStyles)}
					>
						{!CardView ? null : 
							<CardView 
								{...viewProps} 
								cssBundlePrefix={cssBundlePrefix} 
								jsModulePrefix={jsModulePrefix}
							/>
						}
					</article>
				}
			</Motion>
		);
	}
}

export { Card };
