import axios from "axios";

class ApiClient {
  constructor() {
    this.userToken = JSON.parse(localStorage.getItem('userToken'))
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      headers: { Authorization: `Bearer ${this.userToken}` }
    });
  }

  getMyWallet() {
    return this.apiClient.get("/wallet/myWallet");
  }
}

const apiClient = new ApiClient();
export default apiClient;
