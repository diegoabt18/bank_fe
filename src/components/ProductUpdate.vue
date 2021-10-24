<template>
  <div class="productUpdate_user">
    <div class="container_productUpdate_user">
        <!-- <div class="ProductInfoContainer"> 
            <ProductDetail />
        </div> -->

        <div class="ProductInfoContainer"> 
            <h2>Editar información de contenido</h2>
            <form v-on:submit.prevent="processProductUpdate">
            <input type="text" v-model="product.prod_name" placeholder="Name" required/>
            <br />
            <input type="text" v-model="product.prod_artist" placeholder="Artist" required/>
            <br />
            <input type="text" v-model="product.prod_genre" placeholder="Genre" required/>
            <br />
            <input type="number" v-model="product.prod_rate" placeholder="Rate" required/>
            <br />
            <input type="text" v-model="product.prod_type" placeholder="Type" required/>
            <br />
            <input type="text" v-model="product.prod_description" placeholder="Description" required/>
            <br />
            <input type="text" v-model="product.prod_urlproduct" placeholder="URLProduct" required/>
            <br />
            <input type="text" v-model="product.prod_urlimagen" placeholder="URLImage" required/>
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
import ProductDetail from './ProductDetail.vue';

export default {
  name: "ProductUpdate",
  components: {
      ProductDetail
  },
  data: function() {
    return {
        product: {
            user_id: 0,
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
        // messageProductUpdate,
    };
  },
  methods: {
    processProductUpdate: async function() {
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
      this.product.user_id = userIdFromToken;
      this.product.prod_user = userIdFromToken;
      let productID = parseInt(localStorage.getItem("product"));
      const headers = { 
        "Authorization": `Bearer ${token}`  
      };  
        
      axios
        .post(`https://db-telocambio.herokuapp.com/product/update/${userIdFromToken}/${productID}`, this.product, { headers })
        .then((result) => {
            alert("Información del producto actualizada");
            this.product.user_id = 0;
            this.product.prod_user = 0;
            this.product.prod_name = "";
            this.product.prod_artist = "";
            this.product.prod_genre = "";
            this.product.prod_rate = 0;
            this.product.prod_type = "";
            this.product.prod_description = "";
            this.product.prod_urlproduct = "";
            this.product.prod_urlimagen = "";
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en la actualización del producto.");
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
};
</script>


<style>
.productUpdate_user {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container_productUpdate_user {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 25%;
  height: 60%;
  display: flex;
  /* flex-direction: column;
  justify-content: center;
  align-items: center; */
}
.productUpdate_user h2 {
  color: #283747;
}
.productUpdate_user form {
  width: 80%;
}
.productUpdate_user input {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #283747;
}
.productUpdate_user button {
  width: 100%;
  height: 40px;
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;
  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
}
.productUpdate_user button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}
.ProductInfoContainer {
  justify-content: space-around;
  margin: 5px;
  padding: 10px;
  border: 1px solid #000000;
}
</style>
