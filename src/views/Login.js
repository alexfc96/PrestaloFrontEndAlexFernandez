import React, { Component } from "react";
import { withAuth } from "../context/authContext";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { onLogin } = this.props;
    if (username !== "" && password !== "") {
      onLogin({ username, password });
    }
  };

  cleanForm = () => {
    this.setState({
      username: "",
      password: "",
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { username, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" 
            placeholder="User" 
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

export default withAuth(Login);
