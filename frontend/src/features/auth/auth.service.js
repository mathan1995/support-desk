import axios from "axios";

const API_URL = "/api/users";

const register = async (user) => {
  const response = await axios.post(API_URL + "/register", user);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
};

export default authService;
