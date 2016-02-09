import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import cookie from 'react-cookie';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';

// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
// Containers


@connect(state => ({

	}),
	dispatch => ({
		...bindActionCreators({
			pushState
		}, dispatch)
	})
)
export default class App extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired,
		pushState: PropTypes.func.isRequired
	}

	state = {
		isMobile: false
	}

	componentDidMount() {
		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		this.setState({
			isMobile: isMobile
		});
	}

	render() {
		const style = require('./App.scss');
		const { children, pushState } = this.props;
		const { isMobile } = this.state;
		var appChildrenWithProps = React.Children.map(children, (child) => {
			return React.cloneElement(child, {
				isMobile: isMobile
			})
		})
		return (
			<div id={style.app}>
				<Header 
					isMobile={isMobile}
				/>
				{appChildrenWithProps}
				<Footer 
					isMobile={isMobile}
				/>
			</div>
		);
	}
}
