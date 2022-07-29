import React from "react";
import "./Menu.css";
import SideNav, {
	Toggle, Nav, NavItem, NavIcon, NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

export default class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
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
						active={this.props.selectedMenu === ""}
						onClick={() => this.props.history.push("/")}>
						<NavIcon>
							<i className="fa fa-home" style={{ fontSize: "1.75em" }}/>
						</NavIcon>
						<NavText>
							Home
						</NavText>
					</NavItem>
					<NavItem
						eventKey="news"
						active={this.props.selectedMenu === "news"}
						onClick={() => this.props.history.push("/news")}>
						<NavIcon>
							<i className="fa fa-newspaper" style={{ fontSize: "1.75em" }}/>
						</NavIcon>
						<NavText>
							News
						</NavText>
					</NavItem>
					<NavItem
						eventKey="calendar"
						active={this.props.selectedMenu === "calendar"}
						onClick={() => this.props.history.push("/calendar")}>
						<NavIcon>
							<i className="fa fa-calendar-alt" style={{ fontSize: "1.75em" }}/>
						</NavIcon>
						<NavText>
							Calendar
						</NavText>
					</NavItem>
					<NavItem
						eventKey="network"
						active={this.props.selectedMenu === "network"}
						onClick={() => this.props.history.push("/network")}>
						<NavIcon>
							<i className="fas fa-project-diagram" style={{ fontSize: "1.75em" }}/>
						</NavIcon>
						<NavText>
							Network
						</NavText>
					</NavItem>
					<NavItem
						eventKey="legal"
						active={this.props.selectedMenu === "legal"}
						onClick={() => this.props.history.push("/legal")}>
						<NavIcon>
							<i className="fas fa-balance-scale" style={{ fontSize: "1.75em" }}/>
						</NavIcon>
						<NavText>
							Legal framework
						</NavText>
					</NavItem>
					<NavItem
						eventKey="training"
						active={this.props.selectedMenu === "training"}
						onClick={() => this.props.history.push("/training")}>
						<NavIcon>
							<i className="fas fa-graduation-cap" style={{ fontSize: "1.75em" }}/>
						</NavIcon>
						<NavText>
							Training
						</NavText>
					</NavItem>
					<NavItem
						eventKey="search"
						active={this.props.selectedMenu === "search"}
						onClick={() => this.props.history.push("/search")}>
						<NavIcon>
							<i className="fas fa-search" style={{ fontSize: "1.75em" }}/>
						</NavIcon>
						<NavText>
							Search
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
