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
            <span>ID de la billetera: {wallet.id}</span>
            <MyTransactions idWallet={wallet.id}></MyTransactions>
            {/* <Link to={`/establishment/${booking.idEstablishment._id}`}>{booking.idEstablishment.name}</Link> */}
            <hr/>

        </div>
      )

    // Si quiero tener mas de una moneda(id de billetera por moneda): 
    //   return(
    //     <div>
    //       <ul className="showWallet">
    //         {bookings.map((booking)=>{
    //           return <li key={booking._id}>
    //                   <div>
    //                     <Link to={`/establishment/${booking.idEstablishment._id}`}>{booking.idEstablishment.name}</Link>
    //                     <button onClick={()=>{this.deleteBooking(booking._id, booking.idEstablishment)}}>Delete Booking</button>
    //                   </div>
    //                   <h3>Day:<Moment format='LL' date={booking.day} /></h3>
    //                   <h3>Start hour:{booking.startHour}</h3>
    //                   <hr/>
    //                 </li>
    //         })
    //       }
    //       </ul>
    //     </div>
    //   )
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
          <h1>My wallet:</h1>
          {wallet == false &&
            <p> It seems that the wallet is not working fine </p>
          }
          {wallet && this.showWallet() }
  
        </div>
      );
    }
  }
  
  export default withAuth(MyWallet);