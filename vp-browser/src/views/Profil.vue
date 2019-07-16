<template>
  <div>
    <h1 id="profilH1">Profil</h1>
    <p>Email Benachrichtigungen</p>
    <div id="benachIn">
      <input type="radio" name="email" value="0">Alle<br>
      <input type="radio" name="email" value="1">nur neue Versuche<br>
      <input type="radio" name="email" value="2">nur Anmeldebestätigung<br>
      <input type="radio" name="email" value="3">Keine<br>
    </div>
    <button id="benachButton">Einstellungen speichern</button>
    <br>
    <router-link to="/mv">meine Versuche</router-link>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';
  //console.log("home");

  import Firebase from '../js/Firebase';

  let myFirebase = new Firebase(),
  benachValue;

  function loadProfil() {
    setH1();
    setBenachListener();
    setBenachChecked();
    setSpeichern();
  }

  function setH1() {
    let h1 = document.getElementById("profilH1");
    h1.innerText = h1.innerText + " - " + sessionStorage.getItem("nutzerName");
  }

  function setBenachListener() {
    let boxes = document.getElementsByName("email");
    for (let i=0; i<boxes.length; i++) {
      boxes[i].addEventListener("input", function() {
        if (boxes[i].checked) {
          benachValue = boxes[i].value;
        }
      })
    }
  }

  function setBenachChecked() {
      let benachValue = sessionStorage.getItem("benach"),
      boxes = document.getElementsByName("email");

      for (let i=0; i<boxes.length; i++) {
        if (boxes[i].value == benachValue) {
          boxes[i].checked = true;
        }
      }
  }

  function setSpeichern() { //save button?
    let benachButton = document.getElementById("benachButton");

    benachButton.addEventListener("click", function() {
      myFirebase.setBenachDB(benachValue);
      sessionStorage.setItem("benach", benachValue);
    });
  }

  export default {
    name: 'home',
    mounted: function() {loadProfil();},
  };
</script>
