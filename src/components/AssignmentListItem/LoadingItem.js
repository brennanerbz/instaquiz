import React, { Component, PropTypes } from 'react';

export default class LoadingItem extends Component {
	static propTypes = {
	}

	render() {
		const { last } = this.props;
		const styles = {
			listItem: {
				height: '67px', 
				marginLeft: '1em', 
				borderBottom: last ? '' : '1px solid #e4e4e4'
			}
		}
		return (
			<li style={styles.listItem}>
				<div className="loading-item">
					<div className="animated-background">
					  <div className="background-masker header-top"></div>
				      <div className="background-masker header-left"></div>
				      <div className="background-masker header-right"></div>
				      <div className="background-masker header-bottom"></div>
				      <div className="background-masker subheader-left"></div>
				      <div className="background-masker subheader-right"></div>
				      <div className="background-masker subheader-bottom"></div>
					</div>
				</div>
			</li>
		);
	}
}
