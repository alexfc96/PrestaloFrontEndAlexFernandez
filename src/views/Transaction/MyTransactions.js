import React, { Component } from "react";
import { withAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

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
          <ul className="showWallet">
             {transactions.map((transaction)=>{
               return <li key={transaction.id}>
                       <h2>ID:{transaction.id}</h2>
                       <h2>Type:{transaction.type}</h2>
                       <h2>Amount:{transaction.amount}</h2>
                       <h3>Start hour:{transaction.createdDate}</h3>
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
            <div>
                <form onSubmit={this.handleSendTransaction}>
                <label htmlFor="walletId">Indicates the ID of the recipient's wallet: </label>
                    <input
                        type="string"
                        name="walletId"
                        id="walletId"
                        required
                        onChange={this.handleChange}
                    />
                <label htmlFor="amount">Especify the amount to send: </label>
                    <input
                        type="numner"
                        name="amount"
                        id="amount"
                        required
                        onChange={this.handleChange}
                    />
                <input type="submit" value="Send" />
                </form><br/>
            </div>
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
          <button onClick={()=>{this.btnMoneyModal()}}>SEND</button>
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