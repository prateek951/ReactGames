import React, { Component } from "react";
import api from "../../api";
import PropTypes from 'prop-types'
import SignUp from "./SignUp";

class SignUpPage extends Component {
  doRegister = data =>
    //hit the server if successful registration redirect to the login page
    api.users.create(data).then(() => {
        this.props.setMessage("You have been successfully registered and can now login!");
        this.props.history.push("/login")
    });
  render() {
    return (
      <div>
        <div className="ui segment">
          <SignUp doRegister={this.doRegister} />
        </div>
      </div>
    );
  }
}


SignUpPage.propTypes = {
    setMessage: PropTypes.func.isRequired,
    doRegister: PropTypes.func.isRequired
}

export default SignUpPage;
