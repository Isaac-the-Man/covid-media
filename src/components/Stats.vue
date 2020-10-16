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
    <h6 class="mt-2">Others</h6>
    <b-card>
      <vue-word-cloud
          style="
    height: 480px;
    width: 640px;
  "
          :words="freq2Array(freqData.other)"
          :color="([, weight]) => weight > 10 ? 'DeepPink' : weight > 5 ? 'RoyalBlue' : 'Indigo'"
          font-family="Roboto"
      />
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
    <h3 class="mt-3">Analysis</h3>
    <h6 class="mt-2">Score Distribution</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.scoreDist, 'Score Distribution', '#ffa000')"
                 :options="histoOption"></Histogram>
    </b-card>
    <h6 class="mt-2">Question Distribution</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.questionDist, 'Question Distribution', '#d81b60')"
                 :options="histoOption"></Histogram>
    </b-card>
    <h6 class="mt-2">News Distribution by score</h6>
    <b-card>
      <Histogram :chart-data="formatMultipleGraphData(freqData.newsScoreDist)"
                 :options="histoOption"></Histogram>
    </b-card>
    <h6 class="mt-2">Social Media Distribution by score</h6>
    <b-card>
      <Histogram :chart-data="formatMultipleGraphData(freqData.socialScoreDist)"
                 :options="histoOption"></Histogram>
    </b-card>
    <h6 class="mt-2">People Distribution by score</h6>
    <b-card>
      <Histogram :chart-data="formatMultipleGraphData(freqData.peopleScoreDist)"
                 :options="histoOption"></Histogram>
    </b-card>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import Histogram from "@/components/charts/Histogram"
import VueWordCloud from 'vuewordcloud'

export default {
  name: "Stats",
  components: {
    Histogram,
    [VueWordCloud.name]: VueWordCloud
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
    freq2Array(freq) {
      const arr = [];
      for (let [key, value] of Object.entries(freq)) {
        arr.push([key, value]);
      }
      return arr;
    },
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
    },
    getUnique(arr) {
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      return arr.filter(onlyUnique);
    },
    formatMultipleGraphData(subjects) {
      const colors = ['#ffa000', '#d81b60', '#1976d2', '#4CAF50', '#9E9E9E', '#795548'];
      let counter = 0;
      const allSubjects = [];
      const allData = [];
      for (let value of Object.values(subjects)) {
        allSubjects.push(...Object.keys(value));
      }
      const unique = this.getUnique(allSubjects);
      for (let [key, value] of Object.entries(subjects)) {
        const sum = Object.values(value).reduce((a, b) => a + b, 0)
        const data = [];
        for (let i of unique) {
          data.push((value[i] / sum).toPrecision(2));
        }
        allData.push({
          label: key,
          backgroundColor: colors[counter],
          data
        });
        ++counter;
      }
      return {
        labels: unique,
        datasets: allData
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
        spread: {},
        scoreDist: {},
        questionDist: {
          top: 0,
          case: 0,
          mask: 0,
          spreadAir: 0,
          spreadSur: 0,
          spreadFec: 0
        },
        newsScoreDist: {},
        socialScoreDist: {},
        peopleScoreDist: {}
      };
      for (let response of this.data) {
        // parse score
        let points = 0;
        if (response.facts.top === "United States of America (the)") {
          ++points;
          result.questionDist.top++;
        }
        if (response.facts.case === "35M cases") {
          ++points;
          result.questionDist.case++;
        }
        if (response.facts.mask === "Mask effectively protects me and others from covid-19") {
          ++points;
          result.questionDist.mask++;
        }
        if (response.facts.spread.includes("Airborne")) {
          ++points;
          result.questionDist.spreadAir++;
        }
        if (response.facts.spread.includes("Surface (touch)")) {
          ++points;
          result.questionDist.spreadSur++;
        }
        if (response.facts.spread.includes("Fecal")) {
          ++points;
          result.questionDist.spreadFec++;
        }
        if (result.scoreDist[points]) {
          result.scoreDist[points]++;
        } else {
          result.scoreDist[points] = 1;
        }
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
          if (result.newsScoreDist[points]) {
            if (result.newsScoreDist[points][src]) {
              result.newsScoreDist[points][src]++;
            } else {
              result.newsScoreDist[points][src] = 1;
            }
          } else {
            result.newsScoreDist[points] = {};
          }
        }
        // parse social
        for (let src of response.source.social) {
          if (result.social[src]) {
            result.social[src]++;
          } else {
            result.social[src] = 1;
          }
          if (result.socialScoreDist[points]) {
            if (result.socialScoreDist[points][src]) {
              result.socialScoreDist[points][src]++;
            } else {
              result.socialScoreDist[points][src] = 1;
            }
          } else {
            result.socialScoreDist[points] = {};
          }
        }
        // parse people
        for (let src of response.source.people) {
          if (result.people[src]) {
            result.people[src]++;
          } else {
            result.people[src] = 1;
          }
          if (result.peopleScoreDist[points]) {
            if (result.peopleScoreDist[points][src]) {
              result.peopleScoreDist[points][src]++;
            } else {
              result.peopleScoreDist[points][src] = 1;
            }
          } else {
            result.peopleScoreDist[points] = {};
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