/* eslint-env browser */
/* global Vue, VueRouter */

var VPController = VPController || {};
VPApp.VPController = function() {
  "use strict";

  var that = {},
  vName = "",
  wipData = [],
  wipAcc = [];

  function initVPController(VPModel, VPView) {
    console.log("VPController")
    fillWipData();
    createWipAcc();
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
    console.log(wipData);
  }
  //vid adden?

  function createWipAcc() {
    let acc = {
      "name" : "testUser",
      "v+s" : "a_versuch+01.01.10 10:00"
    }
    wipAcc = [acc];
    console.log(wipAcc);
  }

  function conLoadHome() {
    console.log("home");
  }

  function conLoadVersuche() {
    //liste laden und mit framework (bsp underscore) darstellen?
    console.log("about");

    var options = {
      valueNames: [ 'name', 'typ', 'dauer', 'VP', 'leiter' ],
      item: '<li><a href="/vd" class="name"></a><p class="typ"></p><p class="dauer"></p><p class="VP"></p><p class="leiter"></p></li>'
    };
    //name soll verlinken
    //a-tag: verlinkt und lädt seite neu -> verliere versuchsinfo, wie window.location
    //router-link: von vue nicht konvertiert, da es im list.js framework ist
    /*var values = [
      { name: 'a versuch', typ: 'online', dauer: '0.5', VP: '0.5 VP', leiter: 'lucas' }
      , { name: 'super', typ: 'tagebuch', dauer: '1.5', VP: '1.5 VP', leiter: 'maria' }
      , { name: 'd', typ: 'öner', dauer: '1', VP: '1 VP', leiter: 'mann' }
    ];
    */
    var hackerList = new List('hacker-list', options, wipData); //wipData <-> values
    /*
    var options = {
      valueNames: [ 'name', 'city' ]
    };

    var hackerList = new List('hacker-list', options);
    */
    setupNamenListener();
  }

  function getValuesFromDB() {
    //
  }

  function setupNamenListener() {
    console.log("setup");
    let namen = document.getElementsByClassName("name");
    for (let i=0; i<namen.length; i++) {
      namen[i].addEventListener("click", listenForNames);
    }
  }

  function listenForNames() {
    let namen = document.getElementsByClassName("name");
    console.log(event);
    vName = event.path[0].innerText;
    vName = vName.replace(" ", "_");
    console.log(vName);
    sessionStorage.setItem('versuch', vName);
    //window.location.href = "http://localhost:8080/vd";
    //lädt seite neu, hats im alten system nicht -> event und damit versuch weg
    //auf vue router zugreifen
    //this.$router.replace('/vd');
    //in anderen projekten genutzt, finde this.$router nicht
    //->nicht sicher, ob es das problem lösen würde

    //wenn db funktioniert und schnell genug ist:
    //current versuch bei onclick in db laden und bei vdetail ziehen
    //wahlweise doch session storage?
  }

  function conLoadVDetail() {
    //aufruf braucht versuchs id um inhalt aus db zu laden
    //vname
    vName = sessionStorage.getItem('versuch');
    //sessionStorage.removeItem('versuch');
    console.log(vName);
    //var vdTyp = document.getElementById("vdTyp");
    //vdTyp.innerHTML = "online, tagebuch, vr; kat + js";

    //name als überschrift
    let strVN = vName.replace("_", " ");
    document.getElementById("vdvName").innerHTML = strVN;

    //load liste
    let versuch = getVersuch(); //später query
    var options = {
      valueNames: ['typ', 'end', 'dauer', 'VP', 'descr', 'session', 'raum', 'leiter', 'email', 'lehrkraft'],
      item: '<li><p class="typ"></p><p class="end"></p><p class="dauer"></p><p class="VP"></p><p class="descr"></p></br><a href="/sessions" class="session"></a><p class="raum"></p></br><p class="leiter"></p><p class="email"></p></p class="lehrkraft"></p></li>'};
    var detailList = new List('detail-list', options, versuch);
  }

  function getVersuch() {
    for (let i=0; i<wipData.length; i++) {
      if(wipData[i].name === vName) {
        return(wipData[i]);
      }
    }
  }

  function jumpToVDetail() { //nicht mehr nötig
    window.location.href = "http://localhost:8080/vd"; //durch server ip ersetzen
    //button weil router keine para wie vid (später zum seite generieren)
  }

  function conLoadProfil() {
    console.log("profil");
  }

  function conLoadSessions() {
    vName = sessionStorage.getItem('versuch');
    //sessionStorage.removeItem('versuch');
    console.log("sessions");
    console.log(vName);

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
    //disablen?S
  }

  function conLoadMV() {
    console.log("mv");
  }
  that.initVPController = initVPController;
  that.conLoadHome = conLoadHome;
  that.conLoadVersuche = conLoadVersuche;
  that.conLoadVDetail = conLoadVDetail;
  that.conLoadProfil = conLoadProfil;
  that.conLoadSessions = conLoadSessions;
  that.conLoadMV = conLoadMV;
  return that;
};
