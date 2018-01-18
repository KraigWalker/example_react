import React from 'react';
import s from './styles.css';

class Indicator extends React.Component {

	shouldComponentUpdate(nextProps) {
		return (this.props.length !== nextProps.length);
	}

	render() {
		return (
			<p className={s.progressIndicator}>
				{`Connecting to WiFi in ${this.props.length} Swipe${this.props.length !== 1 ? 's' : ''}`}
			</p>
		);
	}
}

export { Indicator };