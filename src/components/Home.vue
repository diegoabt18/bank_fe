<template>
  <div class="greetings">
    <h1>¡Bienvenido <span> {{ username }} </span>!
    </h1>
  </div>
</template>
<script>
export default {
  name: "Home",
  data: function() {
    return {
      username: localStorage.getItem("username") || "none",
    };
  },
};
</script>

<style>
.greetings {
  margin: 0;
  padding:  20% 15%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: left;
}
.greetings h1 {
  font-size: 50px;
  color: #283747;
 
}
.greetings span {
  color: rgb(252, 248, 250);
  font-weight: bold;
}
</style>
