import React from "react";
import "./PageNews.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Loading from "./box/Loading.jsx";
import { getRequest } from "../utils/request.jsx";
import Article from "./item/Article.jsx";
import ArticleSmall from "./item/ArticleSmall.jsx";
import Message from "./box/Message.jsx";
import { dictToURI } from "../utils/url.jsx";
import Table from "./table/Table.jsx";

export default class PageNews extends React.Component {
	constructor(props) {
		super(props);

		this.getArticles = this.getArticles.bind(this);
		this.modifyFilters = this.modifyFilters.bind(this);

		this.state = {
			page: 1,
			articles: null,
			filters: {
				media: "ALL",
				type: "NEWS",
				taxonomy_values: [],
				title: null,
			},
		};
	}

	componentDidMount() {
		this.getArticles();
	}

	getArticles() {
		this.setState({
			articles: null,
		});

		const params = dictToURI(this.state.filters);

		getRequest.call(this, "public/get_public_articles?" + params, (data) => {
			this.setState({
				articles: data.sort((a, b) => (b.publication_date > a.publication_date ? 1 : -1)),
			});
		}, (response) => {
			this.setState({ loading: false });
			nm.warning(response.statusText);
		}, (error) => {
			this.setState({ loading: false });
			nm.error(error.message);
		});
	}

	modifyFilters(field, value) {
		const filters = { ...this.state.filters };
		filters[field] = value;
		this.setState({ filters });
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">DISTRIBUTED.LU</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/news">NEWS</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h1>Fast links</h1>
					</div>
				</div>

				{this.state.articles !== null && this.state.articles.length === 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Message
								text={"No article found"}
								height={100}
							/>
						</div>
					</div>
				}

				{this.state.articles !== null && this.state.articles.length > 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							{this.state.articles.filter((_, i) => i < 5).map((a) => <ArticleSmall
								key={a.id}
								info={a}
							/>)
							}
						</div>
					</div>
				}

				{this.state.articles === null
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Loading
								height={100}
							/>
						</div>
					</div>
				}

				<div className="row">
					<div className="col-md-12">
						<h1>Articles</h1>
					</div>
				</div>

				{this.state.articles !== null && this.state.articles.length === 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Message
								text={"No article found"}
								height={200}
							/>
						</div>
					</div>
				}

				{this.state.articles !== null && this.state.articles.length > 0
					&& <Table
						className={""}
						elements={this.state.articles.map((a, i) => [a, i])}
						buildElement={(a) => (
							<div className="col-md-4">
								<Article
									info={a}
								/>
							</div>
						)}
					/>
				}

				{this.state.articles === null
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Loading
								height={200}
							/>
						</div>
					</div>
				}

			</div>
		);
	}
}
