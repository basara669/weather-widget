<template>
  <div class="frame">
    <h2 class="l-Text">{{weekDay}}</h2>
    <p class="s-Text">{{today}}</p>

    <h2>
      {{weather}}
      <br>
      {{weatherDescription}}
    </h2>
    <p>
      <img :src="weatherIcon" alt>
      <span class="l-Text">{{temp}}.C</span>
    </p>

    <h3>{{city}}</h3>
  </div>
</template>


<script>
export default {
  name: "Widget",
  props: {
    forcastList: Object,
    city: String
  },
  data() {
    return {
      weather: "",
      weatherIcon: "",
      weatherDescription: "",
      today: "",
      weekDay: "",
      temp: ""
    };
  },
  mounted() {
    console.log(this.forcastList);
    //title
    this.weather = this.forcastList.weather[0].main;
    //description
    this.weatherDescription = this.forcastList.weather[0].description;
    //icon
    this.weatherIcon =
      "http://openweathermap.org/img/w/" +
      this.forcastList.weather[0].icon +
      ".png";
    //date
    const dt = new Date(this.forcastList.dt * 1000);
    let ap = "AM";
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const year = dt.getFullYear();
    const month = months[dt.getMonth()];
    const date = dt.getDate();
    //check am and pm
    const hour = dt.getHours();
    if (hour >= 12) {
      hour -= 12;
      ap = "PM";
    }
    //add 0 to min data
    const min = ("0" + dt.getMinutes()).slice(-2);

    this.today =
      date + " " + month + " " + year + " " + hour + ":" + min + " " + ap;

    //create weekDay
    this.weekDay = week[dt.getDay()];

    this.temp = Math.round(this.forcastList.temp.day);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0;
  font-weight: bold;
  font-size: 24px;
}
.frame {
  border: 1px solid #aaa;
  border-radius: 12px;
  width: 300px;
  height: auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
img {
  height: 80px;
  widows: 80px;
}
.l-Text {
  font-weight: bold;
  font-size: 50px;
  vertical-align: top;
  margin-bottom: 0;
}
.s-Text {
  font-weight: normal;
  font-size: 14px;
  margin: 0;
}
</style>
