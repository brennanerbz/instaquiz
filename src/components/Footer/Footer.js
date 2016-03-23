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
		const { teacher, account } = this.props;
		const { footerLinks } = this.state;
		const styles = {
			container: {
				margin: '5.25em 0 0 0',
				background: '#fff',
				bottom: '0', 
				width: '100%', 
				height: '54px', 
				lineHeight: '48px',
				padding: '0 10px',
			},
			wrapper: {
				width: '100%', maxWidth: '1000px'
			},
			list: {
				listStyleType: 'none'
			},
			listItem: {
				margin: '0 10px 0 0',
				fontSize: '14.5px'
			},
			link: {

			},
			element: {
				color: '#AEB6BD'
			}
		}
		return (
			<div style={styles.container} className="display_flex flex_container_center flex_center">
				<div style={styles.wrapper}>
					<ul style={styles.list} className="display_flex flex_horizontal">
						{footerLinks.map((link, i) => {
							if(teacher && !account) {
								return (
									<li 
									key={link.text + i} 
									className="flex_item_align_left" 
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
						<li className="flex_item_align_right" style={{fontSize: '14.5px'}}>
							<p style={styles.element}>&copy; Nightly 2016</p>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
