import React from "react";
import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";

class Header extends React.Component {
  onLogout = () => {
    this.props.doLogout();
  };
  render() {
    const { isAuthenticated, isAdmin } = this.props;
    return (
      <div>
        {!isAuthenticated ? (
          <div className="ui secondary pointing menu">
            <NavLink exact to="/" className="item">
              ReactGames
            </NavLink>
            <NavLink exact to="/games" className="item">
              <i className="icon game" /> Games
            </NavLink>
            <div className="right menu">
              <NavLink className="item" to="/register">
                Sign Up
              </NavLink>
              <NavLink className="item" to="/login">
                Login
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="ui secondary pointing menu">
            {isAdmin && (<NavLink exact to="/games/create" className="item">
              <i className="icon plus" /> Add New Game
            </NavLink>)}
            <div className="right menu">
              <Link to="/login" className="item" onClick={this.onLogout}>
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  doLogout: PropTypes.func.isRequired
};

export default Header;
