import React, { Component } from "react";
import "./Company.css";
import { Link } from "react-router-dom";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";

export default class Company extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<Link to={"/network/" + this.props.info.id} className="Company-link">
				<div className="Company card">
					<div className="card-horizontal">
						{this.props.info.image !== null && this.props.info.image !== undefined
							? <div className="img-square-wrapper img-square-wrapper-white">
								<img
									className="card-img-top"
									src={getApiURL() + "public/get_public_image/" + this.props.info.image}
									alt="Card image cap"/>
							</div>
							: <div className="img-square-wrapper">
								<NoImage/>
							</div>
						}
						<div className="card-body">
							<h5 className="card-title">{this.props.info.name}</h5>
						</div>
					</div>
				</div>
			</Link>
		);
	}
}
