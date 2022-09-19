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
import DynamicTable from "./table/DynamicTable.jsx";

export default class PageNews extends React.Component {
	constructor(props) {
		super(props);

		this.getArticles = this.getArticles.bind(this);
		this.getFastLinks = this.getFastLinks.bind(this);
		this.modifyFilters = this.modifyFilters.bind(this);

		this.state = {
			page: 1,
			fastLinkArticles: null,
			articles: null,
			entities: null,
			filters: {
				type: "NEWS",
				taxonomy_values: [],
				title: null,
			},
		};
	}

	componentDidMount() {
		this.getArticles();
		this.getFastLinks();
	}

	getFastLinks() {
		this.setState({
			fastLinkArticles: null,
		});

		const params = dictToURI({
			...this.state.filters,
			per_page: 5,
			page: 1,
		});

		getRequest.call(this, "public/get_public_articles?" + params, (data) => {
			this.setState({
				fastLinkArticles: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getArticles(page) {
		this.setState({
			articles: null,
			entities: null,
		});

		const params = dictToURI({
			per_page: 15,
			page: page || 1,
			include_tags: true,
			...this.state.filters,
		});

		getRequest.call(this, "public/get_public_articles?" + params, (data) => {
			this.setState({
				articles: data,
			}, () => {
				const params2 = dictToURI({
					ids: [...new Set(data.items
						.map((a) => a.company_tags)
						.flat())],
				});

				getRequest.call(this, "public/get_public_entities?" + params2, (data2) => {
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

				{this.state.fastLinkArticles && this.state.fastLinkArticles.pagination.total === 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Message
								text={"No article found :("}
								height={100}
							/>
						</div>
					</div>
				}

				{this.state.fastLinkArticles && this.state.fastLinkArticles.pagination.total > 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							{this.state.fastLinkArticles.items.map((a) => <ArticleSmall
								key={a.id}
								info={a}
							/>)
							}
						</div>
					</div>
				}

				{!this.state.fastLinkArticles
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

				{this.state.articles && this.state.articles.pagination.total === 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Message
								text={"No article found :("}
								height={200}
							/>
						</div>
					</div>
				}

				{this.state.articles && this.state.articles.pagination.total > 0
					&& <DynamicTable
						items={this.state.articles.items}
						pagination={this.state.articles.pagination}
						changePage={(page) => this.getArticles(page)}
						buildElement={(a) => <div className="col-md-4">
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
						</div>
						}
					/>
				}

				{!this.state.articles
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
