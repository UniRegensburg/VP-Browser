/* eslint-env browser */
/* global Vue, VueRouter */

var VPApp = VPApp || {};
VPApp = (function() {
  "use strict";

  var that = {},
  VPController,
  VPModel,
  VPView,
  homeLink,
  aboutLink;

  function init() {
    console.log("Hello World!");

    VPController = new VPApp.VPController();
    VPModel = new VPApp.VPModel();
    VPView = new VPApp.VPView();
    VPController.initVPController();
    VPModel.initVPModel();
    VPView.initVPView();
  }

  function loadHome() {
    console.log("home");
    homeLink = document.getElementById("bla");
    homeLink.addEventListener("click", function() {
      console.log("bla");
    });
  }

  function jumpToVDetail() { //
    window.location.href = "http://localhost:8080/#/vd"; //durch server ip ersetzen
    //button weil router keine para wie vid (später zum seite generieren)
  }

  function loadVersuche() {
    console.log("about");
    aboutLink = document.getElementById("blub");
    aboutLink.addEventListener("click", function() {
      console.log("blub");
      jumpToVDetail();
    });
  }

  function loadVDetail() {
    var h1r = document.getElementById("h1r");
    h1r.innerHTML = "detail feat js";
  }

  that.init = init;
  that.loadHome = loadHome;
  that.loadVersuche = loadVersuche;
  that.loadVDetail = loadVDetail;
  return that;
}());
