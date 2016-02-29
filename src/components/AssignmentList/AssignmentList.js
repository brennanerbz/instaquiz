import React, { Component, PropTypes } from 'react';

export default class AssignmentList extends Component {
	static propTypes = {
	}

	render() {
		const { assignments } = this.props;
		return (
			<ul>
				{assignments.map(assignment => {
					return (
						<li>
							{assignment.title}
						</li>
					)
				})}
			</ul>
		);
	}
}
