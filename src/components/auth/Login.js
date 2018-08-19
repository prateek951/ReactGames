import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import isEmail from "validator/lib/isEmail";
import FormInlineMessage from "../FormInlineMessage";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        pass: ""
      },
      loading: false,
      errors: {}
    };
  }
  handleStringChange = e => {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value }
    });
  };

  validate = data => {
    const errors = {};
    //Pull out the email,pass from the data and perform validation
    const { email, pass } = data;
    if (!isEmail(email)) errors.email = "Invalid email address";
    if (!email) errors.email = "This field can't be blank";
    if (!pass) errors.pass = "This field can't be blank";
    return errors;
  };

  handleLogin = e => {
    e.preventDefault();
    //check for errors
    const errors = this.validate(this.state.user);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      //if there are no errors perform the registration
      this.setState({ loading: true });
      this.props
        .doLogin(this.state.user)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  render() {
    const { errors, user, loading } = this.state;
    const classes = loading ? "ui form loading" : "ui form";
    return (
      <form className={classes} onSubmit={this.handleLogin}>
        <div className="ui grid">
          <div className="twelve wide column">
            <div className={errors.email ? "field error" : "field"}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email Address"
                //   ref={input => this.name = input}
                value={user.email}
                onChange={this.handleStringChange}
              />
              <FormInlineMessage content={errors.email} type="error" />
            </div>
            <div className={errors.pass ? "field error" : "field"}>
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                id="pass"
                name="pass"
                placeholder="Make it secure"
                value={user.pass}
                onChange={this.handleStringChange}
              />
              <FormInlineMessage content={errors.pass} type="error" />
            </div>
            <div className="ui fluid buttons">
              <button className="ui primary button" type="submit">
                Login
              </button>
              <div className="or" />
              <Link to="/" className="ui button">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  doLogin: PropTypes.func.isRequired
};

export default Login;
