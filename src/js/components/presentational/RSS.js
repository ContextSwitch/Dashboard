import React from "react";
import PropTypes from "prop-types";
const RSS = ({ label, text, type, id, value, handleChange }) => (
  <div className="rss-container">
      <span className="rss-name">{value}</span>
  </div>
);
RSS.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
export default RSS;
