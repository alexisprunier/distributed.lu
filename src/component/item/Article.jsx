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

	render() {
		return (
			<a href={this.props.info.link} target="_blank" rel="noreferrer" className="Article-link">
				<div className="Article card">
					<div className="card-img-wrapper">
						{this.props.info.image && this.props.info.image
							? <img
								className="card-img-top"
								src={getApiURL() + "public/get_public_image/" + this.props.info.image}
								alt="Card image cap"/>
							: <NoImage
								height={250}
							/>
						}
						<div className="card-date">{this.props.info.publication_date.split("T")[0]}</div>
						<div className="card-type">{this.props.info.type}</div>
					</div>
					<div className="card-body">
						<div className="card-title">{this.props.info.title}</div>
						<div className={"right-buttons"}>
							<button
								className={"blue-background"}
							>
								Read &gt;&gt;
							</button>
						</div>
					</div>
				</div>
			</a>
		);
	}
}
