import React from "react";
import PropTypes from "prop-types";
const RSS = ({name, url}) => (
    <div className="rss-name">
		<h4><a href={url}> {name} </a></h4>
	</div>
);

RSS.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
export default RSS;
