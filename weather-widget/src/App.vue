<template>
  <div id="app">
    <carousel
      :paginationEnabled="false"
      :perPageCustom="[[768, 3]]"
      :centerMode="true"
      :navigateTo="2"
    >
      <slide v-for="(forcastList, key, index) in forcastLists" :key="index" data-index="index">
        <Widget :forcast-list="forcastList" :city="city"/>
      </slide>
    </carousel>
  </div>
</template>

<script>
import axios from "axios";
import { Carousel, Slide } from "vue-carousel";

import Widget from "./components/Widget.vue";

const url = "https://api.openweathermap.org/data/2.5/forecast/daily/";

const params = {
  APPID: "38c90f844d22569c51c0bf251490993a",
  cnt: 7,
  lat: "",
  lon: "",
  //changed to Celsius
  units: "metric"
};

export default {
  name: "app",
  components: {
    Widget,
    Carousel,
    Slide
  },
  data() {
    return {
      forcastLists: [],
      city: ""
    };
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          pos => this.getWeather(pos),
          err => console.log(err)
        );
      }
    },
    getWeather(pos) {
      params.lat = pos.coords.latitude;
      params.lon = pos.coords.longitude;
      return axios.get(url, { params }).then(res => {
        this.city = res.data.city.name;
        this.forcastLists = res.data.list;
      });
    }
  },
  beforeMount() {
    this.getLocation();
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
