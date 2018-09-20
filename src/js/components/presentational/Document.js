import React from "react";
import PropTypes from "prop-types";
const Document = ({name, url}) => (
        <div className="document-name">
            <h4><a href={url}> {name} </a></h4>
        </div>
);

Document.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
export default Document;
