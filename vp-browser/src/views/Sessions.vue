<template>
  <div>
    <h1><a href="/vd" id="sessionTitel"></a></h1>
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
  vName = "",
  checkedIndex,
  sArray = [],
  lockedSessionsString = "",
  versuch;

  function loadSessions() {
    vName = sessionStorage.getItem('versuch');

    //name als überschrift
    let strVN = vName.replace("_", " ");
    document.getElementById("sessionTitel").innerHTML = strVN;

    versuch = myFirebase.getVersuch();
    let sessionString = versuch.sessions; //schlecht benannt mit sessions
    lockedSessionsString = versuch.lockedSes;
    sArray = sessionString.split("~");
    let lsArray = lockedSessionsString.split("~");

    for (let i=0; i<sArray.length; i++) {
      if (sArray[i].length == 0) {
        sArray.splice(i, 1);
      }
    }

    for (let i=0; i<lsArray.length; i++) {
      if (lsArray[i].length == 0) {
        lsArray.splice(i, 1);
      }
    }

    console.log(lsArray);

    let sessionDiv = document.getElementById("sessionSlots");
    sessionDiv.innerHTML = "";

    for (let i=0; i<sArray.length; i++) {
      var wrapDiv = document.createElement("DIV");
      wrapDiv.className = "inlineP";

      var btn = document.createElement("INPUT");
      btn.type = "radio";
      btn.name = "session";
      btn.value = i;
      for (let j=0; j<lsArray.length; j++) {
        if (sArray[i] === lsArray[j]) {
          //btn.checked = "true"; //geht nicht - siehe versuche
          btn.disabled = true; //geht - besser sichtbar machen
        }
      }
      //btn.innerText = sArray[i];
      wrapDiv.appendChild(btn);

      //innerText
      wrapDiv.innerHTML += sArray[i] + "</br>";

      sessionDiv.appendChild(wrapDiv);
    }

    setupRadioListener();
    setupAnmeldeButton();
  }

  //TODO div wenn man bereits eine session belegt hat

  function setupRadioListener() {
    let radio = document.getElementsByName("session");
    for (let i=0; i<radio.length; i++) {
      radio[i].addEventListener("input", function() {
        checkedIndex = radio[i].value;
        console.log(checkedIndex);
      })
    }
  }

  function setupAnmeldeButton() {
    let btn = document.getElementById("vAnmelden");
    btn.addEventListener("click", anmeldeFkt);
  }

  function anmeldeFkt() { //TODO sich ansammelnde ~ in db löschen
    let sesStr = sArray[checkedIndex],
    userSesStr = "~" + vName + "+" + sesStr, //~ nötig zum splitten
    lvsStr = sessionStorage.getItem("lvs")+userSesStr,
    newSesStr = lockedSessionsString + "~" + sesStr;
    //console.log(sesStr, userSesStr);

    sessionStorage.setItem("lvs", lvsStr);
    myFirebase.userVAnAbmelden(lvsStr);

    console.log(versuch.lockedSes, newSesStr);
    versuch.lockedSes = newSesStr;
    myFirebase.lockedSesUpdate(newSesStr, versuch.name);
    console.log(versuch.lockedSes, newSesStr);

    let sessionDiv = document.getElementsByClassName("inlineP");
    for (let i=0; i<sessionDiv.length; i++) {
      if (sesStr = sessionDiv[i].innerText.slice(0, -1)) {
        sessionDiv[i].disabled = true; //TODO alert setzen?
      }
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
