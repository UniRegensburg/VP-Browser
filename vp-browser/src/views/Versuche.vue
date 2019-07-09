<template>
<div>
  <h1>Versuche</h1>
  <div id="vlMain">
    <div id="vlLinks">
      <h3>Filter</h3>
      <p>min. Semester <input type="number" name="sem" min="1" max="4"></p>
      <p>min. VP-Zahl <input type="number" name="vpz" min="0" max="3" step="0.25"></p>
      <!-- min und max programatisch bestimmen -->
      <div>
        <h4>Kategorien</h4>
        <form>
          <input type="checkbox" name="kat" value="01">VR<br>
          <input type="checkbox" name="kat" value="02">Online<br>
          <input type="checkbox" name="kat" value="03">Programmieren<br>
        </form>
      </div>
      <div>
        <h4>Kurse</h4>
        <form>
          <input type="checkbox" name="kurs" value="01">UE<br>
          <input type="checkbox" name="kurs" value="02">MMI<br>
          <input type="checkbox" name="kurs" value="03">Sonstige<br>
        </form>
      </div>
      <br>
      <button id="updateFilter">Filten anwenden</button>
    </div>
    <div id="vlRechts">
      <h3>Einträge</h3>
      <div id="hacker-list">
        <input class="search" />
        <span class="sort" data-sort="name">Sort by name</span>
        <span class="sort" data-sort="VP">Sort by VP</span>
        <ul class="list"></ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';
  var wipData = [],
  vName = "";

  function fillWipData() {
    let set1 = {
      "name" : "a_versuch",
      "typ" : "online",
      "dauer" : "0.5",
      "VP" : "0.5 vp",
      "leiter" : "lucas",
      "sessions" : "01.01.10 10:00;01.01.11 11:00;01.02.12 12:00;99.99.99 99:15",
      "end" : "01.03.13",
      "descr" : "hexenschuss",
      "raum" : "h6",
      "email" : "lucas@mail.de",
      "lehrkraft" : "Prof. Dr. Peter Gehr",
      "session" : "Sessionsknopf",
      "lockedSessions" : "01.01.10 10:00"
    };
    let set2 = {
      "name" : "super",
      "typ" : "tagbeuch",
      "dauer" : "1.5",
      "VP" : "1.5 vp",
      "leiter" : "maria"
    };
    let set3 = {
      "name" : "d",
      "typ" : "öner",
      "dauer" : "1",
      "VP" : "1 vp",
      "leiter" : "mann",
      "sessions" : "09.07.19 14:00;10.07.19 14:00;10.07.19 15:00",
      "end" : "02.00.20",
      "descr" : "bimstein",
      "raum" : "pt cafete",
      "email" : "e@mail.de",
      "lehrkraft" : "tom & jerry",
      "session" : "Sessionsknopf",
      "lockedSessions" : ""
    };
    wipData = [set1, set2, set3];
  }

  function loadVersuche() {
    fillWipData();
    console.log(wipData);
    var options = {
      valueNames: [ 'name', 'typ', 'dauer', 'VP', 'leiter' ],
      item: '<li><a href="/vd" class="name"></a><p class="typ"></p><p class="dauer"></p><p class="VP"></p><p class="leiter"></p></li>'
    };
    var hackerList = new List('hacker-list', options, wipData);
    console.log(document.getElementById("hackerList"));
    setupNamenListener();
  }

  function setupNamenListener() {
    let namen = document.getElementsByClassName("name");
    for (let i=0; i<namen.length; i++) {
      namen[i].addEventListener("click", listenForNames);
    }
  }

  function listenForNames() {
    let namen = document.getElementsByClassName("name");
    console.log(event);
    vName = event.path[0].innerText;
    vName = vName.replace(" ", "_");
    console.log(vName);
    sessionStorage.setItem('versuch', vName);
  }

  export default {
    name: 'versuche',
    mounted: function() {loadVersuche();},
  };
</script>

<style>
  #vlMain {
  	display: grid;
  	grid-template-columns: 1fr 3fr;
  }
</style>
