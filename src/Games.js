import React, { Component } from "react";
import _orderBy from "lodash/orderBy";
import _find from "lodash/find";
import "./App.css";
import Header from "./components/Header";
import GamesList from "./components/GamesList";
import GameForm from "./components/GameForm";
import api from "./api";
// import SignUp from "./components/auth/SignUp";
// import Login from "./components/auth/Login";

const publishers = [
  { _id: "1", name: "Days of Wonder" },
  { _id: "2", name: "Musical Harmonies" }
];

// const games = [];
class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      showGameForm: false,
      selectedGame: {},
      loading: true
    };
    this.bindEvents();
  }
  bindEvents() {
    this.toggleFeatured = this.toggleFeatured.bind(this);
    this.showGameForm = this.showGameForm.bind(this);
    this.hideGameForm = this.hideGameForm.bind(this);
    // this.handleAdd = this.handleAdd.bind(this);
    this.editGame = this.editGame.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
  }
  componentDidMount() {
    // setTimeout(() => {
      // Sorting the games collection by the name
      api.games.fetchAll().then(games => this.setState({ games:  this.sortGames(games) ,loading: false}));
      console.log(this.state.games);
    // }, 2000);
  }
  deleteGame(game) {
    api.games.delete(game).then(() =>
      this.setState({
        games: this.state.games.filter(item => game._id !== item._id),
        showGameForm: false
      })
    );
  }
  editGame(game) {
    this.setState({ selectedGame: game, showGameForm: true });
  }
  handleSave = game =>
    game._id ? this.updateGame(game) : this.handleAdd(game);

  updateGame = gameData =>
    api.games.update(gameData).then(ugame => {
      this.setState({
        games: this.sortGames(
          this.state.games.map(item => (item._id === ugame._id ? ugame : item))
        ),
        showGameForm: false
      });
    });

  handleAdd = gameData =>
    api.games.create(gameData).then(game => {
      this.setState({
        games: this.sortGames([...this.state.games, game]),
        showGameForm: false
      });
    });

  sortGames(games) {
    return _orderBy(games, ["featured", "name"], ["desc", "asc"]);
  }
  showGameForm() {
    this.setState({ showGameForm: true, selectedGame: {} });
  }
  hideGameForm() {
    this.setState({ showGameForm: false, selectedGame: {} });
  }
  toggleFeatured(gameId) {
    const game = _find(this.state.games, { _id: gameId });
    return this.updateGame({ ...game, featured: !game.featured });
  }

  render() {
    const { games, showGameForm, selectedGame, loading } = this.state;
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
                handleAdd={this.handleSave}
                gameForEdit={selectedGame}
              />
            </div>
          )}
          <div className={`${noc} wide column`}>
            {loading ? (
              <div className="ui icon message">
                <i className="notched circle loading icon" />
                <div className="content">
                  <div className="header">Wait a second...</div>
                  <p>Loading games collection..</p>
                </div>
              </div>
            ) : (
              <GamesList
                games={games}
                toggleFeatured={this.toggleFeatured}
                editGame={this.editGame}
                deleteGame={this.deleteGame}
              />
            )}
          </div>
        </div>
        {/* <SignUp/> */}
        {/* <Login/> */}
        <br />
      </div>
    );
  }
}

export default Games;
