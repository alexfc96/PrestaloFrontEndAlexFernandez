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
      onSignup({ username, password, firstName, lastName });
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
      <form onSubmit={this.handleSubmit}>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" 
            placeholder="Username" 
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={username}
            onChange={this.handleChange}/> 
            
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="password" 
            placeholder="Password" 
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange}
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" 
            placeholder="Firstname" 
            type="text"
            name="firstName"
            id="firstName"
            placeholder="firstName"
            value={firstName}
            onChange={this.handleChange}/> 
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" 
            placeholder="Lastname" 
            type="text"
            name="lastName"
            id="lastName"
            placeholder="lastName"
            value={lastName}
            onChange={this.handleChange}/> 
            
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button class="button is-success" type="submit" value="submit">
              Submit
            </button>
          </p>
        </div>
      </form>
    );
  }
}

export default withAuth(SignUp);