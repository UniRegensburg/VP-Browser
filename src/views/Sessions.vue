<template>
  <div class="main">
    <h1><a href="/vd" id="sessionTitel"></a></h1>
    <p>Termine</p>
    <div id="sessionSlots"></div>
    <!-- wie bei doodle gefüllte slots zeigen und nicht klickbar?, label außen rum? -->
    <br>
    <button id="vAnmelden">für Session anmelden</button>
    <h4 id="alreadyRec">Sie sind bereits für eine Session angemeldet</h4>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';
  import Firebase from '../js/Firebase';

  let myFirebase = new Firebase(),
  vName = "",
  checkedIndex,
  sArray = [],
  lockedSessionsString = "",
  versuch;

  function loadSessions() {
    vName = sessionStorage.getItem('versuch');

    let strVN = vName.replace(/_/g, " ");
    document.getElementById("sessionTitel").innerHTML = strVN;

    versuch = myFirebase.getVersuch();
    let sessionString = versuch.sessions.replace(/~~/g, "");
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
          btn.disabled = true;
        }
      }
      wrapDiv.appendChild(btn);

      //innerText
      wrapDiv.innerHTML += sArray[i] + "</br>";

      sessionDiv.appendChild(wrapDiv);
    }

    setupRadioListener();
    if (!(checkAlreadyReg())) {
      let alreadyRec = document.getElementById("alreadyRec");
      setupAnmeldeButton();
      alreadyRec.style.visibility = "hidden";
    } else {
      console.log("already");
      let alreadyRec = document.getElementById("alreadyRec"),
      btn = document.getElementById("vAnmelden");
      alreadyRec.style.visibility = "visible";
      btn.disabled = true;
    }
  }

  function checkAlreadyReg() {
    let lvs = sessionStorage.getItem("lvs");
    if (lvs.includes(vName)) {
      console.log("already");
      return true;
    } else {
      console.log("not alr");
      return false;
    }
  }

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

  function anmeldeFkt() { //TODO sich ansammelnde ~ in db löschen - done
    let sesStr = sArray[checkedIndex],
    userSesStr = "~" + vName + "+" + sesStr, //~ nötig zum splitten
    lvsStr = sessionStorage.getItem("lvs").replace(/~~/g, "")+userSesStr,
    newSesStr = lockedSessionsString + "~" + sesStr,
    vArray = myFirebase.convertVStrToArray(sessionStorage.getItem("vArrayStr"));;

    sessionStorage.setItem("lvs", lvsStr);
    myFirebase.userVAnAbmelden(lvsStr);

    versuch.lockedSes = newSesStr; //TODO in vArray - oder db neu laden
    myFirebase.lockedSesUpdate(newSesStr, versuch.name);

    let sessionDiv = document.getElementsByClassName("inlineP");
    console.log(sesStr);
    for (let i=0; i<sessionDiv.length; i++) {
      console.log(sessionDiv[i].innerText.slice(0, -1));
      if (sesStr == sessionDiv[i].innerText.slice(0, -1)) {
        sessionDiv[i].children[0].disabled = true;
      }
    }

    for (let i=0; i<vArray.length; i++) {
      if (versuch.name == vArray[i].name) {
        vArray[i] = versuch;
      }
    }

    alert("Erfolgreich für Session angemeldet.");
    let alreadyRec = document.getElementById("alreadyRec"),
    btn = document.getElementById("vAnmelden");
    alreadyRec.style.visibility = "visible";
    btn.disabled = true;
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
  #alreadyRec {
    color: red;
  }
</style>
