import firebase from 'firebase';

let that;

function Firebase() {
}

Firebase.prototype.pushNewUser = function(name) {
  let db = firebase.firestore();
  db.collection("nutzer").doc(name).set({
      name: name,
      lvs: "",
      benach: "0"
  })
  .then(function() {
      //console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
};

Firebase.prototype.setBenachDB = function(num) {
  let db = firebase.firestore(),
  docName = sessionStorage.getItem("nutzerName");

  db.collection("nutzer").doc(docName).update({
      benach: num
  })
  .then(function() {
      //console.log("Document successfully updated!");
  });
};

Firebase.prototype.userVAnAbmelden = function(str) {
  let db = firebase.firestore(),
  docName = sessionStorage.getItem("nutzerName");

  db.collection("nutzer").doc(docName).update({
      lvs: str
  })
  .then(function() {
      //console.log("Document successfully updated!");
  });
};

Firebase.prototype.lockedSesUpdate = function(str, name) {
  let db = firebase.firestore();

  db.collection("versuche").doc(name).update({
      lockedSes: str
  })
  .then(function() {
      //console.log("Document successfully updated!");
  });
};

Firebase.prototype.getUser = function() {
  let db = firebase.firestore(),
  nName = sessionStorage.getItem("nutzerName"),
  myPromise = new Promise(function (resolve, reject) {
    resolve(db.collection("nutzer").where("name", "==", nName).get());
  });
  return myPromise;
};

//start
Firebase.prototype.getAllVersuche = function() {
  let db = firebase.firestore(),
  versuchsArray = [],
  myPromise = new Promise(function (resolve, reject) {
    resolve(db.collection("versuche").get());
  });
  return myPromise;
};

Firebase.prototype.convertVStrToArray = function(vStr) {
  let kommaArray = vStr.split(","),
  returnArray = [];

  for (let i=0; i<kommaArray.length; i++) {
    if (i%2 == 1) {
      let vEntry = vSubStringToJSON(kommaArray[i-1], kommaArray[i]);
      returnArray.push(vEntry);
    }
  }
  return(returnArray);
}
//necessary since session storage doesnt works with complex objects
function vSubStringToJSON(name, subStr) {
  let splitArray = subStr.split(";"),
  returnJSON = {name: name, aktiv: splitArray[0], dauer: splitArray[1], descr: splitArray[2], email: splitArray[3], href: splitArray[4], lehrkraft: splitArray[5], leiter: splitArray[6], linkSes: splitArray[7], lockedSes: splitArray[8], raum: splitArray[9], sessions: splitArray[10], typ: splitArray[11], vp: splitArray[12], xStart: splitArray[13], xEnd: splitArray[14], xSemMin: splitArray[15], xSemMax: splitArray[16], xKurs: splitArray[17], einstellung: splitArray[18], xSpecial: splitArray[19], studiengang: splitArray[20]};
  return(returnJSON);
}

Firebase.prototype.getVersuch = function() {
  let vArray = this.convertVStrToArray(sessionStorage.getItem("vArrayStr")),
  vName = sessionStorage.getItem("versuch");
  for (let i=0; i<vArray.length; i++) {
    if(vArray[i].name === vName) {
      return(vArray[i]);
    }
  }
}

Firebase.prototype.reloadData = function() {
  let db = firebase.firestore(),
  vipLvs = "~Eyetracking-Experiment+2019-08-09 12:00~",
  eyeLocked = "2019-07-26 14:00~2019-07-22 13:00~2019-08-09 12:00",
  navLocked = "2019-07-22 12:15~",
  appLocked = "2019-07-11 16:00~2019-07-11 17:30~2019-07-12 11:00~2019-07-12 12:30~2019-07-12 14:00~2019-07-12 15:30~2019-07-12 18:30",
  eyeId = "Eyetracking-Experiment",
  navId = "Navigations-Studie",
  appId = "Test_einer_Übersetzungsapp";

  db.collection("nutzer").doc("vip12345").update({
      lvs: vipLvs,
      benach: 0
  })
  .then(function() {
      //console.log("Document successfully updated!");
  });

  db.collection("versuche").doc(eyeId).update({
      lockedSes: eyeLocked
  })
  .then(function() {
      //console.log("Document successfully updated!");
  });
  db.collection("versuche").doc(navId).update({
      lockedSes: navLocked
  })
  .then(function() {
      //console.log("Document successfully updated!");
  });
  db.collection("versuche").doc(appId).update({
      lockedSes: appLocked
  })
  .then(function() {
      //console.log("Document successfully updated!");
  });
}

export default Firebase;
