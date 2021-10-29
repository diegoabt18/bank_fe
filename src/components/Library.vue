<template>
  <div v-if="loaded" class="information">
    <h1>Información de sus productos</h1>
    <table>
        
        <tr>
            <th>ID</th>
            <th>Product_ID</th>
            <th>user</th>
            <th>Name</th>
            <th>Artist</th>
            <th>Genre</th>
            <th>Rate</th>
            <th>Type</th>
            <th>Description</th>
            <th>audio</th>
            <th>imagen</th>
            <th>State</th>
            <th>Options</th>
        </tr>
        <tr v-for="(item, index) in products" :key="item.pk">
            <td>{{index+1}}</td>
            <td>{{item.pk}}</td>
            <td v-for="(value, index2) in item.fields" :key="value" >
              
              <p v-if="Visualizador1(value, index2)">
                <button v-on:click="Reproductor(value)">Reproducir</button>
                <button v-on:click="Pausar()">Pausar</button>
              </p>
              <p v-if="Visualizador2(value, index2)" v-html="inputs">  
                
              </p>
              <p v-if="Visualizador3(value, index2)">
                {{value}}
              </p>

              <!-- <p v-else>{{value}}</p> -->

            </td>
           
            <button v-on:click="loadProductDetail(item.pk)">Detalle del producto</button>
            <button v-on:click="deleteProduct(item.pk)">Borrar este producto</button>
            
            <!-- <button v-on:click="Reproductor('https://telocambio-example.herokuapp.com/media/audio/eminen.mp4')">Play1</button>
            <button v-on:click="Reproductor('https://telocambio-example.herokuapp.com/media/audio/y2mate.com_-_LAS_REGLAS_320kbps.mp3')">Play</button> -->
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
      inputs:"",
      music:new Audio(),
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
        .get(`https://telocambio-example.herokuapp.com/product/list/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          this.products = result.data;
          console.log(result.data)
          for (let item of this.products) {
              delete item.model;
              delete item.prod_user;
              item.fields.prod_urlproduct ="https://telocambio-example.herokuapp.com/media/"+item.fields.prod_urlproduct;
              item.fields.prod_urlimagen ="https://telocambio-example.herokuapp.com/media/"+item.fields.prod_urlimagen;
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
        .get(`https://telocambio-example.herokuapp.com/product/remove/${userId}/${productId}`, {
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
    },
    Visualizador1(productos, indice){
      let bool=false;
      //console.log(indice)
      if(indice=="prod_urlproduct"){
       // console.log(productos)
        //this.inputs='<button v-on:click="Reproductor('+"'"+productos+"'"+')">Play</button>';
     //   console.log(this.inputs)
       bool=true;
      }
      return bool;
    },
     Visualizador2(productos, indice){
      let bool=false;
      //console.log(indice)
      if(indice=="prod_urlimagen"){
        this.inputs='<img width="150" height="150" src="'+productos +'">';
       bool=true;
      }
      return bool;
    },
     Visualizador3(productos, indice){
      let bool=false;
      //console.log(indice)
      if(indice!="prod_urlimagen" && indice!="prod_urlproduct"){
        //this.inputs='<img width="150" height="150" src="'+productos +'">';
       bool=true;
      }
      return bool;
    },
    Reproductor(link){
      
      console.log(link)
      this.music.pause()
      this.music.src= (link)
      this.music.load()
      this.music.play()
      localStorage.setItem("musik",this.music)
      
    },
    Pausar(){
      this.music.pause()
    },
    prueba(){
      alert("esto es una prueba")
    }
    
  },
  created: async function() {
    this.getData();
  },
  // beforeDestroy: function() {
  //   console.log("Entra aqui")
  //   this.music.pause()
  // },
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
   font-size: 25px;
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
