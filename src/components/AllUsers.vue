<template>
  <div v-if="loaded" class="information">
    <h1>Con quién quieres intercambiar?</h1>

    <div class="userList">
        <div v-for="item in usersList" :key="item.pk" class="userContainer">
            <h2>Username: {{item.fields.username}}</h2>
            <h2>Email: {{item.fields.email}}</h2>
            <h2>Phone: {{item.fields.cellphone}}</h2>
            <button v-on:click="loadExchange(item.pk)">Seleccionar usuario</button>
        </div>
    </div>

  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
  name: "AllUsers",
  data: function() {
    return {
      usersList: [{"":""}],
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
      let userId = jwt_decode(token).user_id.toString();
      
      axios
        .get(`https://telocambio-bd.herokuapp.com/user/list/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          this.usersList = result.data;
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en la vista de usuarios");
          this.$emit("logOut");
        });
    },
    verifyToken: function() {
      return axios
        .post(
          "https://telocambio-bd.herokuapp.com/refresh/",
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
    loadExchange: function(userID) {
      localStorage.setItem("userExchange", userID);
      this.$router.push({ name: "exchange" });
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
