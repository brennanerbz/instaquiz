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
import Modal from '../../components/Modals/Modal';
// Containers


@connect(state => ({
	params: state.router.params,
	location: state.router.location
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
		howItWorksOpen: false,
		scrolling: false
	}

	componentDidMount() {
		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		this.setState({
			isMobile: isMobile
		});

		window.addEventListener('scroll', ::this.handleScroll)
	}

	handleScroll() {
		const { scrolling, isMobile } = this.state;
		const node = document.body
		// Scroll logic
	}

	render() {
		const style = require('./App.scss');
		const { children, pushState, params, location } = this.props;
		const { isMobile, howItWorksOpen, scrolling } = this.state;
		var appChildrenWithProps = React.Children.map(children, (child) => {
			return React.cloneElement(child, {
				isMobile: isMobile,
				location: location,
				scrolling: scrolling,
				openHowItWorks: () => this.setState({howItWorksOpen: true})
			})
		})
		return (
			<div id={style.app}>
				<Helmet {...config.app.head}/>
				<WorksList
					isMobile={isMobile}
					show={howItWorksOpen}
					closeHowItWorks={() => this.setState({howItWorksOpen: false})}
				/>
				<Header 
					pushState={pushState}
					params={params}
					location={location}
					isMobile={isMobile}
					show={howItWorksOpen}
					scrolling={scrolling}
					openHowItWorks={(value) => this.setState({howItWorksOpen: value})}
				/>
				{appChildrenWithProps}
				<Footer 
					isMobile={isMobile}
				/>
				<Modal isMobile={isMobile}/>
			</div>
		);
	}
}
