import firebase from 'firebase';

let that;

function Firebase() {
}

let testlvs = "";

Firebase.prototype.getUserDoc = function() {
  let db = firebase.firestore();
  db.collection("nutzer").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          //console.log(`${doc.id} => ${doc.data()}`);
          if (doc.id === "test") {
            let inhalt = doc.data();
            console.log(doc.id); //rz kennung
            console.log(inhalt.name); //unwichtig
            console.log(inhalt.lvs); // gelockte versuche
            testlvs = inhalt.lvs;
            console.log(testlvs);
          }
      });
  });
};

Firebase.prototype.pushNewUser = function() {
  let db = firebase.firestore();
  db.collection("nutzer").doc("t4").set({
      name: "t4",
      lvs: "text2"
  })
  .then(function() {
      //console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
};

Firebase.prototype.writeData = function() {
  let db = firebase.firestore(),
  docName = sessionStorage.getItem("nutzerName");

  db.collection("nutzer").doc(docName).update({
      lvs2: "iwas vom code4"
  })
  .then(function() {
      //console.log("Document successfully updated!");
  });
};

Firebase.prototype.getUser = function() {
  let db = firebase.firestore(),
  nName = sessionStorage.getItem("nutzerName");

  db.collection("nutzer").where("name", "==", nName)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            let inhalt = doc.data();
            //console.log(inhalt);
            sessionStorage.setItem("benach", inhalt.benach);
            sessionStorage.setItem("lvs", inhalt.lvs);
            //return(inhalt);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

Firebase.prototype.getAllVersuche = function() {
  let db = firebase.firestore(),
  versuchsArray = []
  db.collection("versuche").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      //console.log(`${doc.id} => ${doc.data()}`);
      let singleV = [];
      singleV.push(doc.id);
      let inhalt = doc.data(),
      vDataStr = "" + inhalt.aktiv + "\;" + inhalt.dauer + "\;" + inhalt.descr + "\;" + inhalt.email + "\;" + inhalt.lehrkraft +  "\;" + inhalt.leiter + "\;" + inhalt.linkSes + "\;" + inhalt.lockedSes + "\;" + inhalt.raum + "\;" + inhalt.sessions + "\;" + inhalt.typ + "\;" + inhalt.vp;
      //indexe: 0 aktiv; 1 dauer; 2 descr; 3 email; 4 lehrkraft; 5 leiter; 6 linkSes; 7 lockedSes; 8 raum; 9 sessions; 10 typ; 11 vp
      singleV.push(vDataStr);
      versuchsArray.push(singleV);
    });
    sessionStorage.setItem("vArrayStr", versuchsArray);
    //console.log(sessionStorage.getItem("vArrayStr"));
  });
}

Firebase.prototype.convertVStrToArray = function(vStr) {
  let kommaArray = vStr.split(","),
  returnArray = [];
  console.log(vStr);
  console.log(kommaArray);

  for (let i=0; i<kommaArray.length; i++) {
    if (i%2 == 1) {
      //let vEntry = [];
      //vEntry.push(kommaArray[i-1]);
      //vEntry.push(vSubStringToJSON(kommaArray[i-1], kommaArray[i]));
      let vEntry = vSubStringToJSON(kommaArray[i-1], kommaArray[i]);
      returnArray.push(vEntry);
    }
  }
  console.log(returnArray);
  return(returnArray);
}
//nötig, da sessionStorage mit komplexen datentypen probleme macht
function vSubStringToJSON(name, subStr) {
  let splitArray = subStr.split(";"),
  returnJSON = {name: name, aktiv: splitArray[0], dauer: splitArray[1], descr: splitArray[2], email: splitArray[3], lehrkraft: splitArray[4], leiter: splitArray[5], linkSes: splitArray[6], lockedSes: splitArray[7], raum: splitArray[8], sessions: splitArray[9], typ: splitArray[10], vp: splitArray[11]};
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

export default Firebase;
