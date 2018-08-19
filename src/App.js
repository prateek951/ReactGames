import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <Header />
        <Route path="/" exact component={HomePage} />
      </div>
    );
  }
}

export default App;
