import React from "react";
import "./App.css";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { BrowserRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import InsideApp from "./component/InsideApp.jsx";
import { getApiURL } from "./utils/env.jsx";

class App extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	componentDidMount() {
		document.getElementById("favicon").href = getApiURL() + "public/get_public_image/favicon.ico";
	}

	render() {
		return (
			<div id="App">
				<BrowserRouter>
					<InsideApp
						cookies={this.props.cookies}
					/>
				</BrowserRouter>
				<NotificationContainer/>
			</div>
		);
	}
}

export default withCookies(App);
