import React, { Component } from "react";

const tags = [
  { _id: 1, name: "dice" },
  { _id: 2, name: "economic" },
  { _id: 3, name: "family" }
];

export default class GameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: 0,
      duration: 0,
      players: "",
      featured: false,
      tags: []
    };
    this.bindEvents();
  }
  bindEvents() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleStringChange = this.handleStringChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }
  handleNumberChange(e) {
    this.setState({
      [e.target.name]: parseInt(e.target.value)
    });
  }
  handleStringChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleCheckboxChange(e) {
    this.setState({
      [e.target.name]: e.target.checked
    });
  }
  toggleTag = tag => {
    this.state.tags.includes(tag._id)
      ? this.setState({
          tags: this.state.tags.filter(id => id !== tag._id)
        })
      : this.setState({
          tags: [...this.state.tags, tag._id]
        });
  };
  handleSubmit(e) {
    e.preventDefault();
    // console.log({
    //     title : this.name.value
    // });
    const { tags } = this.state;
    console.log(tags);
  }

  render() {
    const {
      name,
      description,
      price,
      duration,
      players,
      featured
    } = this.state;
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
            onChange={this.handleStringChange}
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
            onChange={this.handleStringChange}
          />
        </div>

        <div className="three fields">
          <div className="field">
            <label htmlFor="price">Price (cents)</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Full Game Price"
              value={price}
              onChange={this.handleNumberChange}
            />
          </div>
          <div className="field">
            <label htmlFor="duration">Full Game Duration</label>
            <input
              type="number"
              id="duration"
              name="duration"
              placeholder="Full Game Duration"
              value={duration}
              onChange={this.handleNumberChange}
            />
          </div>
          <div className="field">
            <label htmlFor="players">Maximum Players</label>
            <input
              type="text"
              id="players"
              name="players"
              placeholder="Maximum Players"
              value={players}
              onChange={this.handleStringChange}
            />
          </div>
        </div>
        <div className="inline field">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={featured}
            onChange={this.handleCheckboxChange}
          />
          <label htmlFor="featured">Featured?</label>
        </div>

        <div className="field">
          <label htmlFor="">Tags</label>
          {tags.map(tag => (
            <div key={tag._id} className="inline field">
              <input
                type="checkbox"
                id={`tag-${tag._id}`}
                checked={this.state.tags.includes(tag._id)}
                onChange={() => this.toggleTag(tag)}
              />
              <label htmlFor={`tag-${tag._id}`}>{tag.name}</label>
            </div>
          ))}
        </div>

        <button className="ui button" type="submit">
          Create
        </button>
      </form>
    );
  }
}
