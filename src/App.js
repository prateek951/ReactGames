import React, { Component } from "react";
import "./App.css";
import GamesList from "./components/GamesList";

//Setting constant for games

const games = [
  {
    _id: 1,
    price: 3299,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsq9_oFU7DnOrvNFUvMR4p73gIWWBavSrRaK7WC8j-QUVpoy0WUQ",
    name: "Quadropolis",
    players: "2-4",
    duration: 60
  },
  {
    _id: 2,
    price: 4399,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS790uv29JCPz_5xkKrqj7hfQ9lo4KNGgxZYofy0SLpwguKRn9D0Q",
    name: "Roll For The Galaxy",
    players: "2-5",
    duration: 60
  }
];

class App extends Component {
  state = {
    games: []
  };
  componentDidMount() {
    this.setState({ games });
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
