/* eslint-env browser */
/* global Vue, VueRouter */

import Routes from "./Routes.js";

const APP_TARGET = "#app";

var app;

function sendButtons() {
  var homeLink = document.getElementById("bla"),
  aboutLink = document.getElementById("blub");
  console.log(homeLink);
  VPApp.receiveButton(homeLink, "bla");
  console.log(aboutLink);
  VPApp.receiveButton(aboutLink, "blub");
}

function createApp() {
  let router = new VueRouter({routes: Routes});
  app = new Vue({
    router: router,
    methods: {
      //console.log("methods");
      loadHome: function (event) {
        //var homeLink = document.getElementById("bla");
        //VPApp.loadHome(homeLink); //fkt aber
      },
      loadAbout: function (event) {
        //aboutLink = document.getElementById("blub");
        //VPApp.loadAbout(aboutLink);
      },
    },
    mounted: function() { //mounted fkt aber code drin nicht?
      //nach a klasse router-link-exact-active switchen?
      console.log("mounted");
      //var homeLink = document.getElementById("bla");
      //console.log(homeLink);
      VPApp.loadHome();
    },
  }).$mount(APP_TARGET);
}

createApp();
//sendButtons();

// TODO: idee event listener auf "nav" setzen und darüber laden mit mounted?
