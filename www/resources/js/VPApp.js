/* eslint-env browser */
/* global Vue, VueRouter */

var VPApp = VPApp || {};
VPApp = (function() {
  "use strict";

  var that = {},
  log = "log",
  homeLink,
  aboutLink;
  //WController,
  //WModel,
  //WView;

  function init() {
    //WController = new WizardApp.WController();
    //WModel = new WizardApp.WModel();
    //WView = new WizardApp.WView();
    //WView.initWView();
    //WModel.initWModel();
    //WController.initWController(WView, WModel);

    //setupLinks();

    log = "Hello World!";
    console.log(log);

  }

  function setupLinks() {
    //https://vuejs.org/v2/guide/events.html
    homeLink = document.getElementById("bla");
    aboutLink = document.getElementById("blub");

    //console.log(aboutLink);

    homeLink.addEventListener("click", function() {
      console.log("bla");
    });

    aboutLink.addEventListener("click", function() {
      console.log("blub");
    });

    //console.log("listeners set");

  }

  function publicTest() {
    console.log("publicTest");
  }

  function loadHome(homeLink) {
    //https://router.vuejs.org/guide/advanced/lazy-loading.html
    //warten auf mounted
    //
    console.log("homeb");
    homeLink = document.getElementById("bla");
    //console.log(homeLink);
    homeLink.addEventListener("click", function() {
      console.log("bla");
    });
  }
  function loadAbout() {
    aboutLink = document.getElementById("blub");
    console.log("loadAbout");
    aboutLink.addEventListener("click", function() {
      console.log("blub");
    });
  }

  that.init = init;
  that.publicTest = publicTest;
  that.loadHome = loadHome;
  that.loadAbout = loadAbout;
  return that;
}());
