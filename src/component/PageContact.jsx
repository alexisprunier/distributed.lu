import React from "react";
import "./PageContact.css";

export default class PageContact extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div id={"PageContact"} className={"page max-sized-page"}>
				<div className={"row row-spaced"}>
					<div className="col-md-12">
						{this.state.text}
						Coming soon
					</div>
				</div>
			</div>
		);
	}
}
