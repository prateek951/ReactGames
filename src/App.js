import React, { Component } from "react";
import _orderBy from "lodash/orderBy";
import "./App.css";
import GamesList from "./components/GamesList";
import GameForm from "./components/GameForm";

const publishers = [
  { _id: 1, name: "Days of Wonder" },
  { _id: 2, name: "Musical Harmonies" }
];

const games = [
  {
    _id: 1,
    publisher: 1,
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
    publisher: 2,
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
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
    this.bindEvents();
  }
  bindEvents() {
    this.toggleFeatured = this.toggleFeatured.bind(this);
  }
  componentDidMount() {
    // Sorting the games collection by the name
    this.setState({
      games: this.sortGames(games)
    });
  }
  sortGames(games) {
    return _orderBy(games, ["featured", "name"], ["desc", "asc"]);
  }
  toggleFeatured(gameId) {
    const newGames = this.state.games.map(game => {
      if (game._id === gameId) {
        return {
          ...game,
          featured: !game.featured
        };
      }
      return game;
    });
    this.setState({ games: this.sortGames(newGames) });
  }

  render() {
    const { games } = this.state;
    return (
      <div className="ui container">
        <GameForm publishers={publishers}/>
        <br />
        <GamesList games={games} toggleFeatured={this.toggleFeatured} />
      </div>
    );
  }
}

export default App;
