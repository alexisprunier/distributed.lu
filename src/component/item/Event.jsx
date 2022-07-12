import React, { Component } from "react";
import "./Event.css";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";

export default class Event extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<a href={this.props.info.link} target="_blank" rel="noreferrer" className="Event-link">
				<div className="Event card">
					<div className="card-img-wrapper">
						{this.props.info.image !== null && this.props.info.image !== undefined
							? <img
								className="card-img-top"
								src={getApiURL() + "public/get_public_image/" + this.props.info.image}
								alt="Card image cap"/>
							: <NoImage
								height={150}
							/>
						}
						<div className="card-date">
							{this.props.info.start_date !== null && this.props.info.end_date !== null
								? <div>
									{this.props.info.start_date.substring(0, 10)
									+ " "
									+ this.props.info.start_date.substring(11, 16)}
									<br/>
									{this.props.info.end_date.substring(0, 10)
									+ " "
									+ this.props.info.end_date.substring(11, 16)}
								</div>
								: "No info"
							}
						</div>
						<div className="card-type">{this.props.info.type}</div>
					</div>
					<div className="card-body">
						<div className="card-title">{this.props.info.title}</div>
						<p className="card-text">{this.props.info.abstract}</p>
						<div className={"right-buttons"}>
							<button className={"blue-background"}>
								Know more &gt;&gt;
							</button>
						</div>
					</div>
				</div>
			</a>
		);
	}
}
