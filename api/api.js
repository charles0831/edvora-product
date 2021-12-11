import axios from "axios";
const HOST_NAME = "https://assessment-edvora.herokuapp.com/";

class Api {
  getProducts = () => {
    return axios
      .get(HOST_NAME, { headers: {} })
      .then((response) => response.data);
  };
}

export default new Api();
