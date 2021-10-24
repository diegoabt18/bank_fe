<template>
  <div v-if="loaded" class="information">
    <h1>Información de sus productos</h1>
    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Artist</th>
            <th>Genre</th>
            <th>Rate</th>
            <th>Type</th>
            <th>Description</th>
            <th>State</th>
            <th>Options</th>
        </tr>
        <tr v-for="(item, index) in products" :key="item.prod_name">
            <td>{{index+1}}</td>
            <td v-for="value in item" :key="value" >{{value}}</td>
            <button v-on:click="loadProductDetail(item.prod_id)">Detalle del producto</button>
            <button v-on:click="deleteProduct(item.prod_id)">Borrar este producto</button>
        </tr>
    </table> 
        <!-- <ProductDetail msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";
// import ProductDetail from './ProductDetail.vue';

export default {
  name: "Library",
//     components: {
//     ProductDetail
//   },
  data: function() {
    return {
      products: [{"":""}],
      loaded: false,
      productID: 0,
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
        .get(`https://telocambio-bd.herokuapp.com/product/list/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          this.products = result.data;
          for (let item of this.products) {
            //   delete item.prod_id;
              delete item.prod_user;
              delete item.prod_urlproduct;
              delete item.prod_urlimagen;
          }
          // if(  this.products[0].prod_name === null || this.products === undefined || Array.isArray(this.products)  ){
          // if (Object.getOwnPropertyNames(this.products).length === 0 &&  Object.getOwnPropertySymbols(this.products).length === 0 &&  Object.getPrototypeOf(this.products) === Object.prototype) {
            if (this.products[0] === null || this.products[0] === undefined) {
            alert("Crea un producto primero para ver tu librería!");
          } else {
            this.loaded = true;
          }
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en la librería");
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
    loadProductDetail: function(productID) {
      localStorage.setItem("product", productID);
      this.$router.push({ name: "productDetail" });
    },
    deleteProduct: async function(productID) {
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
      localStorage.setItem("product", productID);
      let productId = localStorage.getItem("product").toString();
      axios
        .get(`https://telocambio-bd.herokuapp.com/product/remove/${userId}/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          let message = result.data;
          alert(message);
          this.getData();
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo eliminado el producto");
          this.$emit("logOut");
        });
    }
    
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
  font-size: 40px;
  color: #283747;
}
.information span {
  color: rgb(250, 246, 247);
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
</style>
