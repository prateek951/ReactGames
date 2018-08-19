import React, { Component } from 'react'
import SignUp from './SignUp';

class SignUpPage extends Component {

  render() {
    const { doRegister } = this.props;
    return (
      <div>
        <div className="ui segment">
            <SignUp doRegister={doRegister}/>
        </div>
      </div>
    )
  }
}

export default SignUpPage;