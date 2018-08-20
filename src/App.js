import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Games from "./Games";
import ShowGamePage from "./components/ShowGamePage";
import SignUpPage from "./components/auth/SignUpPage";
import LoginPage from "./components/auth/LoginPage";
import Axios from "axios";

const setAuthorizationHeader = (token = null) => {
  if (token) {
    Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete Axios.defaults.headers.common.Authorization;
  }
};

class App extends Component {
  state = {
    user: {
      token: null
    },
    message: ""
  };
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({
        user: { token: JSON.parse(localStorage.getItem("token")) }
      });
      setAuthorizationHeader(localStorage.token);
    }
  }

  login = token => {
    // Three things to do
    // Set the token to the state
    this.setState({ user: { token: token } });
    // Set the token to the localStorage
    localStorage.setItem("token", JSON.stringify(token));
    // Add authorisation header to the token
    setAuthorizationHeader(token);
  };
  doLogout = () => {
    //Remove the token from the state
    this.setState({ user: { token: null } });
    setAuthorizationHeader();
    //Remove the token from the localStorage
    localStorage.removeItem("token");
  };
  setMessage = message => this.setState({ message });
  render() {
    const { token } = this.state.user;
    const { message } = this.state;
    return (
      <div className="ui container">
        <Header isAuthenticated={!!token} doLogout={this.doLogout} />
        <br />
        {message && (
          <div className="ui info message">
            <i className="close icon" onClick={() => this.setMessage("")} />
            {message}
          </div>
        )}
        <Route path="/" exact component={HomePage} />
        <Route
          path="/register"
          render={props => (
            <SignUpPage {...props} setMessage={this.setMessage} />
          )}
        />
        <Route path="/games" render={props => <Games {...props} user={this.state.user}/>} />
        <Route path="/games/:_id" component={ShowGamePage} />
        <Route
          path="/login"
          render={props => <LoginPage {...props} login={this.login} />}
        />
      </div>
    );
  }
}

export default App;
