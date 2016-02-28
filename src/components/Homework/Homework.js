import React, { Component, PropTypes } from 'react';

export default class Homework extends Component {
	static propTypes = {
	}

	render() {
		const { isMobile } = this.props;
		var homeworkChildrenWithProps = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, ...this.props)
		})
		return (
			<div style={{maxWidth: '1050px', height: '100%'}} 
				 className="display_flex flex_container_center">
				<div style={{width: '100%', height: '100%'}} className="flex_vertical">
					<div style={{padding: isMobile ? '3.5em 0 0' : '5em 25px', height: '100%'}}>
					{homeworkChildrenWithProps}
					</div>
				</div>
			</div>
		);
	}
}
