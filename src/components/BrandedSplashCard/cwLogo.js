import React, {Component} from 'react';
import s from './styles.css';

class Logo extends Component {

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<svg className={s.logo} height={28} 
			viewBox="0 0 180 24.1">
				<title>CollectivWorks</title>
				<path d="M12.08,23.78l7.77-4.52a2.93,2.93,0,0,1,2.66,0l7.83,4.51a2.93,2.93,0,0,0,2.66,0l8.15-4.81a3,3,0,0,0,1.33-2.32V7.41a3,3,0,0,0-1.33-2.32L33,.32a2.9,2.9,0,0,0-2.66,0L22.63,4.88A2.93,2.93,0,0,1,20,4.9L12.14.39a2.93,2.93,0,0,0-2.66,0L1.33,5.21A3,3,0,0,0,0,7.54v9.2a3,3,0,0,0,1.33,2.32l8.09,4.72A3,3,0,0,0,12.08,23.78ZM23.24,5.31l6.73-4c.73-.43,1.33-.09,1.33.75V10c0,.85-.6,1.19-1.33.77L23.25,6.86A.82.82,0,0,1,23.24,5.31Zm-10.33,6,7-4a2.92,2.92,0,0,1,2.67,0l7,4a.82.82,0,0,1,0,1.55l-7,4a3,3,0,0,1-2.67,0l-7-4.05C12.17,12.42,12.17,11.73,12.91,11.3ZM11.18,22V14.17c0-.85.6-1.19,1.33-.77l6.72,3.89a.82.82,0,0,1,0,1.55l-6.73,4C11.77,23.23,11.18,22.89,11.18,22Z" style={{"fill":"#fff"}} />
				<path d="M48.75,12.07v0A4.43,4.43,0,0,1,53.3,7.54a4.48,4.48,0,0,1,3.44,1.34l-1.22,1.41a3.21,3.21,0,0,0-2.23-1A2.58,2.58,0,0,0,50.76,12v0a2.59,2.59,0,0,0,2.53,2.74,3.14,3.14,0,0,0,2.29-1L56.8,15a4.6,4.6,0,0,1-8-2.93Z" style={{"fill":"#fff"}} />
				<path d="M58.43,12.07v0a4.64,4.64,0,0,1,9.27,0v0a4.64,4.64,0,0,1-9.27,0Zm7.27,0v0a2.65,2.65,0,0,0-2.65-2.74A2.61,2.61,0,0,0,60.43,12v0a2.66,2.66,0,0,0,2.65,2.74A2.61,2.61,0,0,0,65.7,12.07Z" style={{"fill":"#fff"}} />
				<path d="M69.62,7.68h1.92v7h4.35v1.74H69.62Z" style={{"fill":"#fff"}} />
				<path d="M78.06,7.68H80v7h4.35v1.74H78.06Z" style={{"fill":"#fff"}} />
				<path d="M86.5,7.68h6.58V9.39H88.41v1.77h4.11v1.71H88.41V14.7h4.74v1.71H86.5Z" style={{"fill":"#fff"}} />
				<path d="M95.19,12.07v0a4.43,4.43,0,0,1,4.55-4.51,4.48,4.48,0,0,1,3.44,1.34L102,10.29a3.21,3.21,0,0,0-2.23-1A2.58,2.58,0,0,0,97.2,12v0a2.6,2.6,0,0,0,2.53,2.74,3.18,3.18,0,0,0,2.3-1L103.25,15a4.47,4.47,0,0,1-3.58,1.56A4.41,4.41,0,0,1,95.19,12.07Z" style={{"fill":"#fff"}} />
				<path d="M107.54,9.45h-2.66V7.68h7.23V9.45h-2.65v7h-1.92Z" style={{"fill":"#fff"}} />
				<path d="M114.4,7.68h1.92v8.73H114.4Z" style={{"fill":"#fff"}} />
				<path d="M118.48,7.68h2.12l2.28,6.15,2.28-6.15h2.07l-3.53,8.79H122Z" style={{"fill":"#fff"}} />
				<path d="M129.4,7.68h.72l2.74,7.77,2.56-7.79h.5l2.55,7.79,2.74-7.77h.68l-3.17,8.79h-.52l-2.56-7.58-2.55,7.58h-.53Z" style={{"fill":"#fff"}} />
				<path d="M143.19,12.07v0A4.39,4.39,0,1,1,152,12v0a4.39,4.39,0,1,1-8.78,0Zm8.1,0v0a3.72,3.72,0,1,0-7.43,0v0A3.78,3.78,0,0,0,147.59,16,3.73,3.73,0,0,0,151.29,12.07Z" style={{"fill":"#fff"}} />
				<path d="M154.9,7.68h3.66a3.44,3.44,0,0,1,2.46.86,2.33,2.33,0,0,1,.66,1.63v0c0,1.46-1.08,2.29-2.55,2.49L162,16.41h-.83L158.4,12.8h-2.85v3.61h-.65Zm3.59,4.53c1.46,0,2.54-.74,2.54-2v0c0-1.17-.92-1.91-2.5-1.91h-3v3.93Z" style={{"fill":"#fff"}} />
				<path d="M164.64,7.68h.65v5.74l5.56-5.74h.88l-3.81,3.86,4,4.87h-.84L167.46,12l-2.17,2.19v2.22h-.65Z" style={{"fill":"#fff"}} />
				<path d="M173.59,15.14l.43-.49a4.21,4.21,0,0,0,3.13,1.3c1.3,0,2.2-.74,2.2-1.73v0c0-.92-.48-1.46-2.47-1.86s-2.94-1.13-2.94-2.45v0c0-1.29,1.19-2.29,2.81-2.29a4.36,4.36,0,0,1,3,1.06l-.41.51a3.78,3.78,0,0,0-2.61-1c-1.28,0-2.13.73-2.13,1.64v0c0,.92.47,1.48,2.54,1.9S180,12.86,180,14.13v0c0,1.41-1.21,2.39-2.89,2.39A5,5,0,0,1,173.59,15.14Z" style={{"fill":"#fff"}} />
			</svg>
		);
	}
}

export {Logo};