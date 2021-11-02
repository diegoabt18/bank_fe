<template>
  
  <div class="signUp_Account">
     <div class="container_Account">
       <div v-if="loaded" class="information">
        <b><h2>DATOS CUENTA</h2></b>
        <h2>Nombre: <span>{{ name }}</span></h2>
        <h2> Username: <span>{{ username }} </span></h2>
        <h2>Apellido: <span>{{ lastname }}</span></h2>
        <h2>Correo electrónico: <span>{{ email }}</span></h2>
        <h2>Dirección: <span>{{ address }}</span></h2>
        <h2>Celular: <span>{{ cellphone }}</span></h2>
     </div>
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
        .get(`https://db-telocambio.herokuapp.com/user/${userId}/`, {
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
          "https://db-telocambio.herokuapp.com/refresh/",
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
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  
  }

.information h1 {
  font-size: 40px;
  color: #212930;
  font-weight: bold;
}
.information h2 {
  font-size: 90px;
  color: #283747;
  font-weight: bold;
}
.information span {
  color: rgb(250, 246, 247);
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
  background: rgba(77, 105, 134, 0.425);
  font-size: 60px;
  font-weight: bold;
}

.signUp_user h2 {
  color: #193450;
  font-size: 60px;
  font-weight: bold;
  
}

</style>
