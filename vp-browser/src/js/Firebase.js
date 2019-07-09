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
  let db = firebase.firestore();
  db.collection("nutzer").doc("t2").update({
      lvs: "iwas vom code4"
  })
  .then(function() {
      //console.log("Document successfully updated!");
  });
};

export default Firebase;
