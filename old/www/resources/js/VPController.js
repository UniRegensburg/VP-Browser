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
      item: '<li><h3 class="name"></h3><p class="typ"></p><p class="dauer"></p><p class="VP"></p><p class="leiter"></p></li>'
    };

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
    vName = event.path[0].innerText;
    vName = vName.replace(" ", "_");
    //console.log(vName);
    window.location.href = "http://localhost:8080/www/#/vd";
  }

  function conLoadVDetail() {
    //aufruf braucht versuchs id um inhalt aus db zu laden
    //vname
    console.log(vName);
    //var vdTyp = document.getElementById("vdTyp");
    //vdTyp.innerHTML = "online, tagebuch, vr; kat + js";
  }

  function jumpToVDetail() { //
    window.location.href = "http://localhost:8080/www/#/vd"; //durch server ip ersetzen
    //button weil router keine para wie vid (später zum seite generieren)
  }

  that.initVPController = initVPController;
  that.conLoadHome = conLoadHome;
  that.conLoadVersuche = conLoadVersuche;
  that.conLoadVDetail = conLoadVDetail;
  return that;
};
