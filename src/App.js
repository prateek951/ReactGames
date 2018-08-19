import React, { Component } from "react";
import _orderBy from "lodash/orderBy";
import "./App.css";
import Header from "./components/Header";
import GamesList from "./components/GamesList";
import GameForm from "./components/GameForm";
import api from "./api";
// import SignUp from "./components/auth/SignUp";
// import Login from "./components/auth/Login";

const publishers = [
  { _id: '1', name: "Days of Wonder" },
  { _id: '2', name: "Musical Harmonies" }
];

const games = [];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      showGameForm: false,
      selectedGame: {}
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
    // Sorting the games collection by the name
    api.games.fetchAll().then(games => this.setState({ games }));
    console.log(this.state.games);
  }
  deleteGame(game) {
    this.setState({
      games: this.state.games.filter(item => item._id !== game._id)
    });
  }
  editGame(game) {
    this.setState({ selectedGame: game, showGameForm: true });
  }
  handleSave = game =>
    game._id ? this.updateGame(game) : this.handleAdd(game);

  updateGame = game => {
    this.setState({
      games: this.sortGames(
        this.state.games.map(item => (item._id === game._id ? game : item))
      ),
      showGameForm: false
    });
  };

  handleAdd = (gameData) => 
    api.games.create(gameData).then(game => {
      this.setState({
        games: this.sortGames([...this.state.games,game]),
        showGameForm: false
      })
    })

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
    const { games, showGameForm, selectedGame } = this.state;
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
            <GamesList
              games={games}
              toggleFeatured={this.toggleFeatured}
              editGame={this.editGame}
              deleteGame={this.deleteGame}
            />
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
