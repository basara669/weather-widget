<template>
  <div class="frame">
    <h2>{{weekDay}}</h2>
    <p>{{today}}</p>

    <p>{{weather}}</p>
    <img :src="weatherIcon" alt>
    <p>{{temp}}.C</p>

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
  margin: 40px 0 0;
}
.frame {
  border: 1px solid #222222;
  width: 500px;
  height: 600px;
  margin: 0 auto;
}
</style>
