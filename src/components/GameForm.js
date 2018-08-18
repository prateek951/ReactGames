import React, { Component } from "react";

export default class GameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.bindEvents();
  }
  bindEvents() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.id] : e.target.value});
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
    const { name } = this.state;
    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="name">Game Title</label>
          <input
            type="text"
            id="name"
            placeholder="Full Game Title"
            //   ref={input => this.name = input}
            value={name}
            onChange={this.handleChange}
          />
        </div>
        <button className="ui button" type="submit">
          Create
        </button>
      </form>
    );
  }
}
