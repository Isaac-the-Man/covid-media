import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import firebase from "firebase/app"
import { VueReCaptcha } from 'vue-recaptcha-v3'


// initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyCUQ6DtlGxAb4x3Z9DABeLLdP13-NnwbzI",
  authDomain: "covid-media-69879.firebaseapp.com",
  databaseURL: "https://covid-media-69879.firebaseio.com",
  projectId: "covid-media-69879",
  storageBucket: "covid-media-69879.appspot.com",
  messagingSenderId: "6701311558",
  appId: "1:6701311558:web:ac6a7b1c2aa6168c9a4c47",
  measurementId: "G-N1GT658K2S"
};
firebase.initializeApp(firebaseConfig);

// font awesome
library.add(faGithub);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueReCaptcha, {
  siteKey: '6LeHg9QZAAAAAMdRBOzGNU0_1Fs-GsT_MFtLusN7',
  loaderOptions: {
    useRecaptchaNet: true
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app');
