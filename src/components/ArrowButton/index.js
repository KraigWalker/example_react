import React from 'react';
import s from './styles.css';
class ArrowButton extends React.Component {
	
	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<button 
				aria-label={this.props.ariaLabel}
				className={s.navButton} 
				onClick={this.props.clickHandler} 
			>
				<div style={{
					transform: `rotate(${this.props.dir ==='left' ? '180deg': '0'})`, 
					WebkitTransform: `rotate(${this.props.dir ==='left' ? '180deg': '0'})`
				}}>
					<svg style={{display: 'block', verticalAlign: 'middle', margin: 'auto'}} aria-hidden="true" focusable="false" className={s.arrowIcon} x="0px" y="0px" width="25px"
						height="25px" viewBox="0 0 25 25" enableBackground="new 0 0 x y">
						<polygon fill="#8E8E93" points="7.639,0 4.861,2.777 14.584,12.5 4.861,22.222 7.639,25 20.139,12.5"/>
					</svg>
				</div>
			</button>
		);
	}
}

export { ArrowButton };