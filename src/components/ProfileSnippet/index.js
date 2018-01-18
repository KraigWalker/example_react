import React from 'react';
import { ImageWithErrorHandler } from '../ImageWithErrorHandler/';
import s from './styles.css';

//?width=68&height=68&mode=crop&format=jpg&quality=100&404=/images/users/ORGANISATION_default.jpg`

class ProfileSnippet extends React.Component {

	shouldComponentUpdate(nextProps) {
		return (nextProps === this.props);
	}

	render() {
		return (
			<div className={s.profileSnippet}>
				<div className={s.container}>
					<div className={s.imageContainer}>
						<ImageWithErrorHandler className={s.image} src={`${this.props.image}`} alt={`Avatar of ${this.props.name}.`} />
					</div>
					<div className={s.userDetails}>
						<h1 className={s.displayName}>{this.props.name}</h1>
					</div>
				</div> 
			</div>
		);
	}
}

export default ProfileSnippet;
