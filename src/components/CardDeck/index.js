import React, { Component } from 'react';
import { Card } from '../Card/';
import { Indicator } from '../Indicator/';
import { ArrowButton } from '../ArrowButton/';
import s from './styles.css'; 
//import analytics from './analytics.js';

class CardDeck extends Component {

	/**
	 * [constructor description]
	 * @param  {[type]} props [description]
	 * @return {[type]}       [description]
	 */
	constructor(props) {
		super(props);

		this.state = {
			modules: {
				Connect: null
			},
			currentCardIndex: props.cards.length - 1,
			cards: props.cards,
			cardPositions: props.cards.map(() => 'center'),
			cardsRemaining: props.cards.length,
			lockKeyPresses: false,
			gaTrackingID: props.gaTrackingId || null
		};
		this.onBackwardPress = this.onBackwardPress.bind(this);
		this.onForwardPress = this.onForwardPress.bind(this);
		this.handleCardSwipe = this.handleCardSwipe.bind(this);
		this.connectNavigation = this.connectNavigation.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.setLeftKeyState = this.setLeftKeyState.bind(this);
		this.setRightKeyState = this.setRightKeyState.bind(this);
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown);
		document.addEventListener('keyup', this.handleKeyUp);


		import(/* webpackChunkName: 'Connect' */`../LegacyConnect/index.js`)
		.then((module) => {
			this.setState({
				modules : {
					Connect: module.LegacyConnect
				}
			})
		}).catch(reason => {
			console.log(reason);
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props !== nextProps || this.state !== nextState) { 
			return true;
		}
		return false;
	}

	setLeftKeyState(value) {
		return {leftKeyPressed: value};
	}

	setRightKeyState(value) {
		return {rightKeyPressed: value};
	}

	handleKeyUp(e) {
		if (this.state.lockKeyPresses === false) {
			switch(e.keyCode) {
				case 37: {
					this.setState(this.setLeftKeyState(false));
					this.onBackwardPress();
					break;
				}
				case 39: {
					this.setState(this.setRightKeyState(false));
					this.onForwardPress();
					break;
				}
				default: {
					break;
				}
			}
		}
	}

	handleKeyDown(e) {
		if (this.state.lockKeyPresses === false) {
			switch(e.keyCode) {
				case 37: {
					e.preventDefault();
					this.setState(this.setLeftKeyState(true));
					break;
				}
				case 39: {
					e.preventDefault();
					this.setState(this.setRightKeyState(true));
					break;
				}
				default: {
					break;
				}
			}
		}
	}

	/**
	 * get the direction the card was swiped in
	 * @todo If we change the currentCardIndex, cardsRemaining should be calculated as a side effect in onComponentWillUpdate()
	 * @param {number} index
	 * @param {string} direction
	 */
	handleCardSwipe(index, direction) {

		let { cardPositions, currentCardIndex, cardsRemaining } = this.state;

		cardPositions[index] = direction;
		this.setState({
			cardPositions: cardPositions,
			currentCardIndex: currentCardIndex !== 0 ? currentCardIndex - 1 : 0,
			cardsRemaining: cardsRemaining - 1,
			lockKeyPresses: cardsRemaining -1 <= 0
		});
	}

	/**
	 * [onForwardPress description]
	 * @param  {Object} e          Synthetic Event object
	 */
	onForwardPress() {
		let { cardPositions, currentCardIndex, cardsRemaining } = this.state;

		//if (currentCardIndex !== initialSize) {

			cardPositions[currentCardIndex] = (Math.floor(Math.random() * 2) === 0) ? 'right' : 'left';
			/**
			 * increment the current card
			 * @todo Fire GA Event
			 * @todo: set the state of the card in question to have a delta + left/right value
			 * in order to animate
			 */
			//console.log(cardsRemaining);
			this.setState(() => ({
				currentCardIndex: currentCardIndex - 1,
				cardsRemaining: cardsRemaining - 1,	// calculate this in componentWillUpdate
				cardPositions: cardPositions,
				lockKeyPresses: cardsRemaining - 1 <= 0
			}));
		//}
	}

	/**
	 * Change the previous card in the Deck to become the Active Card.
	 * Set the current Active Card to be InActive but Visible.
	 * Log another impression on the newly active Card
	 */
	onBackwardPress() {
		let { cardPositions, currentCardIndex, cards, cardsRemaining } = this.state;
		if (currentCardIndex < cards.length - 1) {
			cardPositions[currentCardIndex + 1] = 'center';
			this.setState(() => ({
				currentCardIndex: currentCardIndex + 1,
				cardsRemaining: cardsRemaining + 1,
				cardPositions: cardPositions,
				lockKeyPresses: cardsRemaining + 1 <= 0
			}));
		}
	}

	/**
	 * Display the success Screen and redirect the user to the provided url (normally the grant URL) 
	 * @param  {[type]} url The url to navigate the user to
	 * @return ReactHtmlString     Connect Element
	 */
	connectNavigation() {
		window.location.href = this.props.grantUrl // 'https://4d1d9617.ngrok.io' + this.props.queryString + escape(this.props.clientRedirect);
	}

	/**
	 * [render description]
	 * @return {[type]} [description]
	 */
	render() {
		const { cards, cardsRemaining, cardPositions, modules } = this.state;
		const Connect = modules.Connect;

		if (cardsRemaining > 0) {
			return (
				<span>
					{modules.Indicator !== null && <Indicator length={cardsRemaining} />}
					<div className={s.cardDeck}>
			{/*<h2 style={{"color" : "red"}} >{this.props.grantUrl + this.props.queryString + escape(this.props.clientRedirect)}</h2>*/}
						{modules.Card !== null && cards.map((item, index) => 
							<Card 
								cssBundlePrefix={this.props.cssBundlePrefix}
								jsModulePrefix={this.props.jsModulePrefix}
								type={item.type} 
								viewProps={item.content} 
								key={index}
								onSwipe={this.handleCardSwipe} 
								position={cardPositions[index]}
								id={index} 
							/>
						)}
					</div>
					<div className={s.navButtonContainer}>
						{modules.ArrowButton !== null && 
							<ArrowButton 
								dir="left" 
								ariaLabel="previous" 
								psuedoPress={this.state.leftKeyPressed} 
								clickHandler={this.onBackwardPress}
							/>
						}
						{modules.ArrowButton !== null && <ArrowButton dir="right" ariaLabel="next" psuedoPress={this.state.rightKeyPressed} clickHandler={this.onForwardPress}/>}
					</div>
				</span>
			);
		} else {
			return (setTimeout(this.connectNavigation, 3000) && <Connect />);
		}
	}
}

export { CardDeck };