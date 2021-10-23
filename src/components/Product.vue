<template>
  <div class="productCreation_user">
    <div class="container_productCreation_user">
      <h2>Crear contenido</h2>
      <form v-on:submit.prevent="processProductCreation">
        <input type="text" v-model="product.product_data.prod_name" placeholder="Name" required/>
        <br />
        <input type="text" v-model="product.product_data.prod_artist" placeholder="Artist" required/>
        <br />
        <input type="text" v-model="product.product_data.prod_genre" placeholder="Genre" required/>
        <br />
        <input type="number" v-model="product.product_data.prod_rate" placeholder="Rate" required/>
        <br />
        <input type="text" v-model="product.product_data.prod_type" placeholder="Type" required/>
        <br />
        <input type="text" v-model="product.product_data.prod_description" placeholder="Description" required/>
        <br />
        <input type="text" v-model="product.product_data.prod_urlproduct" placeholder="URLProduct" required/>
        <br />
        <input type="text" v-model="product.product_data.prod_urlimagen" placeholder="URLImage" required/>
        <br />
        <!-- <input type="text" v-model="product.product_data.prod_state" placeholder="State" />
        <br /> -->
        <button type="submit">Crear</button>
      </form>
    </div>
  </div>
</template>




<script>
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
  name: "Product",
  data: function() {
    return {
        product: {
            user_id: 0,
            product_data: {
                prod_user: 0,
                prod_name: "",
                prod_artist: "",
                prod_genre: "",
                prod_rate: 0,
                prod_type: "",
                prod_description: "",
                prod_urlproduct: "",
                prod_urlimagen: "",
                prod_state: false,
            },
        },
    };
  },
  methods: {
    processProductCreation: async function() {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();
      let token = localStorage.getItem("token_access");
      let userIdFromToken = jwt_decode(token).user_id.toString();
      this.product.user_id = parseInt(userIdFromToken);
      this.product.product_data.prod_user = userIdFromToken;
      const headers = { 
        "Authorization": `Bearer ${token}`  
      };  

      axios
        .post("https://be-telocambio.herokuapp.com/product/", this.product, { headers })
        .then((result) => {
          let dataProductCreation = {
            messageProductCreation: result,
          };
          this.$emit("completedProductCreation", dataProductCreation);
          this.product.user_id = 0;
          this.product.product_data.prod_user = 0;
          this.product.product_data.prod_name = "";
          this.product.product_data.prod_artist = "";
          this.product.product_data.prod_genre = "";
          this.product.product_data.prod_rate = 0;
          this.product.product_data.prod_type = "";
          this.product.product_data.prod_description = "";
          this.product.product_data.prod_urlproduct = "";
          this.product.product_data.prod_urlimagen = "";
          this.product.product_data.prod_state = false;
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en la creación del producto.");
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
};
</script>


<style>
.productCreation_user {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container_productCreation_user {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 25%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.productCreation_user h2 {
  color: #283747;
}
.productCreation_user form {
  width: 70%;
}
.productCreation_user input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}
.productCreation_user button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
}
.productCreation_user button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}
</style>
