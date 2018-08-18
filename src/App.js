import React, { Component } from "react";
import _orderBy from "lodash/orderBy";
import "./App.css";
import Header from "./components/Header";
import GamesList from "./components/GamesList";
import GameForm from "./components/GameForm";
// import SignUp from "./components/auth/SignUp";
// import Login from "./components/auth/Login";

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
      games: [],
      showGameForm: false
    };
    this.bindEvents();
  }
  bindEvents() {
    this.toggleFeatured = this.toggleFeatured.bind(this);
    this.showGameForm = this.showGameForm.bind(this);
    this.hideGameForm = this.hideGameForm.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  componentDidMount() {
    // Sorting the games collection by the name
    this.setState({
      games: this.sortGames(games)
    });
  }
  handleAdd(game) {
    this.setState({
      games: this.sortGames([
        ...this.state.games,
        { ...game, _id: this.state.games.length + 1 }
      ]),
      showGameForm: false
    });
  }
  sortGames(games) {
    return _orderBy(games, ["featured", "name"], ["desc", "asc"]);
  }
  showGameForm() {
    this.setState({ showGameForm: true });
  }
  hideGameForm() {
    this.setState({ showGameForm: false });
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
    const { games, showGameForm } = this.state;
    const noc = showGameForm ? "ten" : "sixteen";
    return (
      <div className="ui container">
        <Header showGameForm={this.showGameForm} />
        <div className="ui stackable grid">
          {showGameForm && (
            <div className="six wide column">
              <GameForm
                publishers={publishers}
                hideGameForm={this.hideGameForm}
                handleAdd={this.handleAdd}
              />
            </div>
          )}
          <div className={`${noc} wide column`}>
            <GamesList games={games} toggleFeatured={this.toggleFeatured} />
          </div>
        </div>
        {/* <SignUp/> */}
        {/* <Login/> */}
        <br />
      </div>
    );
  }
}

export default App;
