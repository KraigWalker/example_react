import React, {Component} from 'react';
import s from './styles.css';

/**
 * A Chunky, user friendly button used for key
 * yes/no style user decisions
 * 
 * @class SwitchButton
 * @extends {Component}
 */
class SwitchButton extends Component {

	render() {
		return(
			<figure role="link" className={s.switchButton}>
				<a className={`${s.button} ${this.props.className}`} href={this.props.href} aria-labelledby={this.props.id + 'Label'}>
					{this.props.src ?
					<img className={s.image} 
						src={this.props.src} 
						srcSet={this.props.srcSet} 
						width={this.props.width} 
						height={this.props.height} 
						alt={this.props.alt || ''} 
					/>
					: this.props.children}
				</a>
				<figcaption className={s.label} id={this.props.id + 'Label'}>{this.props.label}</figcaption>
			</figure>
		);
	}
}

export {SwitchButton};