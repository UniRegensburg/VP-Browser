<template>
  <div id="app">
    <app-header></app-header>
      <router-view></router-view>
  </div>
</template>

<script>
  import navBar from './components/NavBar.vue';
  import Firebase from './js/Firebase';

  //let myFirebase = new Firebase();
  //myFirebase.getAllVersuche();

  sessionStorage.setItem("nutzerName", "hal35337");

  //TODO: seite (home, versuche etc) mounted bevor db infos aus beforeCreate da sind
  //beim ersten laden mit leerem session storage
  //mgl lsg: bevor login bool rausgibt ob richtig, zum daten laden ansetzen?

  export default {
    components: {
        'app-header': navBar,
    },
    beforeCreate: function() {
      let myFirebase = new Firebase(),
      versuchsArray = [];
      myFirebase.getUser().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              //console.log(doc.id, " => ", doc.data());
              let inhalt = doc.data();
              //console.log(inhalt);
              sessionStorage.setItem("benach", inhalt.benach);
              sessionStorage.setItem("lvs", inhalt.lvs);
              //return(inhalt);
              console.log(new Date().getTime());
          });
      });
      console.log(new Date().getTime());
      myFirebase.getAllVersuche().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //console.log(`${doc.id} => ${doc.data()}`);
          let singleV = [];
          singleV.push(doc.id);
          let inhalt = doc.data(),
          vDataStr = "" + inhalt.aktiv + ";" + inhalt.dauer + ";" + inhalt.descr + ";" + inhalt.email + ";" + inhalt.href + ";" + inhalt.lehrkraft +  ";" + inhalt.leiter + ";" + inhalt.linkSes + ";" + inhalt.lockedSes + ";" + inhalt.raum + ";" + inhalt.sessions + ";" + inhalt.typ + ";" + inhalt.vp + ";" + inhalt.xStart + ";" + inhalt.xEnd + ";" + inhalt.xSemMin + ";" + inhalt.xSemMax + ";" + inhalt.xKurs + ";" + inhalt.einstellung + ";" + inhalt.xSpecial + ";" + inhalt.studiengang;
          //indexe: 0 aktiv; 1 dauer; 2 descr; 3 email; 4 href; 5 lehrkraft; 6 leiter; 7 linkSes; 8 lockedSes; 9 raum; 10 sessions; 11 typ; 12 vp; 13 xstart; 14 xend; 15 xsemmin; 16 xsemmax; 17 xkurs (darf kein komma im namen haben); 18 einstellungsdatum; 19 besondere kriterien; 20 studiengang
          singleV.push(vDataStr);
          versuchsArray.push(singleV);
        })
        sessionStorage.setItem("vArrayStr", versuchsArray);
        });
      //console.log(sessionStorage.getItem("vArrayStr"));
      //console.log(sessionStorage.getItem("benach"));
      //console.log(sessionStorage.getItem("lvs"));
    }
  };
</script>

<style>
html, body {
	font-family: "Trebuchet MS", Helvetica, sans-serif;
	margin: 0;
	padding: 0;
	background: #e0e0e2;
}

header {
	width: 98vw;
	height: 7vh;
	padding: 0 1vw;
	line-height: 7vh;
	background: #2b4162;
	border-style: solid;
	border-width: 0 0 1px 0;
	border-color: #e0e0e2;
	font-size: 4vh;
	color: #FFFFFF;
}

#mainApp {
	padding: 0 1vw;
}

#nav {
	width: 100vw;
	background: #2b4162;
}

#nav a {
	color: #FFF;
}

#nav ul {
	display: flex;
	margin: 0;
	padding: 0;
	list-style-type: none;
	color: rgb(255,255,255);
}

#nav li {
	padding: 1vh;
	background-color: #2b4162;
}

#nav li:hover {
	cursor: pointer;
	color: #2b4162;
	background-color: #FFF;
}

#nav li.active {
	text-decoration: underline;
}
</style>
