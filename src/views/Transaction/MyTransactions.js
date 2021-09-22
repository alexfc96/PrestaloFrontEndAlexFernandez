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
      return(
        <div>
          <ul class="showWallet">
             {transactions.map((transaction)=>{
               return <li key={transaction.id}>
                       <h3>Day: <Moment format='LL' date={transaction.createdDate} /></h3>
                       <h2>ID: {transaction.id}</h2>
                       <h2>Type: {transaction.type}</h2>
                       <h2>Amount: {transaction.amount}</h2>
                       <hr/>
                     </li>
             })
           }
           </ul>
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
          <button class="button is-info" onClick={()=>{this.btnMoneyModal()}}>
            <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/send-money-36-1131476.png" width="18" height="20" />
            SEND
          </button>
          {sendModal && this.showSendModal() }

          <h1>My transactions:</h1>
          {transactions == false &&
            <p> It seems that you dont have transactions yet.</p>
          }
          {transactions && this.showTransactions() }
        </div>
      );
    }
  }
  
  export default withAuth(MyTransactions);