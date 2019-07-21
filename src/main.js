import Vue from 'vue';
import Firebase from 'firebase';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAeEM115w4jlyaBcTzSnhAtASvoONr6O7o",
  authDomain: "vptest-75d08.firebaseapp.com",
  databaseURL: "https://vptest-75d08.firebaseio.com",
  projectId: "vptest-75d08",
  storageBucket: "vptest-75d08.appspot.com",
  messagingSenderId: "639633076981",
  appId: "1:639633076981:web:e752c83c6edf89cb"
};
// Initialize Firebase
Firebase.initializeApp(firebaseConfig);

  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app');
