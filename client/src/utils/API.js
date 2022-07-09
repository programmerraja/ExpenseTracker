import axios from "axios";
import jwt_decode from "jwt-decode";



export default {
  setToken:function (token) {
     localStorage.setItem("token",token);
  },
  isAuth:function(){
    let token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  },
  setAuthHeader: function () {
    let token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
  },
  removeAuthHeader: function () {
    axios.defaults.headers.common["Authorization"] = "";
  },
  checkTokenExp: function () {
    let token = localStorage.getItem("token");
    //check only if token avalible and checking it is valid token 
    //if it valid token if we split according to dot the array length will greater then or =2
    if (token && token.split(".").length>=2)  {
      var decoded = jwt_decode(token);
      let currentDate = new Date();
      // JWT exp is in seconds
      if (decoded.exp * 1000 < currentDate.getTime()) {
        //removing user data from local storage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return true;
      }
    }else{
      //token not valid mean it expired so true
      return true;
    }
    return false;
  },
  decodedUserJWT: function () {
    let token = localStorage.getItem("token");
    //check only if token avalible
    if (token  && token.split(".").length>=2) {
      var decoded = jwt_decode(token);
      let user = decoded;
      return user;
    }
    return null;
  },

  signIn: function (userCred) {
    return axios.post("/api/v1/signin/",userCred);
  },
  
  getMonths:function(){
    return axios.get("/api/v1/month/");
  },
  editMonth:function(id,body){
    return axios.post(`/api/v1/month/${id}`,body);
  },
  addMonth:function(body){
    return axios.post("/api/v1/month/",body);
  },
  deleteMonth:function(id){
    return axios.delete(`/api/v1/month/${id}`);
  },

  getTransactions:function(id){
    return axios.get(`/api/v1/transactions/${id}`);
  },
  addTransaction:function(body){
    return axios.post("/api/v1/transactions/",body);
  },
  editTransaction:function(body){
    return axios.post(`/api/v1/transactions/edit`,body);
  },
  deleteTransaction:function(body){
    return axios.post(`/api/v1/transactions/delete`,body);
  },
  numberWithCommas:function (x) {
    if(x){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return x
  }
};

function setAuthHeader() {
    let token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
  }
//setting token
setAuthHeader();
