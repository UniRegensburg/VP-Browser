<template>
  <div class="main">
    <div id="loginDiv">
      </br>
      <input id="loginNameIn" placeholder="RZ-Name"><br>
      <input id="loginPwIn" placeholder="Passwort" type="password"></br>
      <input type="checkbox">Remember me</br>
      <button id="loginButton">Log in</button>
      <p id="falseLogin">Falscher Nutzername oder Passwort</p>
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
  import Firebase from '../js/Firebase';

  let myFirebase = new Firebase(),
  userV = [],
  listV = [],
  vName = "",
  wantedName = "vip12345",
  wantedPw = "experi";

  function initHome() {
    document.getElementById("falseLogin").style.visibility = "hidden";
    if ((sessionStorage.getItem("firstVisit") == null) || (sessionStorage.getItem("logout") == "true")) {
      showLogin();
    } else {
      document.getElementById("loginDiv").innerHTML = "";
      getFirstVersuch();
    }
  }

  function showLogin() {
    sessionStorage.setItem("logout", "false");

    document.getElementById("app").style.visibility = "hidden";
    document.getElementById("loginDiv").style.visibility = "visible";
    document.getElementById("nav").style.visibility = "visible" //nav sichtbar
    document.getElementById("nav").children[0].style.visibility = "hidden" //ul unsichtbar -> roter strich

    setupLoginListener();
    setNameListener();
    setPwListener();
  }

  function setNameListener() {
    let pwIn = document.getElementById("loginNameIn"),
    btn = document.getElementById("loginButton");
    pwIn.addEventListener("keyup", function() {
      if(event.key === "Enter") {
        btn.click();
      }
    });
  }

  function setPwListener() {
    let pwIn = document.getElementById("loginPwIn"),
    btn = document.getElementById("loginButton");
    pwIn.addEventListener("keyup", function() {
      if(event.keyCode === 13) {
        btn.click();
      }
    });
  }

  function setupLoginListener() {
    let btn = document.getElementById("loginButton");
    loginButton.addEventListener("click", function() {
      if (checkLogin()) {
        sessionStorage.setItem("firstVisit", "done");
        document.getElementById("app").style.visibility = "visible";
        document.getElementById("nav").children[0].style.visibility = "visible"
        document.getElementById("falseLogin").style.visibility = "hidden";
        document.getElementById("loginDiv").innerHTML = "";
        getFirstVersuch();
      } else {
        document.getElementById("falseLogin").style.visibility = "visible";
      }
    });
  }

  function checkLogin() {
    let inputName = document.getElementById("loginNameIn").value,
    inputPw = document.getElementById("loginPwIn").value;
    if ((inputName == wantedName) && (inputPw == wantedPw)) {
      return(true);
    }
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
    vName = event.path[0].innerText;
    sessionStorage.setItem('versuch', vName);
  }

  function sortDates(dateArray) {
    dateArray.sort(function(a, b){return a-b});
    //https://www.w3schools.com/jsref/jsref_sort.asp
    return(dateArray);
  }

  export default {
    name: 'home',
    mounted: function() {initHome();},
  };
</script>

<style>
  #loginDiv {
    text-align: center;
  }
  #falseLogin {
    color: red;
  }
</style>
