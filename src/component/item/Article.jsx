import React, { Component } from "react";
import "./Article.css";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";

export default class Article extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	getImage() {
		if (this.props.info.image) {
			return <img
				className="card-img-top"
				src={getApiURL() + "public/get_public_image/" + this.props.info.image}
				alt="Card image cap"
			/>;
		}

		if (this.props.entities) {
			for (let i = 0; i < this.props.entities.length; i++) {
				if (this.props.entities[i].image) {
					return <img
						className="card-img-top"
						src={getApiURL()
							+ "public/get_public_image/"
							+ this.props.entities[i].image}
						alt="Card image cap"
					/>;
				}
			}
		}

		return <NoImage
			height={250}
		/>;
	}

	getArticleTimeContent() {
		if (this.props.info.start_date && this.props.info.end_date) {
			return (<div className="card-date">
				{this.props.info.start_date.substring(0, 10)
				+ " "
				+ this.props.info.start_date.substring(11, 16)}
				<br/>
				{this.props.info.end_date.substring(0, 10)
				+ " "
				+ this.props.info.end_date.substring(11, 16)}
			</div>);
		}

		return "No info";
	}

	render() {
		return (
			<a href={this.props.info.link} target="_blank" rel="noreferrer" className="Article-link">
				<div className="Article card">
					{this.props.showImage
						&& <div className="card-img-wrapper">
							{this.getImage()}

							{this.props.showDate
								&& <div className="card-date">{this.props.info.publication_date.split("T")[0]}</div>
							}

							{this.props.showTime
								&& this.getArticleTimeContent()
							}

							{this.props.showType
								&& <div className="card-type">{this.props.info.type}</div>
							}
						</div>
					}

					<div className="card-body">
						<div className="card-title">{this.props.info.title}</div>
					</div>
				</div>
			</a>
		);
	}
}
