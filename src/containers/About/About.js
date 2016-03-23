import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class About extends Component {
	static propTypes = {
	}

	render() {
		const { isMobile } = this.props;
		const nateDogg = require('../../../static/images/NateDogg.jpg')
		const erbz = require('../../../static/images/Erbz.jpg')
		const styles = {
			page: {
				margin: isMobile ? '3em 0 2em' : '2em 0 2em'
			},
			container: {
				width: '100%',
				maxWidth: isMobile ? '' : '1050px',
				minWidth: isMobile ? '' : '900px',
				margin: '0 25px'
			},
			header: {
				fontSize: '34px',
				fontWeight: '600',
				color: '#1FB6FF',
				margin: '25px'
			},
			founderContainer: {
				width: '40%',
				minWidth: '300px',
				border: isMobile ? '' : '1px solid #f2f2f2',
				borderRadius: '10px',
				padding: isMobile ? '0 0.5em' : '2em',
				margin: isMobile ? '1em 2em 1em' : '1em 3em 1em'
			},
			founderImage: {
				borderRadius: '10px',
				height: '200px'
			},
			founderName: {
				padding: '1em 0 1em 0',
				fontSize: '20px',
				fontWeight: '600',
				color: '#333333'
			},
			founderInfo: {
				fontSize: '15px',
				color: '#3C4858'
			},
			inlineName: {
				color: '#333333'
			}
		}
		return (
			<div style={styles.page} className="display_flex flex_vertical flex_center">
				<h1 style={styles.header}>The Team</h1>
				<div style={styles.container} className="display_flex flex_horizontal flex_wrap flex_center">
					<div style={[styles.founderContainer, {order: 1}]} className="display_flex flex_vertical flex_center">
						<img style={styles.founderImage} src={nateDogg}/>
						<h2 style={styles.founderName}>Nathan Lomeli (co-founder)</h2>
						<p style={styles.founderInfo}><b style={styles.inlineName}>Nathan Lomeli</b> is the back-end engineer and co-founder of Nightly. Since early on, Nathan has been focused on creating intelligent software for learning purposes.<br/><br/>Prior to founding Nightly, Nathan worked as a teacher in Oakland, CA where he experienced the day-to-day stress of teaching. He also spent a year leading product development at the Edtech startup LearnBoost. He graduated Stanford University with a BS in Economics.</p>
					</div>
					<div style={[styles.founderContainer, {order: 2}]} className="display_flex flex_vertical flex_center">
						<img style={[styles.founderImage]} src={erbz}/>
						<h2 style={styles.founderName}>Brennan Erbeznik (co-founder)</h2>
						<p style={styles.founderInfo}><b style={styles.inlineName}>Brennan Erbeznik</b> is the front-end engineer and co-founder of Nightly. A native of Venice, CA, Brennan holds a BS in Economics from Villanova University.<br/><br/>Prior to founding Nightly, Brennan started multiple media businesses. The first was a production company which produced 'Arafa's Journey', a documentary and Indiegogo campaign that helped bring a small girl from Tanzania, Africa to the U.S. for primary school. The second was Socializer, a toolkit to help social media users gain bigger followings.</p>
					</div>
				</div>
			</div>
		);
	}
}
