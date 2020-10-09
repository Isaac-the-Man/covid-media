<template>
  <div id="app" class="text-white pt-5">
    <div class="container">
      <b-row class="text-center">
        <b-col>
          <img :class="['virus-img', {'shrink': isStart}]" alt="Covid Media Logo" src="./assets/virus.png">
          <h1>Covid-19 & Media</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col md="8">
          <router-view @start="isStart = true;"/>
        </b-col>
        <b-col></b-col>
      </b-row>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer"

export default {
  name: 'App',
  components: {
    Footer
  },
  data() {
    return {
      isStart: false
    }
  }
}
</script>

<style>
.virus-img {
  max-height: 50vh;
  transition: max-height 1.5s;
}
.shrink {
  max-height: 30vh;
}
body {
  background-color: #4a148c !important;
}
</style>
