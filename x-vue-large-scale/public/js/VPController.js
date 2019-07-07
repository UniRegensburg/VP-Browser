/* eslint-env browser */
/* global Vue, VueRouter */

var VPController = VPController || {};
VPApp.VPController = function() {
  "use strict";

  var that = {},
  vName = "";

  function initVPController(VPModel, VPView) {
    console.log("VPController")
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
    var values = [
      { name: 'a versuch', typ: 'online', dauer: '0.5', VP: '0.5 VP', leiter: 'lucas' }
      , { name: 'super', typ: 'tagebuch', dauer: '1.5', VP: '1.5 VP', leiter: 'maria' }
      , { name: 'd', typ: 'öner', dauer: '1', VP: '1 VP', leiter: 'mann' }
    ];

    var hackerList = new List('hacker-list', options, values);
    /*
    var options = {
      valueNames: [ 'name', 'city' ]
    };

    var hackerList = new List('hacker-list', options);
    */
    setupNamenListener();
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
    sessionStorage.removeItem('versuch');
    console.log(vName);
    //var vdTyp = document.getElementById("vdTyp");
    //vdTyp.innerHTML = "online, tagebuch, vr; kat + js";
  }

  function jumpToVDetail() { //nicht mehr nötig
    window.location.href = "http://localhost:8080/vd"; //durch server ip ersetzen
    //button weil router keine para wie vid (später zum seite generieren)
  }

  that.initVPController = initVPController;
  that.conLoadHome = conLoadHome;
  that.conLoadVersuche = conLoadVersuche;
  that.conLoadVDetail = conLoadVDetail;
  return that;
};
