import axios from "axios";

class ApiTransactions {

  constructor() {
    this.userToken = JSON.parse(localStorage.getItem('userToken'))
    this.apiTransactions = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      headers: { Authorization: `Bearer ${this.userToken}` }
    });
  }

  getMyTransactions(idWallet) {
    return this.apiTransactions.get(`/transaction/${idWallet}`);
  }

  sendMoney(body) {
    return this.apiTransactions.post(`/transaction/new`, body);
  }
}

const apiTransactions = new ApiTransactions();
export default apiTransactions;
