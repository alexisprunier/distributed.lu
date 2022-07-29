import React from "react";
import "./PageHome.css";
import Graph from "react-graph-vis";
import { NotificationManager as nm } from "react-notifications";
import { Link } from "react-router-dom";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import Article from "./item/Article.jsx";
import SearchField from "./form/SearchField.jsx";
import { getRequest } from "../utils/request.jsx";
import { dictToURI } from "../utils/url.jsx";
import { dateToString } from "../utils/date.jsx";

export default class PageHome extends React.Component {
	constructor(props) {
		super(props);

		this.getNews = this.getNews.bind(this);
		this.getEvents = this.getEvents.bind(this);

		this.state = {
			news: null,
			events: null,
			entity: null,
		};
	}

	componentDidMount() {
		this.getNews();
		this.getEvents();
	}

	getNews() {
		const params = dictToURI({
			per_page: 2,
			type: "NEWS",
		});

		getRequest.call(this, "public/get_public_articles?" + params, (data) => {
			this.setState({
				news: data,
			}, () => {
				const params2 = dictToURI({
					ids: [...new Set(data.items
						.map((a) => a.company_tags)
						.flat())],
				});

				getRequest.call(this, "public/get_public_companies?" + params2, (data2) => {
					this.setState({
						entities: data2,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getEvents() {
		const params = dictToURI({
			per_page: 2,
			type: "EVENT",
			order_by: "start_date",
			min_start_date: dateToString(new Date()),
		});

		getRequest.call(this, "public/get_public_articles?" + params, (data) => {
			this.setState({
				events: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getGraphData() {
		if (!this.props.taxonomy) {
			return {};
		}

		const roleNodes = this.props.taxonomy.taxonomy_values
			.filter((v) => v.category === "ECOSYSTEM ROLE")
			.map((v) => ({
				id: v.id,
				label: v.name,
				color: { border: "white", background: "#009fe3" },
				font: { color: "white" },
				shape: "box",
			}));

		return {
			nodes: [
				{
					id: -1,
					label: "LUXEMBOURG",
					color: { border: "white", background: "#e40613" },
					font: { color: "white" },
					shape: "box",
				},
				...roleNodes,
			],
			edges: [
				...roleNodes.map((r) => ({ from: -1, to: r.id, color: { color: "white" } })),
			],
		};
	}

	render() {
		const options = {
			layout: {
			},
			edges: {
				color: "#000000",
			},
			height: "400px",
		};

		return (
			<div className={"page small-max-sized-page row-spaced"}>
				<div className={"row row-spaced"}>
					<div className="col-md-12 PageHome-top-row">
						<span style={{ color: "#00A3E0" }}>DISTRIBUTED</span>
						<span style={{ color: "white" }}>.</span>
						<span style={{ color: "#EF3340" }}>lu</span>
					</div>
				</div>

				<div className={"row row-spaced"}>
					<div className="col-md-1"/>
					<div className="col-md-4">
						<img
							className="PageHome-lux-image"
							src="/img/luxembourg-pixelated.svg"
						/>
					</div>
					<div className="col-md-1"/>
					<div className="col-md-6 PageHome-intro">
						<div>Welcome to the Master Node of the blockchain activity in Luxembourg</div>
						<br/>
						<SearchField
							{...this.props}
						/>

						<a
							href="https://discord.gg/xkBDmE6HQ8"
							target="_blank"
							rel="noreferrer"
						>
							<div className={"row"}>
								<div className="col-sm-1"/>
								<div className="col-sm-6 PageHome-discord-intro">
									<h3>Come to discuss, share, meet and support each other!</h3>
								</div>
								<div className="col-sm-3">
									<img
										className="PageHome-lux-image"
										src="/img/Discord-Logo-Color.svg"
									/>
								</div>
							</div>
						</a>
					</div>
				</div>

				<div className={"row row-spaced"}>
					<div className="col-md-12">
						<h1>Read the latest articles</h1>
					</div>

					{this.state.news
						&& this.state.news.items.length === 0
						&& <div className="col-md-12">
							<Message
								text="No news found :("
								height={300}
							/>
						</div>
					}

					{this.state.news
						&& this.state.news.items.length > 0
						&& this.state.news.items
							.map((a) => <div
								key={a.id}
								className="col-md-5">
								<Article
									info={a}
									showImage={true}
									showDate={true}
									showType={true}
									entities={this.state.entities
										? this.state.entities.filter((e) => a.company_tags.indexOf(e.id) >= 0)
										: []
									}
								/>
							</div>)
					}

					{this.state.news
						&& this.state.news.items.length > 0
						&& <div
							key={"more"}
							className="col-md-2">
							<Link to="/news">
								<div className="PageHome-see-more">
									<i className="fas fa-angle-double-right"/>
									See more
								</div>
							</Link>
						</div>
					}

					{!this.state.news
						&& <Loading
							height={300}
						/>
					}
				</div>

				<div className={"row row-spaced"}>
					<div className="col-md-12">
						<h1>Discover the network</h1>
					</div>

					{this.props.taxonomy
						&& this.props.taxonomy.taxonomy_values
							.filter((v) => v.category === "ECOSYSTEM ROLE").length > 0
						&& <div className="col-md-12">
							<div className="PageHome-network">
								<Link to="/network">
									<div className="PageHome-network-overlay"/>
									<Graph
										graph={this.getGraphData()}
										options={options}
									/>
								</Link>
							</div>
						</div>
					}

					{(!this.props.taxonomy
						|| this.props.taxonomy.taxonomy_values
							.filter((v) => v.category === "ECOSYSTEM ROLE").length === 0)
						&& <Loading
							height={400}
						/>
					}
				</div>

				<div className={"row row-spaced"}>
					<div className="col-md-12">
						<h1>Prepare for the coming events</h1>
					</div>

					{this.state.events
						&& this.state.events.items.length === 0
						&& <div className="col-md-12">
							<Message
								text="No event found :("
								height={300}
							/>
						</div>
					}

					{this.state.events
						&& this.state.events.items.length > 0
						&& this.state.events.items
							.map((e) => <div
								key={e.id}
								className="col-md-5">
								<Article
									info={e}
									showImage={true}
									showTime={true}
									showType={true}
								/>
							</div>)
					}

					{Array.isArray(this.state.events)
						&& this.state.events.length > 0
						&& <div
							key={"more"}
							className="col-md-2">
							<Link to="/calendar">
								<div className="PageHome-see-more">
									<i className="fas fa-angle-double-right"/>
									See more
								</div>
							</Link>
						</div>
					}

					{!this.state.events
						&& <Loading
							height={300}
						/>
					}
				</div>
			</div>
		);
	}
}
