import React from "react";
import PropTypes from 'prop-types'

const Header = props => {
  const { showGameForm } = props;
  return (
    <div className="ui secondary pointing menu">
      <a href="/" className="item">
        ReactGames
      </a>
      <a className="item" onClick={showGameForm}>
        <i className="icon plus" /> Add New Game
      </a>
    </div>
  );
};

Header.propTypes = {
    showGameForm : PropTypes.func.isRequired
}

export default Header;
