<template>
  <div>
    Total Responds: {{ totalAns }} | Conducted between 2020-10-6 ~ 2020-10-20
    <h3 class="mt-3">Personal</h3>
    <h6 class="mt-2">Age</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.age, 'Age', '#ffa000')"
                 :options="histoOption"></Histogram>
    </b-card>
    <p>The target of the survey is mainly students of RPI. The survey was distributed through the affiliated discord
      servers and RPI’s subreddit. The vast majority of the respondents were between 18 to 22 years old.
    </p>
    <h6 class="mt-2">Nationality</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.country, 'Nationality', '#d81b60')"
                 :options="histoOption"></Histogram>
    </b-card>
    <p>As expected, most of the response came from Students of the United States of America. </p>
    <h3 class="mt-3">Info Source</h3>
    <h6 class="mt-2">News</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.news, 'News', '#1976d2')"
                 :options="histoOption"></Histogram>
    </b-card>
    <p>The top trusted news sources of Covid-19 for the students at RPI are New York Times, Google News, and CNN, and
      the Washington’s Post. The rest are more even distributed among the respondents.
    </p>
    <h6 class="mt-2">Social Media</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.social, 'Social Media', '#ffa000')"
                 :options="histoOption"></Histogram>
    </b-card>
    <p>As to Social Media uses for gathering information on Covid-19, Reddit, Instagram and Youtube have the highest
      percentage. With Twitter, Facebook and Snapchat a little bit behind. However, there is a bias for Reddit since
      this survey was posted on the RPI’s subreddit. </p>
    <h6 class="mt-2">People</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.people, 'People', '#d81b60')"
                 :options="histoOption"></Histogram>
    </b-card>
    <p>For trusted people for Covid-19 information, the top source is Parents and Family members. Not too far behind is
      Local authorities and CDC officials. However, the president has been given a surprisingly low trust for Covid-19
      with only 12 out of the total 136 respondents listening to him.</p>
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
    <p>Other trusted sources are fairly scattered, with “Friends” having the highest percentage.</p>
    <h3 class="mt-3">Fact Check</h3>
    <h6 class="mt-2">Estimate global cases</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.case, 'Global cases', '#1976d2')"
                 :options="histoOption"></Histogram>
    </b-card>
    <p>According to the graph, only about half of the total respondents correctly identify the estimated global cases
      (35M).</p>
    <h6 class="mt-2">Most Cases</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.top, 'Country', '#ffa000')"
                 :options="histoOption"></Histogram>
    </b-card>
    <p>For Countries with the most cases, about 80% of the total respondents have the correct answer (US).</p>
    <h6 class="mt-2">Infection Route</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.spread, 'Route', '#d81b60')"
                 :options="histoOption"></Histogram>
    </b-card>
    <p>Although almost every respondents identify Covid-19 as an airborne disease, only about 65% percent also identify
      touching as an infection route, and only about 17% correctly identify the fecal infection route. </p>
    <h6 class="mt-2">Mask Effectiveness</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.mask, 'Effectiveness', '#1976d2')"
                 :options="histoOption"></Histogram>
    </b-card>
    <p>Almost every respondent correctly identifies the effectiveness of masks on Covid-19.</p>
    <h3 class="mt-3">Analysis</h3>
    <h6 class="mt-2">Score Distribution</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.scoreDist, 'Score Distribution', '#ffa000')"
                 :options="histoOption"></Histogram>
    </b-card>
    <p>The score distribution is rather normal, with 4 points as the median (on a scale of 0 ~ 6)</p>
    <h6 class="mt-2">Question Distribution</h6>
    <b-card>
      <Histogram :chart-data="formatGraphData(freqData.questionDist, 'Question Distribution', '#d81b60')"
                 :options="histoOption"></Histogram>
    </b-card>
    <p>The above graph shows the percentage of correct response for each question. It seems that students at RPI have
      lower awareness of the total global cases and the fecal infection route.</p>
    <h6 class="mt-2">News Distribution by score</h6>
    <b-card>
      <Histogram :chart-data="formatMultipleGraphData(freqData.newsScoreDist)"
                 :options="histoOption"></Histogram>
    </b-card>
    <p>Above is the distribution of the news sources by score. The New York Times has the highest view rate among the
      respondents, and is largely read by almost all score distribution, meaning that the New York Times has a somewhat
      neutral effect on the score of the respondents. For Google News, it is largely read by respondents who score a 5,
      but also has a fairly high amount of readers with a score of 3 and 4. This means that Google News also has a
      somewhat neutral effect on respondent’s scores. For CNN, there is a positive relation between reader score and
      view rate, with readers who score a 6 having the highest view rate and readers who score a 2 having the lowest
      view rate. This means that CNN has a positive association with respondent’s scores. The Washington Post, USA
      Today, and Huffington Post are extreme in terms of score distribution, but the overall average shows that they
      have neutral effects on readers’ score. On the other hands, Fox News and WSJ has a clear negative relationship
      with respondent’s scores, and both have a below then average
      (average is 4) score points.</p>
    <h6 class="mt-2">Social Media Distribution by score</h6>
    <b-card>
      <Histogram :chart-data="formatMultipleGraphData(freqData.socialScoreDist)"
                 :options="histoOption"></Histogram>
    </b-card>
    <p>Here is the distribution of social media by score. Instagram tends to have a negative association with reader’s
      score (as much as 29% of respondents who use instagram scores only 2). Reddit and Facebook are relatively neutral.
      Youtube has a clear positive relationship with high score, and twitter has a slightly positive association with
      score. Snapchat seems to have a negative effect on respondent’s scores, while we don’t really have enough data to
      assess WeChat.</p>
    <h6 class="mt-2">People Distribution by score</h6>
    <b-card>
      <Histogram :chart-data="formatMultipleGraphData(freqData.peopleScoreDist)"
                 :options="histoOption"></Histogram>
    </b-card>
    <p>Finally we have the distribution of people by score. Parents and family members have a positive relationship with
      score, while Local Authorities and the CDC officials are more neutral. The President, however, has a clear
      negative relationship with the respondent’s score. </p>
    <h6 class="mt-2">Conclusion</h6>
    <p>In conclusion, assuming most of the sample population is between age 18 to 22, is a citizen of the United States,
      and is a student associated with RPI, we have a median score of 4 as a whole (on a scale of 0 ~ 6). As for facts
      regarding Covid-19, more than 50% of the sample failed to acknowledge the estimated cases globally and the virus’
      ability to spread through fecal contamination. The news source that is associated with high scores is CNN, while
      Fox News and WSJ are generally associated with low scores. For media, Youtube and Twitter tends to have a positive
      relationship with score while Instagram and Snapchat has a negative association. Finally, parents and family
      members are positively associated with score, while the president has a negative association with score. The
      association observed in the statistical study merely describes the relationship (either positive, negative, or
      neutral) between two variables, but does not indicate the cause of such association (for ex, it is unclear whether
      it is the president who caused the score to be low or it’s just that low scorers tends to listen from the
      president).</p>
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