import axios from "axios";

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

  getMyWallet() {
    return this.apiClient.get("/wallet/myWallet");
  }
}

const apiClient = new ApiClient();
export default apiClient;
