import React from "react";
import "./InsideApp.css";
import { Route, Switch } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import Menu from "./Menu.jsx";
import PageHome from "./PageHome.jsx";
import PageNews from "./PageNews.jsx";
import PageCalendar from "./PageCalendar.jsx";
import PageNetwork from "./PageNetwork.jsx";
import PageContact from "./PageContact.jsx";
import PageArticle from "./PageArticle.jsx";
import PageEvent from "./PageEvent.jsx";
import PageCompany from "./PageCompany.jsx";
import { getRequest } from "../utils/request.jsx";

export default class InsideApp extends React.Component {
	constructor(props) {
		super(props);

		this.changeState = this.changeState.bind(this);

		this.state = {
			selectedMenu: "",
			taxonomy: null,
		};
	}

	componentDidMount() {
		this.getTaxonomy();
	}

	getTaxonomy() {
		this.setState({
			taxonomy: null,
		});

		getRequest.call(this, "public/get_public_analytics", (data) => {
			this.setState({
				taxonomy: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id="InsideApp">
				<Menu
					selectedMenu={this.state.selectedMenu}
					changeMenu={(v) => this.changeState("selectedMenu", v)}
					disconnect={this.props.disconnect}
				/>
				<div id="InsideApp-content">
					<Switch>
						<Route path="/news/:handle" render={(props) => <PageArticle
							taxonomy={this.state.taxonomy}
							{...props}/>}
						/>
						<Route path="/calendar/:handle" render={(props) => <PageEvent
							taxonomy={this.state.taxonomy}
							{...props} />}
						/>
						<Route path="/network/:id" render={(props) => <PageCompany
							taxonomy={this.state.taxonomy}
							{...props} />}
						/>

						<Route path="/news" render={(props) => <PageNews {...props} />}/>
						<Route path="/calendar" render={(props) => <PageCalendar {...props} />}/>
						<Route path="/network" render={(props) => <PageNetwork
							taxonomy={this.state.taxonomy}
							{...props} />}
						/>
						<Route path="/contact" render={(props) => <PageContact{...props} />}/>
						<Route path="/" render={(props) => <PageHome {...props} />}/>
					</Switch>
				</div>
			</div>
		);
	}
}