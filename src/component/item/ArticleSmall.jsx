import React, { Component } from "react";
import "./ArticleSmall.css";

export default class ArticleSmall extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<a href={this.props.info.link} target="_blank" rel="noreferrer" className="ArticleSmall-link">
				<div className="ArticleSmall">
					<div className={"ArticleSmall-name"}>
						{this.props.info.publication_date.split("T")[0]} - {this.props.info.title}
					</div>
				</div>
			</a>
		);
	}
}
