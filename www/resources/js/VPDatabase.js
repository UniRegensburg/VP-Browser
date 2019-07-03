/* eslint-env browser */
/* global Vue, VueRouter */

var VPDatabase = VPDatabase || {};
VPApp.VPDatabase = function() {
  "use strict";

  var that = {},
  db,
  dbEntries;

  function connect(url, database, user, password) {
    let fts = "http://"+user+":"+password+"@"+url+"/"+database;
    console.log(fts);
    //let dbUrl = "http://" + ( user + ":" || "") + (password + "@" || "") + url + "/" + database;
    //let dbUrl = "http://"+user+":"+password+"@"+url+"/"+database;
    //console.log(dbURL);
    db = new PouchDB(fts);
  }

  function getInfo() {
    db.info().then(function (info) {
      console.log(info);
    });
  }

  connect("127.0.0.1:8080", "vpbrowser", "admin", "vpbrowser");
  getInfo();
  db.allDocs({
    include_docs: true,
    attachments: true,
  }).then(function(result){
    dbEntries = result.rows;
  });
  /* //code currently not needed
  function deleteDBElement(id){
        db.get(id).then(function(doc){
          return db.remove(doc);
        });
  }
  function deleteWholeDB(){
    db.allDocs().then(function(result){
      for (let i =0;i<result.rows.length;i++){
        console.log(result.rows[i].id);
        deleteDBElement(result.rows[i].id);
      }
    });
  }

  db.get("https://de.wikipedia.org/wiki/%C5%A0koda_Fabia_I").then(function(doc){
    console.log(doc);
  });
  function fillDB(docs){
    for(let i=0;i<docs.length;i++){
      console.log(docs[i]);
      db.put(docs[i]);
    }
  }
  */

	function initVPDatabase() {
    console.log("initDB");
    console.log(dbEntries);
  }

  function wizardDone(CarModel,sortBy) {
    connect("132.199.137.35:5984", "car4you", "car4you", "car2018***");
    getInfo();
    db.allDocs({
      include_docs: true,
      attachments: true,
    }).then(function(result){
      DbCarArray = result.rows;
      //console.log(DbCarArray[0].doc);

    });
  }

  that.initVPDatabase = initVPDatabase;
  return that;
};
