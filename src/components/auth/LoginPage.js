import React, { Component } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import Login from "./Login";

class LoginPage extends Component {
  doLogin = data =>
    api.users.login(data).then(token => {
      this.props.login(token);
      this.props.history.push("/games");
    });

  render() {
    return (
      <div>
        <Login doLogin={this.doLogin} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
};

export default LoginPage;
