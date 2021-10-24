<template>
  <div class="logIn_user">
    <div class="container_logIn_user">
      <h2>Iniciar sesión</h2>
      <form v-on:submit.prevent="processLogInUser">
        <input type="text" v-model="user.username" placeholder="Username" required/>
        <br />
        <input type="password" v-model="user.password" placeholder="Password" required/>
        <br />
        <button type="submit">Iniciar Sesion</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LogIn",
  data: function() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    processLogInUser: function() {
      axios
        .post("https://telocambio-bd.herokuapp.com/login/", this.user, {
          headers: {},
        })
        .then((result) => {
          let dataLogIn = {
            username: this.user.username,
            token_access: result.data.access,
            token_refresh: result.data.refresh,
          };
          this.$emit("completedLogIn", dataLogIn);
        })
        .catch((error) => {
          if (error.response.status == "401")
            alert("ERROR 401: Credenciales Incorrectas.");
        });
    },
  },
};
</script>

<style>
.logIn_user {
  margin: 0vh;
  padding: 0% 15%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
}

.container_logIn_user {
  border: 3px solid #4a6b8f9d;
  border-radius: 10px;
  width: 25%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(77, 105, 134, 0.425)
}

.logIn_user h2 {
  color: #193450;
  font-size: 35px;
}

.logIn_user form {
  width: 70%;
}

.logIn_user input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #4b627aad;
  font-size: 17px;
  
  
}
.logIn_user button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #283747;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0;
  font-size: 20px;
}

.logIn_user button:hover {
  color: #e5e7e9;
  background: #228a8a;
  border: 1px solid #283747;
}
</style>
