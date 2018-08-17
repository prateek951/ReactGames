import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Featured = ({ featured }) => {
  return (
    <a
      className={classnames("ui right corner label", {
        yellow: featured == true
      })}
    >
      <i
        className={classnames("star icon", {
          full: featured == false
        })}
      />
    </a>
  );
};

Featured.propTypes = {
  featured: PropTypes.bool.isRequired
};

export default Featured;
