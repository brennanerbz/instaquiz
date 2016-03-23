import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';

import * as overlayActions from '../../redux/modules/overlays';

@connect(
  state => ({
  }),
  dispatch => ({
    ...bindActionCreators({
      ...overlayActions,
      pushState
    }, dispatch)
  })
)
export default class Footer extends Component {
	static propTypes = {
	}

	state = {
		footerLinks: [
			// {text: 'About', url: '/about'},
			{text: 'Clear cookies', url: '/'}
		]
	}

	render() {
		const { location, isMobile, teacher, account, assignments } = this.props;
		const { footerLinks } = this.state;
		const styles = {
			container: {
				background: '#fff',
				bottom: '0', 
				width: '100%', 
				minHeight: '54px',
				height: '54px', 
				lineHeight: '48px',
				padding: '0 1em',
				marginBottom: '0'
			},
			wrapper: {
				width: '100%', maxWidth: '1000px'
			},
			list: {
				listStyleType: 'none'
			},
			listItem: {
				margin: '0 0 0 10px',
				fontSize: '14.5px'
			},
			link: {

			},
			element: {
				color: '#AEB6BD'
			}
		}
		return (
			<div style={styles.container} className="display_flex flex_container_center flex_center flex_container_right">
				<div style={styles.wrapper}>
					<ul style={styles.list} className="display_flex flex_horizontal">
						<li className="flex_item_align_left" style={{fontSize: '14.5px'}}>
							<p style={styles.element}>&copy; Nightly 2016</p>
						</li>
						{footerLinks.map((link, i) => {
							if(teacher && !account) {
								return (
									<li 
									key={link.text + i} 
									className="flex_item_align_right" 
									style={styles.listItem} 
									onClick={() => {
										if(link.text.match(/Clear/g)) {
											var t = confirm('You will lose everything you\'ve created and will be taken back to the landing page. Are you sure?')
											if(t) {
												this.props.logOut()
												this.props.pushState(null, link.url)
											}
										}
									}}>
										<a className="link grey" style={styles.link}>{link.text}</a>
									</li>
								)
							}
						})}
					</ul>
				</div>
			</div>
		);
	}
}
