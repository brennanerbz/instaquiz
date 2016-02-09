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
import WorksList from '../../components/WorksList/WorksList';
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
		isMobile: false,
		howItWorksOpen: false
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
		const { isMobile, howItWorksOpen } = this.state;
		var appChildrenWithProps = React.Children.map(children, (child) => {
			return React.cloneElement(child, {
				isMobile: isMobile,
				openHowItWorks: () => this.setState({howItWorksOpen: true})
			})
		})
		return (
			<div id={style.app}>
				<WorksList
					show={howItWorksOpen}
					closeHowItWorks={() => this.setState({howItWorksOpen: false})}
				/>
				<Header 
					isMobile={isMobile}
					openHowItWorks={() => this.setState({howItWorksOpen: true})}
				/>
				{appChildrenWithProps}
				<Footer 
					isMobile={isMobile}
				/>
			</div>
		);
	}
}
