<template>
  <div>
    <h1>Profil</h1>
    <p>Email Benachrichtigungen</p>
    <div id="benachIn">
      <input type="radio" name="email" value="0">Alle<br>
      <input type="radio" name="email" value="1">nur neue Versuche<br>
      <input type="radio" name="email" value="2">nur Anmeldebestätigung<br>
    </div>
    <br>
    <router-link to="/mv">meine Versuche</router-link>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';
  //console.log("home");

  import Firebase from '../js/Firebase';

  let myFirebase = new Firebase();

  function loadProfil() {
    setBenachChecked();
    setBenachListener();
  }

  function setBenachChecked() {
    let benachIndex = sessionStorage.getItem("benach"),
    benachDiv = document.getElementById("benachIn").children;

    for (let i=0; i<benachDiv.length; i++) {
      if (i == 2*benachIndex) { //2* weil input br
        benachDiv[i].checked = true;
      }
    }
  }

  function setBenachListener() { //save button?
  let benachDiv = document.getElementById("benachIn").children;

    for (let i=0; i<benachDiv.length; i+=2) {
      benachDiv[i].addEventListener("input", function() {
        myFirebase.setBenachDB(benachDiv[i].value);
        sessionStorage.setItem("benach", benachDiv[i].value);
      });
    }
  }

  export default {
    name: 'home',
    mounted: function() {loadProfil();},
  };
</script>
