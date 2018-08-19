import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Games from "./Games";
import ShowGamePage from "./components/ShowGamePage";
import SignUpPage from "./components/auth/SignUpPage";

class App extends Component {
  state = {
    user: {
      token: null
    },
    message: ""
  };
  doLogout = () => {
    this.setState({ user: { token: null } });
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
        <Route path="/register" render={props => <SignUpPage {...props} setMessage={this.setMessage}/>}/>  
        <Route path="/games" component={Games} />
        <Route path="/games/:_id" component={ShowGamePage}/>
      </div>
    );
  }
}

export default App;
