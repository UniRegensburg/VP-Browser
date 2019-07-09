/* eslint-env browser */
/* global Vue, VueRouter */

import Routes from "./Routes.js";

const APP_TARGET = "#app";

var app;

function createApp() {
  let router = new VueRouter({routes: Routes});
  app = new Vue({
    router: router,
    beforeCreate: function() {
      VPApp.init();
    },
  }).$mount(APP_TARGET);
}

createApp();
