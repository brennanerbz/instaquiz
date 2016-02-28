import React, { Component, PropTypes } from 'react';

export default class Homework extends Component {
	static propTypes = {
	}

	render() {
		var homeworkChildrenWithProps = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, ...this.props)
		})
		return (
			<div>
				{homeworkChildrenWithProps}
			</div>
		);
	}
}
