import React from "react";
import "./PageNetwork.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { getRequest } from "../utils/request.jsx";
import Loading from "./box/Loading.jsx";
import Table from "./table/Table.jsx";
import Company from "./item/Company.jsx";

export default class PageNetwork extends React.Component {
	constructor(props) {
		super(props);

		this.getCompanies = this.getCompanies.bind(this);
		this.filterCompaniesByRole = this.filterCompaniesByRole.bind(this);

		this.state = {
			actors: null,
			media: null,
			jobPlatforms: null,
		};
	}

	componentDidMount() {
		this.getCompanies();
	}

	componentDidUpdate(prevProps) {
		if ((prevProps.taxonomy === null || prevProps.taxonomy === undefined)
			&& (this.props.taxonomy !== null && this.props.taxonomy !== undefined)) {
			this.getCompanies();
		}
	}

	getCompanies() {
		this.setState({
			actors: null,
			media: null,
			jobPlatforms: null,
		});

		getRequest.call(this, "public/get_public_companies", (data) => {
			this.setState({
				actors: this.filterCompaniesByRole(data, "ACTOR"),
				media: this.filterCompaniesByRole(data, "MEDIA"),
				jobPlatforms: this.filterCompaniesByRole(data, "JOB PLATFORM"),
			});
		}, (response) => {
			this.setState({ loading: false });
			nm.warning(response.statusText);
		}, (error) => {
			this.setState({ loading: false });
			nm.error(error.message);
		});
	}

	filterCompaniesByRole(companies, roleName) {
		if (companies === null || companies === undefined
			|| this.props.taxonomy === null || this.props.taxonomy === undefined
			|| this.props.taxonomy.taxonomy_values === undefined) {
			return [];
		}

		let value = this.props.taxonomy.taxonomy_values
			.filter((v) => v.category === "ECOSYSTEM ROLE" && v.name === roleName);

		if (value.length === 0) {
			return [];
		}

		value = value[0];

		const concernedCompanyIds = this.props.taxonomy.taxonomy_assignments
			.filter((a) => a.taxonomy_value === value.id)
			.map((a) => a.company);

		return companies
			.filter((c) => concernedCompanyIds.indexOf(c.id) >= 0);
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div className={"PageNetwork page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">DISTRIBUTED.LU</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/network">NETWORK</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h1>Superheroes of blockchain</h1>
					</div>
				</div>

				{this.state.actors !== null
					? <div className="row">
						<div className={"col-md-12"}>
							<Table
								className={""}
								elements={this.state.actors.map((a, i) => [a, i])}
								buildElement={(a) => (
									<div className="col-md-12">
										<Company
											info={a}
										/>
									</div>
								)}
								numberDisplayed={5}
							/>
						</div>
					</div>
					: <Loading
						height={200}
					/>
				}

				<div className="row">
					<div className="col-md-12">
						<h1>Media</h1>
					</div>
				</div>

				{this.state.media !== null
					? <div className="row">
						<div className={"col-md-12"}>
							<Table
								className={""}
								elements={this.state.media.map((a, i) => [a, i])}
								buildElement={(a) => (
									<div className="col-md-12">
										<Company
											info={a}
										/>
									</div>
								)}
								numberDisplayed={3}
							/>
						</div>
					</div>
					: <Loading
						height={200}
					/>
				}

				<div className="row">
					<div className="col-md-12">
						<h1>Job platforms</h1>
					</div>
				</div>

				{this.state.jobPlatforms !== null
					? <div className="row row-spaced">
						<div className={"col-md-12"}>
							<Table
								className={""}
								elements={this.state.jobPlatforms.map((a, i) => [a, i])}
								buildElement={(a) => (
									<div className="col-md-12">
										<Company
											info={a}
										/>
									</div>
								)}
								numberDisplayed={3}
							/>
						</div>
					</div>
					: <Loading
						height={200}
					/>
				}
			</div>
		);
	}
}
