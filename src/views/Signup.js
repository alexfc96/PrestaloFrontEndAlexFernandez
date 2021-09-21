import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withAuth } from "../context/authContext";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, firstName, lastName } = this.state;
    const { onSignup } = this.props;
    if (username !== "" && password !== "") {
      onSignup({ username, password, firstName, lastName  });
    }
  };

  cleanForm = () => {
    this.setState({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { username, password, firstName, lastName } = this.state;

    return (
      <div>
        <h1>SignUp</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="firstname"
            value={firstName}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="lastname"
            value={lastName}
            onChange={this.handleChange}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default withAuth(SignUp);