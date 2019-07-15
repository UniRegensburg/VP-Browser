<template>
  <div>
    <h1>meine Versuche</h1>
    <div id="mvDiv">
      <input class="search" placeholder="Suche"/>
      Sortieren nach
      <button><span class="sort" data-sort="name">Name</span></button>
      <button><span class="sort" data-sort="termin" id="terminButton">Termin</span></button>
      <ul class="list"></ul>
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

  function loadMV() {
    getUserVFromDB();
    fillListe();
    setupNamenListener();
    sortByDate();
  }

  function sortByDate() {
    document.getElementById("terminButton").click(); //billige lsg
  }

  function fillListe() { //weitere items von versuch anzeigen?
  document.getElementById("mvDiv").children[3].innerHTML = ""; //ul element
  //console.log(listV);
  var options = {
    valueNames: [ 'name', 'termin', 'raum', 'typ', 'dauer', 'leiter' ],
    item: '<li><a href="/vd" class="name"></a><p class="termin"></p><p class="raum"></p><p class="typ"></p><p class="dauer"></p><p class="leiter"></p></li>'
  };
  var mvDiv = new List('mvDiv', options, listV);
  setExtraText();
  }

  function getUserVFromDB() {
    let userVStr = sessionStorage.getItem("lvs"),
    vArray = myFirebase.convertVStrToArray(sessionStorage.getItem("vArrayStr"));

    listV = [];
    userV = userVStr.split("~"); //versucht nach ersten durchlauf mit etwas nicht vorhandenem zu splitten
    for (let i=0; i<userV.length; i++) {
      userV[i] = userV[i].split("+");
      //versucht nach ersten durchlauf mit etwas nicht vorhandenem zu splitten
      for (let j=0; j<vArray.length; j++) {
        if (userV[i][0] == vArray[j].name) {
          //userV[i][0] = vArray[j];
          vArray[j]["termin"] = userV[i][1];
          listV.push(vArray[j]);
        }
      }
    }
    //console.log(userV);
  }

  function setExtraText() {
    let typ = document.getElementsByClassName("typ");
    for (let i=0; i<typ.length; i++) {
      typ[i].innerText = "Typ: " + typ[i].innerText.replace("~", ", ");
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
/*
    let kurse = document.getElementsByClassName("xKurs");
    for (let i=0; i<kurse.length; i++) {
      kurse[i].innerText = "Kurse: " + kurse[i].innerText;
    }
*/
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
    vName = vName.replace(" ", "_");
    //console.log(vName);
    sessionStorage.setItem('versuch', vName);
  }

  export default {
    name: 'home',
    mounted: function() {loadMV();},
  };
</script>
