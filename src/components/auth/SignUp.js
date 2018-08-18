import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      confirmpass: ""
    };
    this.bindEvents();
  }
  bindEvents() {
    this.handleReg = this.handleReg.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleReg(e) {
    e.preventDefault();
    console.log("inside the handleReg method");
    console.log(this.state);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { email, pass, cpass } = this.state;
    return (
      <form className="ui form" onSubmit={this.handleReg}>
        <div className="ui grid">
          <div className="twelve wide column">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email Address"
                //   ref={input => this.name = input}
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                id="pass"
                name="pass"
                placeholder="Make it secure"
                value={pass}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="cpass">Confirm Password</label>
              <input
                type="password"
                name="cpass"
                id="cpass"
                placeholder="Make it secure"
                value={cpass}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui fluid buttons">
              <button className="ui primary button" type="submit">
                Sign Up
              </button>
              <div className="or" />
              <a className="ui button">Cancel</a>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
