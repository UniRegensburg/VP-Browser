/* eslint-env browser */
/* global Vue, VueRouter */

var VPApp = VPApp || {};
VPApp = (function() {
  "use strict";

  var that = {},
  VPController,
  VPModel,
  VPView,
  VPDatabase,
  VPFirebase;

  function init() {
    console.log("Hello World!");

    VPController = new VPApp.VPController();
    VPModel = new VPApp.VPModel();
    VPView = new VPApp.VPView();
    //VPFirebase = new VPApp.VPFirebase();
    //VPDatabase = new VPApp.VPDatabase();
    //VPDatabase.initVPDatabase();
    //VPFirebase.lightTheFlames();
    VPModel.initVPModel();
    VPView.initVPView();
    VPController.initVPController(VPModel, VPView);
  }

  function loadHome() {
    VPController.conLoadHome();
  }

  function loadVersuche() {
    VPController.conLoadVersuche();
  }

  function loadVDetail() {
    VPController.conLoadVDetail();
  }

  function loadProfil() {
    VPController.conLoadProfil();
  }

  function loadSessions() {
    VPController.conLoadSessions();
  }

  function loadMV() {
    VPController.conLoadMV();
  }

  that.init = init;
  that.loadHome = loadHome;
  that.loadVersuche = loadVersuche;
  that.loadVDetail = loadVDetail;
  that.loadProfil = loadProfil;
  that.loadSessions = loadSessions;
  that.loadMV = loadMV;
  return that;
}());
