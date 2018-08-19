import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Games from "./Games";
import ShowGamePage from "./components/ShowGamePage";

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <Header />
        <Route path="/" exact component={HomePage} />
        <Route path="/games" exact component={Games} />
        <Route path="/games/:_id" component={ShowGamePage} />
      </div>
    );
  }
}

export default App;
