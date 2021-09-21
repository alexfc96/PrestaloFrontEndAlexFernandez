import axios from "axios";
class ApiClient {

  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      // headers: { Authorization: `Bearer ${user.token}` }
      // headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTRhM2EwMzM5OWY4MDA5YTFiYWRkMWMiLCJpYXQiOjE2MzIyNTQ0NzAsImV4cCI6MTYzMjg1OTI3MH0._bhNk75sFrXXMfsRSB9_I8tsSmU8eScEj4hk_1JB9DQ` }
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
