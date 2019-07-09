import Vue from 'vue';
import firebase from 'firebase';
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
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

let testlvs = "";
function getUserDoc() {
  db.collection("nutzer").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          //console.log(`${doc.id} => ${doc.data()}`);
          if (doc.id === "test") {
            let inhalt = doc.data();
            console.log(doc.id); //rz kennung
            console.log(inhalt.name); //unwichtig
            console.log(inhalt.lvs); // gelockte versuche
            testlvs = inhalt.lvs;
            console.log(testlvs);
          }
      });
  });
}

getUserDoc();

function pushNewUser() {
  db.collection("nutzer").doc("t3").set({
      name: "t3",
      lvs: "text"
  })
  .then(function() {
      //console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
}

function writeData() {
  db.collection("nutzer").doc("t2").update({
      lvs: "iwas vom code2"
  })
  .then(function() {
      //console.log("Document successfully updated!");
  });
}

//problem: firebase in public/js nicht verfügbar



new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

/* mom noch ohne
vue add vuex
*/
