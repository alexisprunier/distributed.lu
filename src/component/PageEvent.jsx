import React from "react";
import "./PageEvent.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Collapsible from "react-collapsible";
import { getRequest } from "../utils/request.jsx";
import { getApiURL } from "../utils/env.jsx";
import Loading from "./box/Loading.jsx";
import Chip from "./form/Chip.jsx";
import { getContentFromBlock, getNextTitle1Position } from "../utils/article.jsx";

export default class PageEvent extends React.Component {
	constructor(props) {
		super(props);

		this.getArticleContent = this.getArticleContent.bind(this);

		this.state = {
			article: null,
			articleLoading: false,
		};
	}

	componentDidMount() {
		this.getArticleContent();
	}

	getArticleContent() {
		this.setState({
			article: null,
			articleLoading: false,
		});

		getRequest.call(this, "public/get_article_content/" + this.props.match.params.handle, (data) => {
			this.setState({
				article: data,
				articleLoading: false,
			});
		}, (response) => {
			this.setState({ loading: false });
			nm.warning(response.statusText);
		}, (error) => {
			this.setState({ loading: false });
			nm.error(error.message);
		});
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		let positionToTreat = 0;

		return (
			<div className={"PageEvent page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">DISTRIBUTED.LU</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/calendar">CALENDAR</Link></Breadcrumb.Item>
							{this.state.article !== null && !this.state.loading
								? <Breadcrumb.Item><Link to={"/calendar/" + this.state.article.handle}>{this.state.article.title}</Link></Breadcrumb.Item>
								: ""}
						</Breadcrumb>
					</div>
				</div>

				{this.state.article !== null && this.state.article.content !== undefined
					&& !this.state.articleLoading
					? <div className="row row-spaced">
						<div className="col-md-12">
							<article>
								<div className='PageEvent-content-cover'>
									{this.state.article.image !== null
										? <img src={getApiURL() + "public/get_public_image/" + this.state.article.image}/>
										: ""}
									{this.state.article.start_date !== null && this.state.article.end_date !== null
										&& this.state.article.start_date !== undefined
										&& this.state.article.end_date !== undefined
										? <div className='PageEvent-publication-date'>
											<div>
												{this.state.article.start_date.substring(0, 10)
												+ " "
												+ this.state.article.start_date.substring(11, 16)}
												<br/>
												{this.state.article.end_date.substring(0, 10)
												+ " "
												+ this.state.article.end_date.substring(11, 16)}
											</div>
										</div>
										: ""}
								</div>

								<div className="PageEvent-tags">
									{this.state.article.tags !== undefined
										&& this.state.article.tags.map((t) => (
											<Chip
												key={t.name}
												label={t.name}
											/>
										))
									}
								</div>

								<div className="PageEvent-companies">
									{this.state.article.entities !== undefined
										&& this.state.article.entities.map((t) => (
											<Chip
												key={t.name}
												label={t.name}
												color={"#E40613"}
											/>
										))
									}
								</div>

								<h1 className="showFulltext">
									{this.state.article.title}
								</h1>

								<div className={"right-buttons"}>
									{this.state.article.link !== null
										&& <button
											className={"blue-background"}
											onClick={() => window.open(this.state.article.link, "_blank")}
										>
											Open source
										</button>
									}
								</div>

								{this.state.article.content.map((b, i) => {
									if (positionToTreat <= i) {
										if (b.type === "TITLE1") {
											const nextTitle1Position = getNextTitle1Position(
												i + 1, this.state.article.content,
											);

											const el = <Collapsible trigger={getContentFromBlock(b)}>
												{this.state.article.content
													.slice(positionToTreat + 1, nextTitle1Position - 1)
													.map((b2) => getContentFromBlock(b2))}
											</Collapsible>;

											positionToTreat = nextTitle1Position - 1;

											return el;
										}
										positionToTreat += 1;
										return getContentFromBlock(b);
									}
									return null;
								})}

								<div className="PageEvent-tags">
									{this.state.article.tags !== undefined
										&& this.state.article.tags.map((t) => (
											<Chip
												key={t.name}
												label={t.name}
											/>
										))
									}
								</div>

								<div className="PageEvent-companies">
									{this.state.article.entities !== undefined
										&& this.state.article.entities.map((t) => (
											<Chip
												key={t.name}
												label={t.name}
												color={"#e40613"}
											/>
										))
									}
								</div>
							</article>
						</div>
					</div>
					: <Loading
						height={300}
					/>
				}
			</div>
		);
	}
}
