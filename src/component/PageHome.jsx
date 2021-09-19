import React from "react";
import "./PageHome.css";
import { NotificationManager as nm } from "react-notifications";
import { Link } from "react-router-dom";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import Article from "./item/Article.jsx";
import Event from "./item/Event.jsx";
import { getRequest } from "../utils/request.jsx";

export default class PageHome extends React.Component {
	constructor(props) {
		super(props);

		this.getArticles = this.getArticles.bind(this);

		this.state = {
			news: null,
			events: null,
		};
	}

	componentDidMount() {
		this.getArticles();
	}

	getArticles() {
		this.setState({
			events: null,
			news: null,
		});

		getRequest.call(this, "public/get_public_articles", (data) => {
			this.setState({
				events: data
					.filter((d) => d.type === "EVENT")
					.filter((d) => d.end_date !== null && d.start_date !== null)
					.filter((d) => d.end_date > new Date().toISOString())
					.sort((a, b) => (b.start_date > a.start_date ? -1 : 1))
					.slice(0, 3),
				news: data
					.filter((d) => d.type === "NEWS")
					.sort((a, b) => (b.publication_date > a.publication_date ? 1 : -1))
					.slice(0, 2),
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	render() {
		return (
			<div className={"page small-max-sized-page"}>
				<div className={"row row-spaced"}>
					<div className="col-md-12 PageHome-top-row">
						<span style={{ color: "#00A3E0" }}>DISTRIBUTED</span>
						<span style={{ color: "white" }}>.</span>
						<span style={{ color: "#EF3340" }}>lu</span>
					</div>
				</div>

				<div className={"row row-spaced"}>
					<div className="col-md-1"/>
					<div className="col-md-3">
						<img
							className="PageHome-lux-image"
							src="/img/luxembourg-pixelated.svg"
						/>
					</div>
					<div className="col-md-7 PageHome-intro">
						Welcome to the tabloid of the blockchain network in Luxembourg.
					</div>
				</div>

				<div className={"row row-spaced"}>
					<div className="col-md-12">
						<h1>Read the latest articles</h1>
					</div>

					{Array.isArray(this.state.news)
						&& this.state.news.length === 0
						&& <div className="col-md-12">
							<Message
								text="No news found"
							/>
						</div>
					}

					{Array.isArray(this.state.news)
						&& this.state.news.length > 0
						&& this.state.news
							.filter((_, i) => i < 2)
							.map((n) => <div
								key={n.id}
								className="col-md-5">
								<Article
									info={n}
								/>
							</div>)
					}

					{Array.isArray(this.state.news)
						&& this.state.news.length > 0
						&& <div
							key={"more"}
							className="col-md-2">
							<Link to="/news">
								<div className="PageHome-see-more">
									See more
								</div>
							</Link>
						</div>
					}

					{!Array.isArray(this.state.news)
						&& <Loading
							height={200}
						/>
					}
				</div>

				<div className={"row row-spaced"}>
					<div className="col-md-12">
						<h1>Prepare for the coming events</h1>
					</div>

					{Array.isArray(this.state.events)
						&& this.state.events.length === 0
						&& <div className="col-md-12">
							<Message
								text="No event found"
							/>
						</div>
					}

					{Array.isArray(this.state.events)
						&& this.state.events.length > 0
						&& this.state.events
							.filter((_, i) => i < 2)
							.map((e) => <div
								key={e.id}
								className="col-md-5">
								<Event
									info={e}
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
									See more
								</div>
							</Link>
						</div>
					}

					{!Array.isArray(this.state.events)
						&& <Loading
							height={200}
						/>
					}
				</div>
			</div>
		);
	}
}
