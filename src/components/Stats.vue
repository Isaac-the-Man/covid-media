<template>
  <div>
    Total Responds: {{ totalAns }}
    <h3 class="mt-3">Personal</h3>
    <h6 class="mt-2">Age</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.age, 'Age', '#ffa000')"
                 :options="histoOption"></Histogram>
    </b-card>
    <h6 class="mt-2">Nationality</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.country, 'Nationality', '#d81b60')"
                 :options="histoOption"></Histogram>
    </b-card>
    <h3 class="mt-3">Info Source</h3>
    <h6 class="mt-2">News</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.news, 'News', '#1976d2')"
                 :options="histoOption"></Histogram>
    </b-card>
    <h6 class="mt-2">Social Media</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.social, 'Social Media', '#ffa000')"
                 :options="histoOption"></Histogram>
    </b-card>
    <h6 class="mt-2">People</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.people, 'People', '#d81b60')"
                 :options="histoOption"></Histogram>
    </b-card>
    <h3 class="mt-3">Fact Check</h3>
    <h6 class="mt-2">Estimate global cases</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.case, 'Global cases', '#1976d2')"
                 :options="histoOption"></Histogram>
    </b-card>
    <h6 class="mt-2">Most Cases</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.top, 'Country', '#ffa000')"
                 :options="histoOption"></Histogram>
    </b-card>
    <h6 class="mt-2">Infection Route</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.spread, 'Route', '#d81b60')"
                 :options="histoOption"></Histogram>
    </b-card>
    <h6 class="mt-2">Mask Effectiveness</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.mask, 'Effectiveness', '#1976d2')"
                 :options="histoOption"></Histogram>
    </b-card>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import Histogram from "@/components/charts/Histogram"

export default {
  name: "Stats",
  components: {
    Histogram
  },
  data() {
    return {
      data: [],
      histoOption: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    formatGraphData(subject, label, color) {
      return {
        labels: Object.keys(subject),
        datasets: [
          {
            label,
            backgroundColor: color,
            data: Object.values(subject)
          }
        ]
      }
    }
  },
  computed: {
    totalAns() {
      return this.data.length;
    },
    freqData() {
      const result = {
        age: {},
        country: {},
        news: {},
        social: {},
        people: {},
        other: {},
        top: {},
        case: {},
        mask: {},
        spread: {}
      };
      for (let response of this.data) {
        // parse age
        if (result.age[parseInt(response.personal.age)]) {
          result.age[parseInt(response.personal.age)]++;
        } else {
          result.age[parseInt(response.personal.age)] = 1;
        }
        // parse country
        if (result.country[response.personal.country]) {
          result.country[response.personal.country]++;
        } else {
          result.country[response.personal.country] = 1;
        }
        // parse news
        for (let src of response.source.news) {
          if (result.news[src]) {
            result.news[src]++;
          } else {
            result.news[src] = 1;
          }
        }
        // parse social
        for (let src of response.source.social) {
          if (result.social[src]) {
            result.social[src]++;
          } else {
            result.social[src] = 1;
          }
        }
        // parse people
        for (let src of response.source.people) {
          if (result.people[src]) {
            result.people[src]++;
          } else {
            result.people[src] = 1;
          }
        }
        // parse others
        if (response.source.other.trim() !== '') {
          if (result.other[response.source.other.trim()]) {
            result.other[response.source.other.trim()]++;
          } else {
            result.other[response.source.other.trim()] = 1;
          }
        }
        // parse top
        if (result.top[response.facts.top]) {
          result.top[response.facts.top]++;
        } else {
          result.top[response.facts.top] = 1;
        }
        // parse case
        if (result.case[response.facts.case]) {
          result.case[response.facts.case]++;
        } else {
          result.case[response.facts.case] = 1;
        }
        // parse mask
        if (result.mask[response.facts.mask]) {
          result.mask[response.facts.mask]++;
        } else {
          result.mask[response.facts.mask] = 1;
        }
        // parse spread
        for (let src of response.facts.spread) {
          if (result.spread[src]) {
            result.spread[src]++;
          } else {
            result.spread[src] = 1;
          }
        }
      }
      // sort
      return result;
    }
  },
  created() {
    const db = firebase.firestore();
    db.collection('data').where("personal.age", ">", "0").onSnapshot((snapshot => {
      const newData = [];
      snapshot.forEach((doc) => {
        newData.push(doc.data());
      });
      this.data = newData;
    }));
  },
  mounted() {
    this.$emit('start');
  }
}
</script>

<style scoped>
</style>