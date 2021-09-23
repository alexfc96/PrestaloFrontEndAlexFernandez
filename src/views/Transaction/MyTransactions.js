import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

import apiTransactions from "../../services/apiTransactions";
class MyTransactions extends Component {
    state = {
      transactions: undefined,
      sendModal: false,
      walletId: undefined,
      amount: 0
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };
  
    showTransactions(){
      const { transactions } = this.state;
      const { walletId } = this.state;
      return(
        <div>
          {transactions.map((transaction)=>{
            console.log(transaction.walletId != walletId)
            if(transaction.walletId != walletId ) { transaction.type = "receive" }
            return <div class="card" key={transaction.id}>
                <header class="card-header">
                  <p class="card-header-title">
                    <Moment format='LL' date={transaction.createdDate} />
                  </p>
                </header>
                <div class="card-content">
                  <div class="content">
                    <span>Transaction ID: {transaction.id}</span><br />
                    <span>Type: {transaction.type}</span><br />
                    <span>Amount: {transaction.amount}</span>
                  </div>
                </div>
              </div>
              })
           }
        </div>
      )
    }

    showSendModal(){
        return(
          <form onSubmit={this.handleSendTransaction}>
            <label htmlFor="walletId">Indicates the ID of the recipient's wallet: </label>
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" 
                placeholder="Wallet ID"
                type="string"
                name="walletId"
                id="walletId"
                required
                onChange={this.handleChange}
                />
              </p>
            </div>
            <div class="field has-addons">
              <p class="control">
                <span class="select">
                  <select>
                    <option value="btc">BTC</option>
                    <option value="eth">ETH</option>
                    <option value="doge">DOGE</option>
                  </select>
                </span>
              </p>
              <p class="control">
                <input class="input" 
                placeholder="Amount of money"
                type="number"
                name="amount"
                id="amount"
                required
                onChange={this.handleChange}
                />
              </p>
            </div>
            <button class="button is-success" type="submit" value="submit">
              Submit
            </button>
         </form>
        )
    }

    handleSendTransaction = (e) => {
        e.preventDefault()
        const { walletId, amount } = this.state;
        
        const type = "send";
        const trans = { walletId, amount, type };

        apiTransactions
            .sendMoney(trans)
            .then(() => {
                this.setState({
                    sendModal: false,
                })
                this.getMyTransactions()
            })
            .catch((error)=> {
                console.log(error)
            })
    }
  
    getMyTransactions(){
      const { idWallet } = this.props;
      
      apiTransactions
      .getMyTransactions(idWallet)
      .then(({ data:transactions }) => {
        this.setState({
          transactions
        });
      })
      .catch((error) => {
        console.log(error)
        this.setState({
            transactions: false,
        });
      });
    }

    btnMoneyModal(){
        const { sendModal } = this.state;
        this.setState({
            sendModal : !sendModal
        })
    }
  
    componentDidMount(){
      this.getMyTransactions()
    }
  
    render() {
      const { transactions, sendModal } = this.state;
      return (
        <div>
          <div>
            <span style={{padding: ".75rem"}}>
              <button class="button is-info btn-send-receive" onClick={()=>{this.btnMoneyModal()}}>
                <img src="https://cdn-icons-png.flaticon.com/512/876/876776.png" width="22" height="26" /> 
                 Send
              </button>
            </span>
            <span style={{padding: ".75rem"}}>
              <button class="button is-info btn-send-receive">
                <img src="https://cdn-icons-png.flaticon.com/512/876/876772.png" width="22" height="26" />
                Receive
              </button>
            </span>
          </div><br />

          {sendModal && this.showSendModal() }

          <h1>My transactions:</h1>
          {transactions == false &&
            <p> It seems that you dont have transactions yet.</p>
          }
          {transactions && this.showTransactions() }<br />
        </div>
      );
    }
  }
  
  export default withAuth(MyTransactions);