/* eslint-env browser */
/* global Vue, VueRouter */

var VPController = VPController || {};
VPApp.VPController = function() {
  "use strict";

  var that = {};

  function initVPController(VPModel, VPView) {
    console.log("VPController")
  }

  function conLoadHome() {
    console.log("home");
  }

  function conLoadVersuche() {
    //liste laden und mit framework (bsp underscore) darstellen?
    console.log("about");
  }

  function conLoadVDetail() {
    //aufruf braucht versuchs id um inhalt aus db zu laden
    console.log("hier viel js");
    var vdTyp = document.getElementById("vdTyp");
    //vdTyp.innerHTML = "online, tagebuch, vr; kat + js";
  }

  function jumpToVDetail() { //
    window.location.href = "http://localhost:8080/#/vd"; //durch server ip ersetzen
    //button weil router keine para wie vid (später zum seite generieren)
  }

  that.initVPController = initVPController;
  that.conLoadHome = conLoadHome;
  that.conLoadVersuche = conLoadVersuche;
  that.conLoadVDetail = conLoadVDetail;
  return that;
};
