import React, { Component } from "react";
import GameCard from "./GameCard";
import PropTypes from "prop-types";

class GamesList extends Component {
  render() {
    const { games, toggleFeatured, editGame, deleteGame } = this.props;
    return (
      <div className="ui four cards">
        {games.length !== 0 ? (
          games.map(game => (
            <GameCard
              key={game._id}
              game={game}
              toggleFeatured={toggleFeatured}
              editGame={editGame}
              deleteGame={deleteGame}
            />
          ))
        ) : (
          <div className="ui icon message">
            <i className="icon info" />
            <div className="content">
              <div className="header">There are no games in your store.</div>
              <p>You should add some, don't you think so?</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

GamesList.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  editGame: PropTypes.func.isRequired,
  deleteGame : PropTypes.func.isRequired
};
GamesList.defaultProps = {
  games: []
};
export default GamesList;
