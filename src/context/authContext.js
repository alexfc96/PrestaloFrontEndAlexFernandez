import React, { Component } from "react";

import apiClient from "../services/apiClient";

export const AuthContext = React.createContext();

export const withAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {({ handleSignup, handleLogin, user, isLoggedIn, handleLogout }) => {
            return (
              <Comp
                onSignup={handleSignup}
                onLogin={handleLogin}
                user={user}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                {...this.props}
              />
            );
          }}
        </AuthContext.Consumer>
      );
    }
  };
};

class AuthProvider extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
  };

  componentDidMount() {
    this.whoami()
      .then((user) => {
        this.setState({
          isLoading: false,
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          isLoggedIn: false,
          user: null,
        });
      });
  }

  whoami() {
     return new Promise(function(resolve, reject) {
      if(JSON.parse(localStorage.getItem('userToken'))){
        resolve(JSON.parse(localStorage.getItem('userToken')));
      } else {
        reject()
      }
    });
  }

  handleSignup = ({ username, password, firstName, lastName }) => {
    apiClient
      .signup({ username, password, firstName, lastName })
      .then(({ data: user }) => {
        this.setState({
          isLoggedIn: true,
          user,
        });
        this.handleLogin({username, password})
      })
      .catch((error) => {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      });
  };

  handleLogin = ({ username, password }) => {
    apiClient
      .login({ username, password })
      .then(({ data: user }) => {
        this.setState({
          isLoggedIn: true,
          user,
        });
        localStorage.setItem("userToken", JSON.stringify(user.token));
      })
      .catch((error) => {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      });
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: null,
    });
    localStorage.removeItem("userToken");
  };

  render() {
    const { children } = this.props;
    const { isLoggedIn, user } = this.state;
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn,
          user,
          handleSignup: this.handleSignup,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
