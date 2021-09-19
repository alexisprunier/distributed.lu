import React, { Component } from "react";
import "./ArticleSmall.css";
import { Link } from "react-router-dom";

export default class ArticleSmall extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<Link to={"/news/" + this.props.info.handle} className="ArticleSmall-link">
				<div className="ArticleSmall">
					<div className={"ArticleSmall-name"}>
						{this.props.info.publication_date} - {this.props.info.title}
					</div>
				</div>
			</Link>
		);
	}
}
