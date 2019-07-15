<template>
  <div>
    <h1 id="sessionTitel"></h1>
    <p>Termine</p>
    <div id="sessionSlots"></div>
    <!-- wie bei doodle gefüllte slots zeigen und nicht klickbar?, label außen rum? -->
    <br>
    <button id="vAnmelden">für Session anmelden</button>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';
  //console.log("home");
  import Firebase from '../js/Firebase';

  let myFirebase = new Firebase(),
  vName = "";

  function loadSessions() {
    vName = sessionStorage.getItem('versuch');

    //name als überschrift
    let strVN = vName.replace("_", " ");
    document.getElementById("sessionTitel").innerHTML = strVN;

    let versuch = myFirebase.getVersuch();
    let sessionString = versuch.sessions; //schlecht benannt mit sessions
    let lockedSessionsString = versuch.lockedSes;
    let sArray = sessionString.split("~");
    let lsArray = lockedSessionsString.split("~");
    //console.log(sArray);

    let sessionDiv = document.getElementById("sessionSlots");

    for (let i=0; i<sArray.length; i++) {
    var wrapDiv = document.createElement("DIV");
    wrapDiv.className = "inlineP";

    var btn = document.createElement("INPUT");
    btn.type = "radio";
    btn.name = "session";
    btn.value = i;
    for (let j=0; j<lsArray.length; j++) {
      if (sArray[i] === lsArray[j]) {
        //btn.checked = "true"; //geht nicht
        btn.disabled = true; //geht
      }
    }
    //btn.innerText = sArray[i];
    wrapDiv.appendChild(btn);

    //innerText
    wrapDiv.innerHTML += sArray[i] + "</br>";

    sessionDiv.appendChild(wrapDiv);
  }

}

  export default {
    name: 'home',
    mounted: function() {loadSessions();},
  };
</script>

<style>
  .inlineP {
    display: inline;
  }
</style>
