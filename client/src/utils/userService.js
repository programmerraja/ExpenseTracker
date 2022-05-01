import axios from "axios";

export default {
  signIn: function (userCred) {
    return axios.post("/api/v1/signin/",userCred);
  },
 

};