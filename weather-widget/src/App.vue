<template>
  <div id="app">
    <div v-for="(forcastList, key, index) in forcastLists" :key="index">
      <Widget :forcast-List="forcastList" :city="city"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Slick from "vue-slick";

import Widget from "./components/Widget.vue";

const url = "http://api.openweathermap.org/data/2.5/forecast/daily/";

const params = {
  q: "Tokyo",
  APPID: "38c90f844d22569c51c0bf251490993a",
  units: "metric"
};

export default {
  name: "app",
  components: {
    Widget
  },
  data() {
    return {
      forcastLists: [],
      city: ""
    };
  },
  methods: {
    get_ajax() {
      console.log("get_ajax");
      return axios.get(url, { params }).then(res => {
        console.log(res);
        this.city = res.data.city.name;
        this.forcastLists = res.data.list;
        console.log(this.forcastData);
        // return this.$data[forcastData];
        // this.forcat_data = res.data.list;
        // Vue.set(this, name, res.list);
        // this.$emit("GET_AJAX_COMPLETED");
      });
    }
  },
  created() {
    console.log("created");
    this.get_ajax();
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
