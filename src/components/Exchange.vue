<template>
  <div v-if="loaded" class="information">
    <h1>Intercambio realizado</h1>
    
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
  name: "Exchange",
  data: function() {
    return {
      exchange: {
          user_id: "",
          exchange_data: {
            exch_userorigin: "", 
            exch_userdestination: "", 
            exch_prod: "", 
            exch_fecha: new Date().toJSON().toString(),
          },
      },
      messageResult: "",
      loaded: false,
    };
  },
  methods: {
    getData: async function() {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();
      let token = localStorage.getItem("token_access");
      let userId = jwt_decode(token).user_id;
      this.exchange.user_id = userId;
      this.exchange.exchange_data.exch_userorigin = userId;
      this.exchange.exchange_data.exch_userdestination = parseInt(localStorage.getItem("userExchange"));
      this.exchange.exchange_data.exch_prod = parseInt(localStorage.getItem("product"));
            
      axios
        .post(`https://be-telocambio.herokuapp.com/exchange/`, this.exchange, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          this.messageResult = result.data;
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en la creación del intercambio");
          this.$emit("logOut");
        });
    },
    verifyToken: function() {
      return axios
        .post(
          "https://be-telocambio.herokuapp.com/refresh/",
          { refresh: localStorage.getItem("token_refresh") },
          { headers: {} }
        )
        .then((result) => {
          localStorage.setItem("token_access", result.data.access);
        })
        .catch(() => {
          this.$emit("logOut");
        });
    },
  },
  created: async function() {
    this.getData();
  },
};
</script>

<style>
.information {
  margin: 0;
  padding: 0%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.information h1 {
  font-size: 60px;
  color: #0f1316;
}
.information h2 {
  font-size: 20px;
  color: #283747;
}
.information span {
  color: crimson;
  font-weight: bold;
}
table, th, td, tr {
  border:1px solid black;
}
button {
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 20px;
}
button:hover {
  color: #283747;
  background: #e5e7e9;
  border: 1px solid #e5e7e9;
}
.userList {
    display: flex;
}
.userContainer {
  margin: 5px;
  padding: 10px;
  border: 1px solid #000000;
  align-content: stretch;
}
</style>
