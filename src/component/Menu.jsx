import React from "react";
import "./Menu.css";
import SideNav, {
	Toggle, Nav, NavItem, NavIcon, NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Link } from "react-router-dom";

export default class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			notifications: null,
			myCompanies: null,
		};
	}

	getTaskNotificationBlock(url) {
		if (this.state.notifications === null
			|| this.state.notifications.new_requests === undefined) {
			return "";
		}

		return <Link to={url}>
			<div className={"Menu-notification"}>
				{this.state.notifications.new_requests}
			</div>
		</Link>;
	}

	render() {
		return (
			<SideNav
				onSelect={(selected) => {
					if (selected === "disconnect") {
						this.props.cookies.remove("access_token_cookie");
						window.location.replace("/");
					} else {
						this.props.changeMenu(selected);
					}
				}}
			>
				<Toggle />
				<Nav defaultSelected={this.props.selectedMenu}>
					<NavItem
						eventKey=""
						active={this.props.selectedMenu === ""}>
						<NavIcon>
							<Link to="/"><i className="fa fa-home" style={{ fontSize: "1.75em" }}/></Link>
						</NavIcon>
						<NavText>
							<Link to="/">Home</Link>
						</NavText>
					</NavItem>
					<NavItem
						eventKey="news"
						active={this.props.selectedMenu === "news"}>
						<NavIcon>
							<Link to="/news"><i className="fa fa-newspaper" style={{ fontSize: "1.75em" }}/></Link>
						</NavIcon>
						<NavText>
							<Link to="/news">News</Link>
						</NavText>
					</NavItem>
					<NavItem
						eventKey="calendar"
						active={this.props.selectedMenu === "calendar"}>
						<NavIcon>
							<Link to="/calendar"><i className="fa fa-calendar-alt" style={{ fontSize: "1.75em" }}/></Link>
						</NavIcon>
						<NavText>
							<Link to="/calendar">Calendar</Link>
						</NavText>
					</NavItem>
					<NavItem
						eventKey="network"
						active={this.props.selectedMenu === "network"}>
						<NavIcon>
							<Link to="/network"><i className="fas fa-project-diagram" style={{ fontSize: "1.75em" }}/></Link>
						</NavIcon>
						<NavText>
							<Link to="/network">Network</Link>
						</NavText>
					</NavItem>
					<NavItem
						eventKey="search"
						active={this.props.selectedMenu === "search"}>
						<NavIcon>
							<Link to="/search"><i className="fas fa-search" style={{ fontSize: "1.75em" }}/></Link>
						</NavIcon>
						<NavText>
							<Link to="/search">Search</Link>
						</NavText>
					</NavItem>

					<NavItem
						className="Menu-log-out-nav-item Menu-discord">
						<NavIcon>
							<a
								href="https://discord.gg/xkBDmE6HQ8"
								target="_blank"
								rel="noreferrer"
							>
								<i className="fab fa-discord" style={{ fontSize: "1.75em" }} />
							</a>
						</NavIcon>
						<NavText>
							<a
								href="https://discord.gg/xkBDmE6HQ8"
								target="_blank"
								rel="noreferrer"
							>
								Discord
							</a>
						</NavText>
					</NavItem>
					{/* <NavItem
						className="Menu-log-out-nav-item"
						eventKey="contact"
						active={this.props.selectedMenu === "contact"}>
						<NavIcon>
							<Link to="/contact">
								<i className="fas fa-users" style={{ fontSize: "1.75em" }} />
							</Link>
						</NavIcon>
						<NavText>
							<Link to="/contact">Team & contact</Link>
						</NavText>
					</NavItem> */}
				</Nav>
			</SideNav>
		);
	}
}
