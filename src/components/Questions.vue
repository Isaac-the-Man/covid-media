<template>
  <div>

    <transition name="fade">
      <b-progress v-if="progress <= 2" :class="['mb-3', 'appear-before', {'appear': progress > 0}]" :max="3">
        <b-progress-bar animated variant="success" :value="progress"
                        :label="`${((progress / 3) * 100).toFixed(1)}%`"></b-progress-bar>
      </b-progress>
    </transition>

    <transition name="slide-fade">

      <div v-if="progress === 0">
        <h3>Personal Information</h3>
        <b-form @submit="next">
          <!-- Age -->
          <b-form-group label="Age" label-for="q1-age">
            <b-form-input required id="q1-age" v-model="form.personal.age" type="number"></b-form-input>
          </b-form-group>
          <!-- Country -->
          <b-form-group label="Country" label-for="q1-country">
            <b-form-select required id="q1-country" v-model="form.personal.country"
                           :options="countryList"></b-form-select>
          </b-form-group>
          <!-- submit -->
          <b-button type="submit" variant="primary">Next</b-button>
        </b-form>
      </div>

    </transition>

    <transition name="slide-fade">

      <div v-if="progress === 1">
        <h3>Information Source</h3>
        <p>
          Where do you get most of your information about Covid-19? Please select all that applies.
        </p>
        <b-form @submit="next">
          <!-- News -->
          <b-form-group label="Online/TV News" label-for="q2-news">
            <b-form-checkbox-group id="q2-news" v-model="form.source.news" :options="newsList"></b-form-checkbox-group>
          </b-form-group>
          <!-- Social -->
          <b-form-group label="Social Media" label-for="q2-social">
            <b-form-checkbox-group id="q2-social" v-model="form.source.social"
                                   :options="socialList"></b-form-checkbox-group>
          </b-form-group>
          <!-- People -->
          <b-form-group label="People" label-for="q2-people">
            <b-form-checkbox-group id="q2-people" v-model="form.source.people"
                                   :options="peopleList"></b-form-checkbox-group>
          </b-form-group>
          <!-- Other -->
          <b-form-group label="Others" label-for="q2-other">
            <b-form-input id="q2-other" v-model="form.source.other" placeholder="other source"></b-form-input>
          </b-form-group>
          <!-- submit -->
          <b-button type="submit" variant="primary">Next</b-button>
        </b-form>
      </div>

    </transition>

    <transition name="slide-fade">

      <div v-if="progress === 2">
        <h3>Fact Check</h3>
        <p>
          Time for a little quiz on covid-19!
        </p>
        <b-form @submit="pushData">
          <!-- Worldwide cases -->
          <b-form-group label="Approximate Covid Cases Worldwide?" label-for="q3-case">
            <b-form-radio-group required id="q3-case" v-model="form.facts.case"
                                :options="caseOptions"></b-form-radio-group>
          </b-form-group>
          <!-- Spreading route -->
          <b-form-group label="How does it spread? (Select all that applies)" label-for="q3-spread">
            <b-form-checkbox-group id="q3-spread" v-model="form.facts.spread"
                                   :options="spreadOptions"></b-form-checkbox-group>
          </b-form-group>
          <!-- Top1 -->
          <b-form-group label="Most Infected Country?" label-for="q3-top">
            <b-form-select required id="q3-top" v-model="form.facts.top" :options="countryList"></b-form-select>
          </b-form-group>
          <!-- Mask -->
          <b-form-group label="Role of Mask?" label-for="q3-mask">
            <b-form-radio-group required id="q3-mask" v-model="form.facts.mask"
                                :options="maskOptions"></b-form-radio-group>
          </b-form-group>
          <!-- submit -->
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </div>

    </transition>

    <!-- end -->
    <transition name="fade-in">
      <div v-if="progress > 2" class="text-center">
        <h3>Thank You !</h3>
        <p class="lead">Mask up and stay safe!</p>
        <img class="mask-img" src="../assets/mask.png" alt="mask emoji">
      </div>
    </transition>

  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  name: "Questions",
  data() {
    return {
      progress: 0,  // section indicator
      form: {
        personal: {
          age: 0,
          country: null
        },
        source: {
          news: [],
          social: [],
          people: [],
          other: ''
        },
        facts: {
          case: null,
          spread: [],
          top: null,
          mask: null
        }
      },
      countryList: [
        {text: "Please Select a Country", value: null},
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands (the)",
        "Central African Republic (the)",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands (the)",
        "Colombia",
        "Comoros (the)",
        "Congo (the Democratic Republic of the)",
        "Congo (the)",
        "Cook Islands (the)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic (the)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (the) [Malvinas]",
        "Faroe Islands (the)",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories (the)",
        "Gabon",
        "Gambia (the)",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (the)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (the Democratic People's Republic of)",
        "Korea (the Republic of)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic (the)",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands (the)",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia (Federated States of)",
        "Moldova (the Republic of)",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands (the)",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger (the)",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands (the)",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines (the)",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation (the)",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan (the)",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands (the)",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates (the)",
        "United Kingdom of Great Britain and Northern Ireland (the)",
        "United States Minor Outlying Islands (the)",
        "United States of America (the)",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands"
      ],
      newsList: [
        "Yahoo News",
        "Google News",
        "Huffington Post",
        "CNN",
        "New York Times",
        "Fox News",
        "NBC News",
        "The Washington Post",
        "The Gaurdian",
        "WSJ",
        "ABC News",
        "BBC News",
        "USA Today",
        "LA Times"
      ],
      socialList: [
        "Instagram",
        "Facebook",
        "Youtube",
        "Twitter",
        "Reddit",
        "Snapchat",
        "Line",
        "WeChat"
      ],
      peopleList: [
        "Parents/family members",
        "Local Authorities (State Governer etc.)",
        "The President",
        "CDC officials"
      ],
      caseOptions: [
        "35,000 cases",
        "350,000 cases",
        "3.5M cases",
        "35M cases",
        "3.5B cases"
      ],
      spreadOptions: [
        'Airborne',
        'Fecal',
        'Surface (touch)',
        'Not Contagious'
      ],
      maskOptions: [
        'Mask effectively protects me and others from covid-19',
        'Mask is useless'
      ]
    }
  },
  methods: {
    next(evt) {
      evt.preventDefault();
      this.progress++;
    },
    async pushData(evt) {
      evt.preventDefault();
      this.progress++;
      const db = firebase.firestore();
      try {
        await db.collection('data').add(this.form);
        console.log('Form successfully recorded')
      } catch (e) {
        console.error('An error occurred while sending form data');
      }
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 1s ease;
  transition-delay: 1s;
}

.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */
{
  transform: translateX(10px);
  opacity: 0;
}

.appear-before {
  opacity: 0;
  transition: opacity 1s ease;
  transition-delay: 1s;
}

.appear {
  opacity: 1;
}

.mask-img {
  max-height: 240px;
}

.fade-leave-active {
  transition: all 0.5s ease;
  transition-delay: 1s;
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-in-enter-active {
  transition: opacity 0.5s;
  transition-delay: 1.8s;
}
.fade-in-enter {
  opacity: 0;
}

</style>