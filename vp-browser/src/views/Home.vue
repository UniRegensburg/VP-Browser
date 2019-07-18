<template>
  <div class="main">
    <div id="loginDiv">
      <button id="loginButton">Login</button>
    </div>
    <div id="homeDiv">
      <h1>Home</h1>
      <div>
        <h3>Nächster Versuch</h3>
        <div id="nvDiv">
          <ul class="list"></ul>
        </div>
      </div>
      <br>
      <router-link to="versuche">Versuchsliste</router-link>
      <br>
      <br>
      <router-link to="profil">mein Profil</router-link>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';
  //console.log("home");
  import Firebase from '../js/Firebase';

  let myFirebase = new Firebase(),
  userV = [],
  listV = [],
  vName = "";

  function initHome() {
    if (sessionStorage.getItem("firstVisit") == null) {
      showLogin();
    } else {
      document.getElementById("loginDiv").style.visibility = "hidden";
      getFirstVersuch();
    }
  }

  function showLogin() {
    sessionStorage.setItem("firstVisit", "done");

    document.getElementById("app").style.visibility = "hidden";
    document.getElementById("loginDiv").style.visibility = "visible";

    setupLoginListener();
  }

  function setupLoginListener() {
    let btn = document.getElementById("loginButton");
    loginButton.addEventListener("click", function() {
      document.getElementById("app").style.visibility = "visible";
      document.getElementById("loginDiv").style.visibility = "hidden";
      getFirstVersuch();
    });
  }

  function checkForUserinDB() {
    if (sessionStorage.getItem("benach") == null) {
      myFirebase.pushNewUser(sessionStorage.getItem("nutzerName"));
    }
  }

  function getFirstVersuch() {
    checkForUserinDB();

    let userVStr = sessionStorage.getItem("lvs"),
    vArray = myFirebase.convertVStrToArray(sessionStorage.getItem("vArrayStr")),
    dateArray = [];
    listV = [];
    userV = userVStr.split("~");
    removeEmptyLvs();
    for (let i=0; i< userV.length; i++) {
      userV[i] = userV[i].split("+");
      let date = new Date(userV[i][1]);
      dateArray.push(date)
    }
    dateArray = sortDates(dateArray);
    for (let i=0; i<dateArray.length; i++) {
      for (let j=0; j<userV.length; j++) {
        if ((dateArray[i] - new Date(userV[j][1])) == 0) {
          //console.log(userV[j]);
          for (let k=0; k<vArray.length; k++) {
            if ((userV[j][0] == vArray[k].name) && (listV.length == 0)) {
              vArray[k]["termin"] = userV[j][1];
              listV.push(vArray[k]);
            }
          }
        }
      }
    }
    if (listV.length > 0) {
      fillListe();
      setupNamenListener();
    } else {
      showEmptyVersuch();
    }
  }

  function showEmptyVersuch() {
    let nvDiv = document.getElementById("nvDiv"),
    text = document.createElement("P");
    text.innerText = "Für keine Versuche registriert";
    nvDiv.appendChild(text);
  }

  function removeEmptyLvs() {
    for (let i=0; i<userV.length; i++) {
      if (userV[i].length == 0) {
        userV.splice(i, 1);
      }
    }
  }

  function fillListe() { //weitere items von versuch anzeigen?
  document.getElementById("nvDiv").children[0].innerHTML = ""; //ul element
  //console.log(listV);
  var options = {
    valueNames: [ 'name', 'termin', 'raum', 'typ', 'dauer', 'leiter' ],
    item: '<li><a href="/vd" class="name"></a><p class="termin"></p><p class="raum"></p><p class="typ"></p><p class="dauer"></p><p class="leiter"></p></li>'
  };
  var mvDiv = new List('nvDiv', options, listV);
  setExtraText();
  }


  function setExtraText() {
    let typ = document.getElementsByClassName("typ");
    for (let i=0; i<typ.length; i++) {
      typ[i].innerText = "Typ: " + typ[i].innerText.replace(/~/g, ", ");
    }

    let dauer = document.getElementsByClassName("dauer");
    for (let i=0; i<dauer.length; i++) {
      dauer[i].innerText = "Dauer: " + dauer[i].innerText + "h";
    }

    let raum = document.getElementsByClassName("raum");
    for (let i=0; i<raum.length; i++) {
      raum[i].innerText = "Raum: " + raum[i].innerText;
    }

    let leiter = document.getElementsByClassName("leiter");
    for (let i=0; i<leiter.length; i++) {
      leiter[i].innerText = "Leiter: " + leiter[i].innerText;
    }

    let termin = document.getElementsByClassName("termin");
    for (let i=0; i<termin.length; i++) {
      termin[i].innerText = "Termin: " + termin[i].innerText;
    }
  }

  function setupNamenListener() {
    let namen = document.getElementsByClassName("name");
    for (let i=0; i<namen.length; i++) {
      namen[i].addEventListener("click", listenForNames);
    }
  }

  function listenForNames() {
    let namen = document.getElementsByClassName("name");
    //console.log(event);
    vName = event.path[0].innerText;
    //vName = vName.replace(" ", "_");
    //console.log(vName);
    sessionStorage.setItem('versuch', vName);
  }

  function sortDates(dateArray) {
    dateArray.sort(function(a, b){return a-b});
    //https://www.w3schools.com/jsref/jsref_sort.asp
    //console.log(dateArray);
    return(dateArray);
  }

  export default {
    name: 'home',
    mounted: function() {initHome();},
  };
</script>
