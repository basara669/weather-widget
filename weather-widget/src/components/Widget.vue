<template>
  <div class="frame">
    <h3>{{city}}</h3>
  </div>
</template>
<script>
export default {
  name: "Widget",
  props: {
    forcastList: Array,
    city: String
  },
  mounted() {
    // console.log(this.forcast_data);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.frame {
  border: 1px solid #222222;
  width: 500px;
  height: 600px;
  margin: 0 auto;
}
</style>
