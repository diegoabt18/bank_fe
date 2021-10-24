<template>
  <div class="signUp_user">
    <div class="container_signUp_user">
      <h2>Registrarse</h2>
      <form v-on:submit.prevent="processSignUp">
        <input type="text" v-model="user.username" placeholder="Username" required/>
        <br />
        <input type="password" v-model="user.password" placeholder="Password" required/>
        <br />
        <input type="text" v-model="user.name" placeholder="Name" required/>
        <br />
        <input type="text" v-model="user.last_name" placeholder="Lastname" required/>
        <br />
        <input type="email" v-model="user.email" placeholder="Email" required/>
        <br />
        <input type="text" v-model="user.address" placeholder="Address" required/>
        <br />
        <input type="number" v-model="user.cellphone" placeholder="Cellphone" required/>
        <br />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  </div>
 

</template>

<script>
import axios from "axios";
export default {
  name: "SignUp",
  data: function() {
    return {
      user: {
        username: "",
        password: "",
        name: "",
        last_name: "",
        email: "",
        address: "",
        cellphone: ""
      },
    };
  },
  methods: {
    processSignUp: function() {
      axios
        .post("https://telocambio-bd.herokuapp.com/user/", this.user, {
          headers: {},
        })
        .then((result) => {
          let dataSignUp = {
            username: this.user.username,
            token_access: result.data.access,
            token_refresh: result.data.refresh,
          };
          this.$emit("completedSignUp", dataSignUp);
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el registro.");
        });
    },
  },
};
</script>

<style>
.signUp_user {
  margin: 0;
  padding: 2% 15%;
  height: 90%;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
}

.container_signUp_user {
  border: 3px solid #4a6b8f9d;
  border-radius: 10px;
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(77, 105, 134, 0.425)
}

.signUp_user h2 {
  color: #193450;
  font-size: 30px;
}

.signUp_user form {
  width: 60%;
}

.signUp_user input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #4b627aad;
  font-size: 17px;
}

.signUp_user button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #283747;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
  font-size: 20px;
}

.signUp_user button:hover {
  color: #e5e7e9;
  background: #228a8a;
  border: 1px solid #283747;
}

</style>
