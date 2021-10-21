<template>
  <div v-if="loaded" class="information">
    <h1>Información de sus productos</h1>
    <h2>
      Name: <span>{{ name }}</span>
    </h2>
    <h2>
      Artist: <span>{{ artist }} </span>
    </h2>
    <h2>
      Genre: <span>{{ genre }}</span>
    </h2>
    <h2>
      Rate: <span>{{ rate }}</span>
    </h2>
    <h2>
      Type: <span>{{ type }}</span>
    </h2>
    <h2>
      Description: <span>{{ description }}</span>
    </h2>
    <h2>
      URLProduct: <span>{{ urlproduct }}</span>
    </h2>
    <h2>
      URLImage: <span>{{ urlimagen }}</span>
    </h2>
    <h2>
      State: <span>{{ state }}</span>
    </h2>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
  name: "Library",
  data: function() {
    return {
      name: "",
      artist: "",
      genre: "",
      rate: 0,
      type: "",
      description: "",
      urlproduct: "",
      urlimagen: "",
      state: false,
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
      console.log(userId)
      axios
        .get(`https://be-telocambio.herokuapp.com/product/${userId}/1`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          console.log(result)
          console.log(result.data)
          this.name = result.data.prod_name;
          this.artist = result.data.prod_artist;
          this.genre = result.data.prod_genre;
          this.rate = result.data.prod_rate;
          this.type = result.data.prod_type;
          this.description = result.data.prod_description;
          this.urlproduct = result.data.prod_urlproduct;
          this.urlimagen = result.data.prod_urlimagen;
          this.state = result.data.prod_state;
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error);
          this.$emit("logOut");
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
  color: crimson;
  font-weight: bold;
}
</style>
