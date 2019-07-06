import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';

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
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let dbRef = firebase.database();
let nutzer = dbRef.ref('nutzer');
console.log(nutzer);
db.collection("nutzer").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        let inhalt = doc.data();
        console.log(inhalt.name);
    });
});

//problem: firebase in public/js nicht verfügbar

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
