import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import { LoadingSpinner, LoadingItem, AssignmentListItem } from '../';

export default class AssignmentList extends Component {
	static propTypes = {
	}

	render() {
		const { pushState, isMobile } = this.props;
		const { assignments } = this.props;
		const assignmentsLength = assignments && assignments.length;
		const emptyRows = assignmentsLength < 6 ? (6 - assignmentsLength) : 0
		// Prompt
		const { promptOpen } = this.props;
		// Loading
		var loading = this.props.loading;
		const loadingStyles = {
			container: {
				margin: '3em 0'
			}
		}
		const styles = {
			container: {
				maxWidth: !isMobile ? '1050px' : '',
				minWidth: isMobile ? '' : '950px',
			    padding: isMobile ? '' : '0 25px'
			},
			list: {
				padding: isMobile ? `${promptOpen ? '0em' : '3.5em'} 0 0` : '',
				margin: isMobile ? '0' : `${promptOpen ? '0' : '6em'} 0`,
				listStyleType: 'none',  
				width: '100%',
				border: isMobile ? '' : '1px solid #E6E8EA',
				borderRadius: '4px',
				background: '#fff',
				boxShadow: isMobile ? '' : '0 1px 1px 0 rgba(31,45,61,0.05)'
			},
		}
		return (
			<div className="display_flex flex_vertical flex_container_center relative" 
			style={styles.container}>
				<ul style={styles.list}>
					{/* Assignment Rows */}
					{!loading && assignments && assignments.map((assignment, i) => {
						const length = assignments.length - 1;
						let renderBorder = true;
						if(length > 6 && i === length) renderBorder = false;
						return (
							<AssignmentListItem
								key={assignment.title + i} 
								isMobile={isMobile}
								assignment={assignment}
								renderBorder={renderBorder}
								pushState={pushState}
							/>
						)
					})}
					{/* Empty Rows */}
					{
						!loading && Array.from({length: emptyRows}).map((a, i) => {
							const last = i === emptyRows - 1
							return (
								<li key={i} style={{height: '67px', marginLeft: '1em', borderBottom: last ? '' : '1px solid #e4e4e4'}}>
								</li>
							)
						})
					}
					{/* Loading Rows */}
					{
						isMobile && loading && Array.from({length: 6}).map((a, i) => {
							const last = i === 5
							return (
								<LoadingItem key={i} last={last}/>
							)
						})
					}
					{!isMobile && loading && <div style={loadingStyles.container}><LoadingSpinner size={4}/></div>}
				</ul>
			</div>
		);
	}
}
