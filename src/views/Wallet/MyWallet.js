import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import MyTransactions from "../Transaction/MyTransactions"

import apiWallet from "../../services/apiWallet";
class MyWallet extends Component {
    state = {
      wallet: undefined,
    }
  
    showWallet(){
      const { wallet } = this.state;
      return(
        <div className="showWallet">
            <div>ID of my wallet: <br />
              <strong>{wallet.id}</strong>
            </div><br />
            <MyTransactions idWallet={wallet.id}></MyTransactions>
            <hr/>

        </div>
      )
    }
  
    getMyWallet(){
      apiWallet
      .getMyWallet()
      .then(({ data:wallet }) => {
        this.setState({
          wallet
        });
      })
      .catch((error) => {
        console.log(error)
        this.setState({
            wallet: false,
        });
      });
    }
  
    componentDidMount(){
      this.getMyWallet()
    }
  
    render() {
      const { wallet } = this.state;
      return (
        <div>
          {wallet == false &&
            <p> It seems that the wallet is not working fine </p>
          }
          {wallet && this.showWallet() }
  
        </div>
      );
    }
  }
  
  export default withAuth(MyWallet);