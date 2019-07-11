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
      vDataStr = "" + inhalt.aktiv + "\;" + inhalt.dauer + "\;" + inhalt.descr + "\;" + inhalt.email + "\;" + inhalt.href + "\;" + inhalt.lehrkraft +  "\;" + inhalt.leiter + "\;" + inhalt.linkSes + "\;" + inhalt.lockedSes + "\;" + inhalt.raum + "\;" + inhalt.sessions + "\;" + inhalt.typ + "\;" + inhalt.vp + "\;" + inhalt.xStart + "\;" + inhalt.xEnd + "\;" + inhalt.xSemMin + "\;" + inhalt.xSemMax;
      //indexe: 0 aktiv; 1 dauer; 2 descr; 3 email; 4 href; 5 lehrkraft; 6 leiter; 7 linkSes; 8 lockedSes; 9 raum; 10 sessions; 11 typ; 12 vp; 13 xstart; 14 xend; 15 xsemmin; 16 xsemmax
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
  returnJSON = {name: name, aktiv: splitArray[0], dauer: splitArray[1], descr: splitArray[2], email: splitArray[3], href: splitArray[4], lehrkraft: splitArray[5], leiter: splitArray[6], linkSes: splitArray[7], lockedSes: splitArray[8], raum: splitArray[9], sessions: splitArray[10], typ: splitArray[11], vp: splitArray[12], xStart: splitArray[13], xEnd: splitArray[14], xSemMin: splitArray[15], xSemMax: splitArray[16]};
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
