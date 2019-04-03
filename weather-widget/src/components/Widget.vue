<template>
  <div class="frame">
    <h2>Monday</h2>
    <p>22 Nov 2019 8:30pm</p>

    <p>ThunderStorm</p>
    <img src alt>
    <p>28.C</p>

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
  computed: {
    // forcastList() {
    //   console.log("changed");
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
.frame {
  border: 1px solid #222222;
  width: 500px;
  height: 600px;
  margin: 0 auto;
}
</style>
