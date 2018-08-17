import React, { Component } from "react";
import GameCard from "./GameCard";

export default class GamesList extends Component {
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
