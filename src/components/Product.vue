<template>
  <div class="productCreation_user">
    <div class="container_productCreation_user">
      <h2>Crear contenido</h2>
      <form v-on:submit.prevent="processProductCreation" enctype="multipart/form-data">
        <input type="text" v-model="product.product_data.prod_name"  placeholder="Name" required/>
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
        <label style="font-size:12">Ingrese el prudcto (audio o video)</label>
        <input type="file" name="pro" @change="OnFileSelectecd1" placeholder="URLProducto" />
        <label style="font-size:12">Ingrese una caratula (imagen)</label>
        <input type="file" name="img" @change="OnFileSelectecd2" placeholder="URLImagen" />
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
        media_audio: null,
        media_imagen: null,
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
      const fd=new FormData();
      fd.append('audio',this.media_audio, this.media_audio.name)  
      fd.append('imagen',this.media_imagen, this.media_imagen.name)
      fd.append('data', JSON.stringify(this.product)) 

      axios.post("https://telocambio-example.herokuapp.com/product/", fd, { headers })
        .then(res=>{
          console.log(res)
          this.productoCreado()
      });

      // axios
      //   .post("https://telocambio-example.herokuapp.com/product/", this.product, { headers })
      //   .then((result) => {
      //     let dataProductCreation = {
      //       messageProductCreation: result,
      //     };
      //     this.$emit("completedProductCreation", dataProductCreation);
      //     this.product.user_id = 0;
      //     this.product.product_data.prod_user = 0;
      //     this.product.product_data.prod_name = "";
      //     this.product.product_data.prod_artist = "";
      //     this.product.product_data.prod_genre = "";
      //     this.product.product_data.prod_rate = 0;
      //     this.product.product_data.prod_type = "";
      //     this.product.product_data.prod_description = "";
      //     this.product.product_data.prod_urlproduct = "";
      //     this.product.product_data.prod_urlimagen = "";
      //     this.product.product_data.prod_state = false;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     alert("ERROR: Fallo en la creación del producto.");
      //   });
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
      OnFileSelectecd1(event){
      this.media_audio=event.target.files[0] 
      //this.product.product_data.prod_urlproduct=event.target.files[0]
      console.log(event.target.files[0])
    },
    OnFileSelectecd2(event){
      this.media_imagen=event.target.files[0]
      console.log(event.target.files[0])
      console.log(this.product.product_data.prod_urlimagen)
    },
    productoCreado(){
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
      alert("producto creado")
    }
  },
};
</script>


<style>
.productCreation_user {
  margin: 0;
  padding: 1% 15%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: left;
}
.container_productCreation_user {
  border: 3px solid #4a6b8f9d;
  border-radius: 10px;
  width: 25%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  background: rgba(77, 105, 134, 0.425);
  font-size: 40px;
}
.productCreation_user h2 {
  color: #283747;
  font-size: 35px;

}
.productCreation_user form {
  width: 70%;
}
.productCreation_user input {
  height: 35px;
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
