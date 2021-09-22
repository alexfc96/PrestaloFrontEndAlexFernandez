import axios from "axios";
class ApiClient {

  constructor() {
    this.userToken = JSON.parse(localStorage.getItem('userToken'))
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      headers: { Authorization: `Bearer ${this.userToken}` }
    });
  }

  signup(body) {
    return this.apiClient.post("/users/register", body);
  }

  login(body) {
    return this.apiClient.post("/users/authenticate", body);
  }

  logout() {
    return this.apiClient.get("/logout");
  }

  whoami() {
    return this.apiClient.get("/users/current");
  }

  getProtected() {
    return this.apiClient.get("/protected");
  }
}

const apiClient = new ApiClient();
export default apiClient;
