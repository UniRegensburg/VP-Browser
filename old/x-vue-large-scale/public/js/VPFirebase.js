/* eslint-env browser */
/* global Vue, VueRouter */

var VPFirebase = VPFirebase || {};
VPApp.VPFirebase = function() {
  "use strict";

  var that = {},
  fb;

  function lightTheFlames() {
    console.log("fire is lit");
    let dbRef = firebase.database();
    //firebase nicht defined, kann wegen Js-App-Aufbau nicht importieren
    let nutzer = defRef.ref('nutzer');
    console.log(nutzer);
  }

that.lightTheFlames = lightTheFlames;
return that;
};
