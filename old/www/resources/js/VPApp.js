/* eslint-env browser */
/* global Vue, VueRouter */

var VPApp = VPApp || {};
VPApp = (function() {
  "use strict";

  var that = {},
  VPController,
  VPModel,
  VPView,
  VPDatabase;

  function init() {
    console.log("Hello World!");

    VPController = new VPApp.VPController();
    VPModel = new VPApp.VPModel();
    VPView = new VPApp.VPView();
    VPDatabase = new VPApp.VPDatabase();
    VPDatabase.initVPDatabase();
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

  that.init = init;
  that.loadHome = loadHome;
  that.loadVersuche = loadVersuche;
  that.loadVDetail = loadVDetail;
  return that;
}());