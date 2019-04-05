<template>
  <div id="app">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(forcastList, key, index) in forcastLists" :key="index">
        <Widget :forcast-list="forcastList" :city="city" :current-index="index"/>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import axios from "axios";

import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

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
    swiper,
    swiperSlide
  },
  data() {
    return {
      forcastLists: [],
      city: "",
      currentIndex: 0,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        keyboard: true
      }
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
.swiper-container {
  height: 500px;
}
</style>
