<template>
  <div id="app">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(forcastList, key, index) in forcastLists" :key="index">
        <Widget
          :forcast-list="forcastList"
          :city="city"
          :component-index="key"
          :active-index="activeIndex"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
//axios was familiar for me
import axios from "axios";

//I used vue-awesome-swiper
//In this app, I have to get which is active or not
//this library could do that.
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import Widget from "./components/Widget.vue";

//In this app, I didn't use vuex, because this app is not
//that big and don't need that big store system.

// openweathermap settings
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
      componentIndex: 0,
      activeIndex: 0,
      swiperOption: {
        effect: "coverflow",
        grabCursor: true,
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        keyboard: true,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        }
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
    },
    onSwipe(varuable) {
      this.activeIndex = varuable.swiper.activeIndex;
    }
  },
  beforeMount() {
    this.getLocation();
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    this.swiper.on("slideChange", () => {
      this.onSwipe(this);
    });
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
.swiper-inner {
  width: 100%;
  height: 450px;
  padding-top: 50px;
  padding-bottom: 50px;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 350px;
}
</style>
