import React, {Component} from 'react';

class LegacyConnect extends Component {

	constructor() {
		super();

		this.animateFrame = this.animateFrame.bind(this);

		this.data = [
			{ value : 90,		color: '#060808' },
			{ value : 39.375, 	color: '#959594' },
			{ value : 5.625, 	color: '#6abc45' },
			{ value : 45, 	  	color: '#67338f' },
			{ value : 56.25,	color: 'rgba(255,255,255,0)' },
			{ value:  28.125,	color: '#9e1c3d' },
			{ value:  5.625,	color: '#eb2226' },
			{ value : 22.5,		color: '#0773b8' },
			{ value : 5.625,	color: '#f29ac0' },
			{ value : 16.875,   color: '#14a74f' },
			{ value : 16.875,	color: '#8580bd' },
			{ value : 11.25, 	color: '#73ccf0' },
			{ value : 5.625, 	color: '#060808' },
			{ value : 11.25, 	color: '#f1e919' },
		];
		this.cnt = 0;
		this.centerX = 50;
		this.centerY = 50;
		this.doughnutRadius = this.Min([50, 50]) - 10;
		this.baseColor = "#efefef";
		this.cutoutRadius = this.doughnutRadius * (75 / 100);
		this.baseDoughnutRadius = this.doughnutRadius + 4;
		this.baseCutoutRadius = this.cutoutRadius - 4;

		this.state = {
			animationClass: '',
			animationDecimal: 0
		}
	}

	Min(arr) {
		return Math.min.apply(null, arr);
	}

	componentDidMount() {
		window.requestAnimationFrame(() => this.animateFrame());
	}

	isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	CapValue(valueToCap, maxValue, minValue) {
		if (this.isNumber(maxValue) && valueToCap > maxValue) {
			return maxValue;
		}

		if (this.isNumber(minValue) && valueToCap < minValue) {
			return minValue;
		}
		return valueToCap;
	}

	animateFrame() {
		const cnt = this.state.animationDecimal;
		const animFrameAmount = 1 / this.CapValue(60, Number.MAX_VALUE, 1);
		this.setState({ animationDecimal: this.CapValue(cnt + animFrameAmount, null, 0)});
		if (this.state.animationDecimal < 1) {
			window.requestAnimationFrame(() => this.animateFrame());
		} else {
			this.setState({ animationClass: 'rotate' });
		}
	}

	drawSegments() {
		let segments = [];
		let segmentValue = 180;
		let startRadius = -Math.PI / 2; //-90 degree
		const rotateAnimation = this.state.animationDecimal; //count up between0~1

		for (let i = 0; i < this.data.length; i++) {
			segmentValue += this.data[i].value;// potential bug area? note how we divide value by value potentially on the first go
			const segmentAngle = rotateAnimation * ((this.data[i].value / segmentValue) * (Math.PI * 2)),
				endRadius = startRadius + segmentAngle,
				largeArc = ((endRadius - startRadius) % (Math.PI * 2)) > Math.PI ? 1 : 0,
				startX = this.centerX + Math.cos(startRadius) * this.doughnutRadius,
				startY = this.centerY + Math.sin(startRadius) * this.doughnutRadius,
				endX2 = this.centerX + Math.cos(startRadius) * this.cutoutRadius,
				endY2 = this.centerY + Math.sin(startRadius) * this.cutoutRadius,
				endX = this.centerX + Math.cos(endRadius) * this.doughnutRadius,
				endY = this.centerY + Math.sin(endRadius) * this.doughnutRadius,
				startX2 = this.centerX + Math.cos(endRadius) * this.cutoutRadius,
				startY2 = this.centerY + Math.sin(endRadius) * this.cutoutRadius;

			var cmd = `M ${startX} ${startY} A ${this.doughnutRadius} ${this.doughnutRadius} ${0} ${largeArc} ${1} ${endX} ${endY} L ${startX2} ${startY2} A ${this.cutoutRadius} ${this.cutoutRadius} 0 ${largeArc} 0 ${endX2} ${endY2} Z`;
			
			segments.push(<path fill={this.data[i].color} d={cmd} key={i} />);
			
			startRadius = startRadius + segmentAngle;
		}
		return segments;
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state !== nextState) {
			return true;
		}
	}

	render() {
		return (
			<div className="connect">
				<div className="container">
					<svg className="legacy-spinner" width="100px" height="100px">
						<g opacity={this.state.animationDecimal} className={this.state.animationClass}>{this.drawSegments()}</g>
					</svg>
					<h1 className="header">{`You're all set...`}<br />
						{(this.props.hasOwnProperty('connectionMessageString') ? this.props.connectionMessageString : 'Connecting to CollectivWorks WiFi')}</h1>
				</div>
			</div>
		);
	}
}

export { LegacyConnect };