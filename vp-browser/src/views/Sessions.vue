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

  var wipData = [],
  vName = "";

  function loadSessions() {
    vName = sessionStorage.getItem('versuch');

    //name als überschrift
    let strVN = vName.replace("_", " ");
    document.getElementById("sessionTitel").innerHTML = strVN;

    let versuch = getVersuch();
    let sessionString = versuch.sessions; //schlecht benannt mit sessions
    let lockedSessionsString = versuch.lockedSessions;
    let sArray = sessionString.split(";");
    let lsArray = lockedSessionsString.split(";");
    console.log(sArray);

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

  function getVersuch() {
    fillWipData();
    for (let i=0; i<wipData.length; i++) {
      if(wipData[i].name === vName) {
        return(wipData[i]);
      }
    }
  }

  function fillWipData() {
    let set1 = {
      "name" : "a_versuch",
      "typ" : "online",
      "dauer" : "0.5",
      "VP" : "0.5 vp",
      "leiter" : "lucas",
      "sessions" : "01.01.10 10:00;01.01.11 11:00;01.02.12 12:00;99.99.99 99:15",
      "end" : "01.03.13",
      "descr" : "hexenschuss",
      "raum" : "h6",
      "email" : "lucas@mail.de",
      "lehrkraft" : "Prof. Dr. Peter Gehr",
      "session" : "Sessionsknopf",
      "lockedSessions" : "01.01.10 10:00"
    };
    let set2 = {
      "name" : "super",
      "typ" : "tagbeuch",
      "dauer" : "1.5",
      "VP" : "1.5 vp",
      "leiter" : "maria"
    };
    let set3 = {
      "name" : "d",
      "typ" : "öner",
      "dauer" : "1",
      "VP" : "1 vp",
      "leiter" : "mann",
      "sessions" : "09.07.19 14:00;10.07.19 14:00;10.07.19 15:00",
      "end" : "02.00.20",
      "descr" : "bimstein",
      "raum" : "pt cafete",
      "email" : "e@mail.de",
      "lehrkraft" : "tom & jerry",
      "session" : "Sessionsknopf",
      "lockedSessions" : ""
    };
    wipData = [set1, set2, set3];
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
