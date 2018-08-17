import React, { Component } from "react";
import "./App.css";
import GamesList from "./components/GamesList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [
        { _id : 1,
          price: 32.99,
          thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsq9_oFU7DnOrvNFUvMR4p73gIWWBavSrRaK7WC8j-QUVpoy0WUQ",
          name: "Quadropolis",
          players: "2-4",
          duration: 60
        },
        { _id : 2,
          price: 33.99,
          thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS790uv29JCPz_5xkKrqj7hfQ9lo4KNGgxZYofy0SLpwguKRn9D0Q",
          name: "Roll For The Galaxy",
          players: "2-5",
          duration: 60
        }
      ]
    };
  }
  render() {
    const { games } = this.state;
    return (
      <div className="App">
          <GamesList games={games}/>
      </div>
    );
  }
}

export default App;
