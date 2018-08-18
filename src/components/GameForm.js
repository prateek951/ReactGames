import React, { Component } from "react";

export default class GameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: 0,
      duration: 0,
      players: ""
    };
    this.bindEvents();
  }
  bindEvents() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.type==="number"? parseInt(e.target.value,10) : e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    // console.log({
    //     title : this.name.value
    // });
    const { name } = this.state;
    console.log(name);
  }

  render() {
    const { name, description, price, duration, players } = this.state;
    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="name">Game Title</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full Game Title"
            //   ref={input => this.name = input}
            value={name}
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="description">Game Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Full Game Description"
            cols="30"
            rows="10"
            value={description}
            onChange={this.handleChange}
          />
        </div>

        <div className="three fields"> 
          <div className="field">
            <label htmlFor="price">Price (cents)</label>
            <input type="number" id="price" name="price" placeholder="Full Game Price" value={price} onChange={this.handleChange} />
          </div>
          <div className="field">
            <label htmlFor="duration">Full Game Duration</label>
            <input type="number" id="duration" name="duration" placeholder="Full Game Duration" value={duration} onChange={this.handleChange} />
          </div>
          <div className="field">
            <label htmlFor="players">Maximum Players</label>
            <input type="text" id="players" name="players" placeholder="Maximum Players" value={players} onChange={this.handleChange} />
          </div>
        </div>

        <button className="ui button" type="submit">
          Create
        </button>
      </form>
    );
  }
}
