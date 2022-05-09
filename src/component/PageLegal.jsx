import React from "react";
import "./PageNews.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Loading from "./box/Loading.jsx";
import { getRequest } from "../utils/request.jsx";
import Article from "./item/Article.jsx";
import Message from "./box/Message.jsx";
import { dictToURI } from "../utils/url.jsx";
import DynamicTable from "./table/DynamicTable.jsx";

export default class PageLegal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			euFrameworks: null,
			nationalFrameworks: null,
			standards: null,
		};
	}

	componentDidMount() {
		this.getEuFrameworks();
		this.getNationalFrameworks();
		this.getStandards();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.taxonomy && this.props.taxonomy) {
			this.getEuFrameworks();
			this.getNationalFrameworks();
			this.getStandards();
		}
	}

	getEuFrameworks(page) {
		if (this.props.taxonomy) {
			this.setState({
				euFrameworks: null,
			});

			const params = dictToURI({
				type: "TOOL",
				taxonomy_values: this.props.taxonomy.taxonomy_values
					.filter((v) => v.category === "TOOL CATEGORY" && v.name === "EUROPEAN UNION LEGAL FRAMEWORK"),
				per_page: 4,
				page: page || 1,
			});

			getRequest.call(this, "public/get_public_articles?" + params, (data) => {
				this.setState({
					euFrameworks: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	getNationalFrameworks(page) {
		if (this.props.taxonomy) {
			this.setState({
				nationalFrameworks: null,
			});
			console.log(this.props.taxonomy);
			const params = dictToURI({
				type: "TOOL",
				taxonomy_values: this.props.taxonomy.taxonomy_values
					.filter((v) => v.category === "TOOL CATEGORY" && v.name === "NATIONAL LEGAL FRAMEWORK"),
				per_page: 4,
				page: page || 1,
			});

			getRequest.call(this, "public/get_public_articles?" + params, (data) => {
				this.setState({
					nationalFrameworks: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	getStandards(page) {
		if (this.props.taxonomy) {
			this.setState({
				standards: null,
			});

			const params = dictToURI({
				type: "TOOL",
				taxonomy_values: this.props.taxonomy.taxonomy_values
					.filter((v) => v.category === "TOOL CATEGORY" && v.name === "STANDARD"),
				per_page: 4,
				page: page || 1,
			});

			getRequest.call(this, "public/get_public_articles?" + params, (data) => {
				this.setState({
					standards: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
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
							<Breadcrumb.Item><Link to="/legal">LEGAL FRAMEWORKS</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h1>National frameworks</h1>
					</div>
				</div>

				{this.state.nationalFrameworks && this.state.nationalFrameworks.pagination.total === 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Message
								text={"No framework found :("}
								height={200}
							/>
						</div>
					</div>
				}

				{this.state.nationalFrameworks && this.state.nationalFrameworks.pagination.total > 0
					&& <DynamicTable
						items={this.state.nationalFrameworks.items}
						pagination={this.state.nationalFrameworks.pagination}
						changePage={(page) => this.getNationalFrameworks(page)}
						buildElement={(a) => <div className="col-md-4">
							<Article
								info={a}
							/>
						</div>
						}
					/>
				}

				{!this.state.nationalFrameworks
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Loading
								height={200}
							/>
						</div>
					</div>
				}

				<div className="row">
					<div className="col-md-12">
						<h1>European Union frameworks</h1>
					</div>
				</div>

				{this.state.euFrameworks && this.state.euFrameworks.pagination.total === 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Message
								text={"No framework found :("}
								height={200}
							/>
						</div>
					</div>
				}

				{this.state.euFrameworks && this.state.euFrameworks.pagination.total > 0
					&& <DynamicTable
						items={this.state.euFrameworks.items}
						pagination={this.state.euFrameworks.pagination}
						changePage={(page) => this.getEuFrameworks(page)}
						buildElement={(a) => <div className="col-md-4">
							<Article
								info={a}
							/>
						</div>
						}
					/>
				}

				{!this.state.euFrameworks
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Loading
								height={200}
							/>
						</div>
					</div>
				}

				<div className="row">
					<div className="col-md-12">
						<h1>Standards</h1>
					</div>
				</div>

				{this.state.standards && this.state.standards.pagination.total === 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Message
								text={"No standard found :("}
								height={200}
							/>
						</div>
					</div>
				}

				{this.state.standards && this.state.standards.pagination.total > 0
					&& <DynamicTable
						items={this.state.standards.items}
						pagination={this.state.standards.pagination}
						changePage={(page) => this.getStandards(page)}
						buildElement={(a) => <div className="col-md-4">
							<Article
								info={a}
							/>
						</div>
						}
					/>
				}

				{!this.state.standards
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
