<template>
  <div class="w3-container" align="stretch">
    <div v-if="loaded">
      <form
        class="w3-container w3-card-4 w3-black w3-text-light-blue w3-margin"
        style="width: 50%"
      >
        <h2 style="text-align:center;font-size: 60px;">Mi cuenta</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre del usuario</th>
              <td style="text-align:right;">{{ name }}</td>
            </tr>

            <tr>
              <th>Username</th>
              <td style="text-align:right;">{{ username }}</td>
            </tr>
            <tr>
              <th>Apellido</th>
              <td style="text-align:right;">{{ lastname }}</td>
            </tr>
            <tr>
              <th>Correo electrónico</th>
              <td style="text-align:right;">{{ email }}</td>
            </tr>
            <tr>
              <th>Dirección</th>
              <td style="text-align:right;">{{ address }}</td>
            </tr>
            <tr>
              <th>Celular</th>
              <td style="text-align:right;">{{ cellphone }}</td>
            </tr>
          </thead>
        </table>
      </form>
      <button v-on:click="loadUserUpdate">Actualizar información de usuario</button>
    </div>
  </div>
</template>


<script>
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
  name: "Account",
  data: function() {
    return {
      username: "",
      name: "",
      lastname: "",
      email: "",
      address: "",
      cellphone: 0,
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
        .get(`https://telocambio-example.herokuapp.com/user/${userId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          this.username = result.data.username;
          this.name = result.data.name;
          this.lastname = result.data.last_name;
          this.email = result.data.email;
          this.address = result.data.address;
          this.cellphone = result.data.cellphone;
          this.loaded = true;
        })
        .catch(() => {
          this.$emit("logOut");
        });
    },
    verifyToken: function() {
      return axios
        .post(
          "https://telocambio-example.herokuapp.com/refresh/",
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
    loadUserUpdate: function() {
      this.$router.push({ name: "userUpdate" });
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
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  font-family: "lucida", serif;
}

.information h1 {
  font-size: 40px;
  color: lightblue;
  font-weight: bold;
}
/*.information h2 {
  font-size: 90px;
  color: lightblue;
  font-weight: bold;
  font-family: "lucida", serif;
}*/
.information span {
  color: lightblue;
}

.signUp_Account {
  margin: 0;
  padding: 2% 15%;
  height: 90%;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: left;
}

.container_Account {
  border: 3px solid #4a6b8f9d;
  border-radius: 10px;
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: black;
  font-size: 60px;
  font-weight: bold;
}

.signUp_user h2 {
  color: #7fffd4;
  font-size: 60px;
  font-weight: bold;
}

table {
  font-family: "Open Sans", sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #800000;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #800000;
  color: #fff;
  padding: 8px;
  min-width: 30px;
  border: 3px solid black;
}

table td {
  text-align: left;
  padding: 8px;
   border: 3px solid black;
}
table td:last-child {
  border: 3px solid black;
}
table tbody tr:nth-child(2n) td {
  background: #d4d8f9;
}
</style>
