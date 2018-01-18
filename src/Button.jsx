import React, { Component } from 'react';

class Button extends Component {
	render() {
		return (
			<div className="button">
				<button className="submit-control" 
					type={this.props.type}
					onClick={this.props.onClick}>{this.props.text}</button>
			</div>	
		);
	}
}

export { Button };
