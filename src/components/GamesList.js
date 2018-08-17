import React, { Component } from "react";
import GameCard from "./GameCard";
import PropTypes from "prop-types";

class GamesList extends Component {
  render() {
    const { games } = this.props;
    return (
      <div className="ui four cards">
        {games.map(game => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>
    );
  }
}

GamesList.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default GamesList;
