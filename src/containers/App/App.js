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

// API calls
import { fetchUser } from '../../redux/modules/user';

function fetchData(getState, dispatch) {
	const promises = [];
	const token = cookie.load('token', {path: '/'})
	if(token) {
		promises.push(dispatch(fetchUser(token)))
	}
	return Promise.all(promises)
}

@connectData(fetchData)
@connect(state => ({
	params: state.router.params,
	location: state.router.location,
	query: state.router.location.query
	}),
	dispatch => ({
		...bindActionCreators({
			pushState,
			fetchUser
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
		scrolling: false,
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
		const { children, pushState, params, location, query } = this.props;
		const { isMobile, howItWorksOpen, scrolling } = this.state;
		const user = cookie.load('token', {path: '/'}) ? true : false
		var appChildrenWithProps = React.Children.map(children, (child) => {
			return React.cloneElement(child, {
				isMobile: isMobile,
				location: location,
				scrolling: scrolling,
				user: user,
				openHowItWorks: () => this.setState({howItWorksOpen: true})
			})
		})
		return (
			<div id={style.app}>
				<Helmet {...config.app.head}/>
				<Header 
					pushState={pushState}
					params={params}
					location={location}
					query={query}
					isMobile={isMobile}
					show={howItWorksOpen}
					scrolling={scrolling}
					openHowItWorks={(value) => this.setState({howItWorksOpen: value})}
					user={user}
				/>
				{appChildrenWithProps}
				{user &&
				<Footer 
					location={location}
					isMobile={isMobile}
					user={user}
				/>}
				<Modal isMobile={isMobile}/>
			</div>
		);
	}
}
