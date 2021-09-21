import React, { Component } from "react";

import { withAuth } from "../context/authContext";
import { Wallet } from "./Wallet/MyWallet"

class Resorts extends Component {
  render() {
    const { onLogout } = this.props;
    return (
      <div>
        <h1>Protected</h1>
        <myWallet></myWallet>
        <button onClick={onLogout}>Logout</button>
      </div>
    );
  }
}

export default withAuth(Resorts);
