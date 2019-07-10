<template>
  <div>
    <h1>Home</h1>
    <div>
      <h3>Nächster Versuch</h3>
      <p><router-link to="/vd">Name</router-link></p>
      <p>Zeit</p>
      <p>Raum</p>
    </div>
    <br>
    <router-link to="versuche">Versuchsliste</router-link>
    <br>
    <br>
    <router-link to="profil">mein Profil</router-link>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';
  //console.log("home");
  import Firebase from '../js/Firebase';

  let myFirebase = new Firebase();
  function initHome() {
    //let db = firebase.firestore();
    test();
    //myFirebase.getAllVersuche();
    //myFirebase.getUserDoc();
    //myFirebase.pushNewUser();
    //myFirebase.writeData();
    console.log(sessionStorage.getItem("nutzerName"));
    //let vArrayStr = sessionStorage.getItem("vArrayStr");
    //console.log(vArrayStr);
    //let vArray = myFirebase.convertVStrToArray(vArrayStr);
    //console.log(vArray);
    getFirstVersuch();
  }

  function getFirstVersuch() {
    //let userData = myFirebase.getUser();
    //console.log(userData);
    //getFirstFromVStr(userData.lvs);
  }

  function getFirstFromVStr(vStr) {

  }

  function test() {
  console.log("home");
  }

  export default {
    name: 'home',
    mounted: function() {initHome();},
  };
</script>
