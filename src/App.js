import React, { Component } from "react";
import _orderBy from "lodash/orderBy";
import "./App.css";
import GamesList from "./components/GamesList";

//Setting constant for games

const games = [
  {
    _id: 1,
    featured: false,
    price: 3299,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsq9_oFU7DnOrvNFUvMR4p73gIWWBavSrRaK7WC8j-QUVpoy0WUQ",
    name: "Quadropolis",
    players: "2-4",
    duration: 60
  },
  {
    _id: 2,
    featured: true,
    price: 4399,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS790uv29JCPz_5xkKrqj7hfQ9lo4KNGgxZYofy0SLpwguKRn9D0Q",
    name: "Roll For The Galaxy",
    players: "2-5",
    duration: 45
  }
];

class App extends Component {
  state = {
    games: []
  };
  componentDidMount() {
    // Sorting the games collection by the name
    this.setState({ games: _orderBy(games, ["featured","name"],["desc","asc"]) });
  }

  render() {
    const { games } = this.state;
    return (
      <div className="App">
        <GamesList games={games} />
      </div>
    );
  }
}

export default App;
