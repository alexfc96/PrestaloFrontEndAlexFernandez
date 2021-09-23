import React, { Component } from "react";
import './mainNavBar.css'
import { Link } from "react-router-dom";
import { withAuth } from "../../context/authContext";

class MainNavBar extends Component {
  state = {
    username : "",
  }
  render() {
    const { username } = this.state;
    const { onLogout, isLoggedIn } = this.props;
    return (
      <div className="mainNavBar">
        {!isLoggedIn &&    
          <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
              <a class="navbar-item" href="https://prestalo.com/">
                <img src="https://www.credilemon.com/img/logo/es/prestalo.png" width="112" height="28" />
              </a>
            </div>

            <div class="buttons">
              <a class="button is-primary">
                <Link to="/signup"><strong>Signup</strong></Link>
              </a>
              <a class="button is-light">
                <Link to="/login">Login</Link>
              </a>
            </div>
          </nav>
        }

        {isLoggedIn && 
          <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
              <a class="navbar-item" href="https://prestalo.com/">
                <img src="https://www.credilemon.com/img/logo/es/prestalo.png" width="112" height="28" />
              </a>
            </div>

            <div class="buttons">
                    <a class="button is-dark" onClick={onLogout}>
                      Logout
                    </a>
            </div>
          </nav>
        }

      </div>
    );
  }
}

export default withAuth(MainNavBar);