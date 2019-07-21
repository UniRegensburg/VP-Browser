<template>
  <div class="main">
    <h1 id="profilH1">Profil</h1>
    <p>Email Benachrichtigungen</p>
    <div id="benachIn">
      <input type="radio" name="email" value="0">Alle<br>
      <input type="radio" name="email" value="1">nur neue Versuche<br>
      <input type="radio" name="email" value="2">nur Anmeldebestätigung<br>
      <input type="radio" name="email" value="3">Keine<br>
    </div>
    <button id="benachButton">Einstellungen speichern</button>
    <p id="einstSaved">Einstellungen erfolgreich gespeichert.</p>
    <br>
    <router-link to="/mv">meine Versuche</router-link>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';

  import Firebase from '../js/Firebase';

  let myFirebase = new Firebase(),
  benachValue;

  function loadProfil() {
    setText();
    setBenachListener();
    setBenachChecked();
    setSpeichern();
  }

  function setText() {
    let h1 = document.getElementById("profilH1"),
    savedTag = document.getElementById("einstSaved");
    h1.innerText = h1.innerText + " - " + sessionStorage.getItem("nutzerName");
    savedTag.style.visibility = "hidden";
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
      let savedTag = document.getElementById("einstSaved");
      savedTag.style.visibility = "visible";

      myFirebase.setBenachDB(benachValue);
      sessionStorage.setItem("benach", benachValue);
    });
  }

  export default {
    name: 'home',
    mounted: function() {loadProfil();},
  };
</script>
