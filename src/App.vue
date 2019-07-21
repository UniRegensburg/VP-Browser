<template>
  <div id="app">
    <app-header></app-header>
      <router-view></router-view>
  </div>
</template>

<script>
  import navBar from './components/NavBar.vue';
  import Firebase from './js/Firebase';

  sessionStorage.setItem("nutzerName", "vip12345");

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
              let inhalt = doc.data();
              sessionStorage.setItem("benach", inhalt.benach);
              sessionStorage.setItem("lvs", inhalt.lvs);
          });
      });
      //Json would be a good alternative
      myFirebase.getAllVersuche().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
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
    }
  };
</script>

<style>
html, body {
  font-family: 'Open Sans', sans-serif;
  margin: 0;
	padding: 0;
	background: #D1D1D1;
  max-width: 1920px;
}

#nav {
	width: 100%;
	background: #9C004B;
}

#nav a {
	color: #FBFFFE;
}

#nav ul {
	display: flex;
	margin: 0;
	padding: 0;
	list-style-type: none;
	color: rgb(255,255,255);
}

#nav li {
	padding: 0.67em;
	background-color: #9C004B;
}

#nav li:hover {
	cursor: pointer;
	background-color: #1B1B1E;
}

#nav li a.router-link-exact-active {
  background-color: #1B1B1E;
}

.main {
  padding-left: 2em;
  padding-right: 2em;
}

.bigList {
  border-style: solid;
  border-width: 1px;
  line-height: 0.75em;
  padding-top: 0.75em;
  padding-left: 0.5em;
  margin: 10px 0;
  list-style: none;
  max-width: 1000px;
}

.bigList a {
  font-size: 1.5em;
}

a {
  color: #004789;
}

</style>
