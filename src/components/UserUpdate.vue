<template>
  <div class="Update_user">
    <div class="container_Update_user">
      <div class="InfoContainer">
        <h2>Editar información de usuario</h2>
        <form
          v-on:submit.prevent="processUserUpdate"
        >
          <input
            type="text"
            v-model="userDataToUpdate.username"
            placeholder="Username"
            required
          />
          <br />
          <input
            type="text"
            v-model="userDataToUpdate.password"
            placeholder="Password"
            required
          />
          <br />
          <input
            type="text"
            v-model="userDataToUpdate.name"
            placeholder="Name"
            required
          />
          <br />
          <input
            type="text"
            v-model="userDataToUpdate.last_name"
            placeholder="Last Name"
            required
          />
          <br />
          <input
            type="email"
            v-model="userDataToUpdate.email"
            placeholder="Email"
            required
          />
          <br />
          <input
            type="text"
            v-model="userDataToUpdate.address"
            placeholder="Address"
            required
          />
          <br />
          <input
            type="number"
            v-model="userDataToUpdate.cellphone"
            placeholder="Cellphone"
            required
          />
          <br />
          <button type="submit">Editar información</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import jwt_decode from "jwt-decode";
import axios from "axios";


export default {
  name: "UserUpdate",
  data: function () {
    return {
      userDataToUpdate: {
        id: 0,
        username: "",
        password: "",
        name: "",
        last_name: "",
        email: "",
        address: "",
        cellphone: 0,
      },
    };
  },
  methods: {
    processUserUpdate: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();
      let token = localStorage.getItem("token_access");
      let userIdFromToken = jwt_decode(token).user_id;
      this.userDataToUpdate.id = userIdFromToken;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .post(
          `https://telocambio-example.herokuapp.com/user/update/${userIdFromToken}/${userIdFromToken}`,
          this.userDataToUpdate,
          { headers }
        )
        .then((res) => {
          console.log(res);
        });

      // axios
      //   .post(`https://telocambio-example.herokuapp.com/product/update/${userIdFromToken}/${productID}`, this.product, { headers })
      //   .then((result) => {
      //       alert("Información del producto actualizada");
      //       this.product.user_id = 0;
      //       this.product.prod_user = 0;
      //       this.product.prod_name = "";
      //       this.product.prod_artist = "";
      //       this.product.prod_genre = "";
      //       this.product.prod_rate = 0;
      //       this.product.prod_type = "";
      //       this.product.prod_description = "";
      //       this.product.prod_urlproduct = "";
      //       this.product.prod_urlimagen = "";
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     alert("ERROR: Fallo en la actualización del producto.");
      //   });
    },

    verifyToken: function () {
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
  },
};
</script>


<style>
.Update_user {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container_Update_user {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 25%;
  height: 60%;
  display: flex;
}
.Update_user h2 {
  color: #283747;
}
.Update_user form {
  width: 80%;
}
.Update_user input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}
.Update_user button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
}
.Update_user button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}
.InfoContainer {
  justify-content: space-around;
  margin: 5px;
  padding: 10px;
  border: 1px solid #000000;
}
</style>
