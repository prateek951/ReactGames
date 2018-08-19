import React, { Component } from "react";
import api from "../../api";
import Login from "./Login";

class LoginPage extends Component {
  doLogin = data => api.users.login(data).then(token => console.log(token));

  render() {
    return (
      <div>
        <Login doLogin={this.doLogin} />
      </div>
    );
  }
}

export default LoginPage;
