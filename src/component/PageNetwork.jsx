import React from "react";
import "./PageNetwork.css";
import Graph from "react-graph-vis";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../utils/request.jsx";
import Loading from "./box/Loading.jsx";

export default class PageNetwork extends React.Component {
	constructor(props) {
		super(props);

		this.getCompanies = this.getCompanies.bind(this);
		this.filterCompaniesByRole = this.filterCompaniesByRole.bind(this);

		this.state = {
			companies: null,
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
			companies: null,
		});

		getRequest.call(this, "public/get_public_entities", (data) => {
			this.setState({
				companies: data,
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
			.filter((a) => a.taxonomy_value_id === value.id)
			.map((a) => a.entity_id);

		return companies
			.filter((c) => concernedCompanyIds.indexOf(c.id) >= 0);
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	getGraphData() {
		if (!this.props.taxonomy || !this.state.companies) {
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

		const ecosystemRoleValueIds = roleNodes.map((n) => (n.id));

		const companyNodes = this.props.taxonomy.taxonomy_assignments
			.filter((a) => ecosystemRoleValueIds.indexOf(a.taxonomy_value) >= 0)
			.map((a, i) => ({
				id: 1000000 + i,
				label: this.state.companies.filter((c) => c.id === a.entity_id)[0].name,
				company_id: a.entity_id,
				value_id: a.taxonomy_value_id,
				color: { border: "white", background: "#26282b" },
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
				...companyNodes,
			],
			edges: [
				...roleNodes.map((r) => ({ from: -1, to: r.id, color: { color: "white" } })),
				...companyNodes.map((c) => ({ from: c.value_id, to: c.id, color: { color: "white" } })),
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
			height: "500px",
		};

		const events = {
			/* select: function(event) {
				var { nodes, edges } = event;
			} */
		};

		return (
			<div className={"PageNetwork page max-sized-page"}>
				{this.state.companies && this.props.taxonomy
					? <div className="row">
						<div className={"col-md-12"}>
							<Graph
								graph={this.getGraphData()}
								options={options}
								events={events}
							/>
						</div>
					</div>
					: <Loading
						height={400}
					/>
				}
			</div>
		);
	}
}
