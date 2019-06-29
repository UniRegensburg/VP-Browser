/* eslint-env browser */
/* global Vue, VueRouter */

var VPApp = VPApp || {};
VPApp = (function() {
  "use strict";

  var that = {},
  log = "log",
  homeLink,
  aboutLink;

  function init() {

    log = "Hello World!";
    console.log(log);

  }

  function loadHome(homeLink) {
    homeLink = document.getElementById("bla");
    homeLink.addEventListener("click", function() {
      console.log("bla");
    });
  }

  function loadAbout() {
    aboutLink = document.getElementById("blub");
    aboutLink.addEventListener("click", function() {
      console.log("blub");
    });
  }

  that.init = init;
  that.loadHome = loadHome;
  that.loadAbout = loadAbout;
  return that;
}());
