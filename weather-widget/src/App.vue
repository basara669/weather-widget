<template>
  <div id="app">
    <Widget data="forcast_data"/>
  </div>
</template>

<script>
import axios from "axios";
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
      forcast_data: null
    };
  },
  methods: {
    get_ajax() {
      console.log("get_ajax");
      return axios.get(url, { params }).then(res => {
        console.log(res);
        this.forcast_data = res.data;
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
