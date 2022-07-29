import React from "react";
import "./PageTraining.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Loading from "./box/Loading.jsx";
import { getRequest } from "../utils/request.jsx";
import Article from "./item/Article.jsx";
import Message from "./box/Message.jsx";
import { dictToURI } from "../utils/url.jsx";

export default class PageTraining extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			trainings: null,
		};
	}

	componentDidMount() {
		this.trainings();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.taxonomy && this.props.taxonomy) {
			this.trainings();
		}
	}

	trainings(page) {
		if (this.props.taxonomy) {
			this.setState({
				trainings: null,
			});

			const params = dictToURI({
				type: "SERVICE",
				taxonomy_values: this.props.taxonomy.taxonomy_values
					.filter((v) => v.category === "SERVICE CATEGORY" && v.name === "TRAINING")
					.map((v) => v.id),
				per_page: 50,
				page: page || 1,
			});

			getRequest.call(this, "public/get_public_articles?" + params, (data) => {
				this.setState({
					trainings: data,
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
							<Breadcrumb.Item><Link to="/training">TRAININGS</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h1>Trainings</h1>
					</div>
				</div>

				{this.state.trainings && this.state.trainings.pagination.total === 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Message
								text={"No training found :("}
								height={200}
							/>
						</div>
					</div>
				}

				<div className="row row-spaced">
					{this.state.trainings && this.state.trainings.pagination.total > 0
						&& this.state.trainings.items.map((t) => (
							<div className="col-md-6" key={t.id}>
								<Article
									info={t}
									showImage={true}
									showType={true}
								/>
							</div>
						))
					}
				</div>

				{!this.state.trainings
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
