<template>
<div>
  <h1>Versuche</h1>
  <div id="vlMain">
    <div id="vlLinks">
      <h3>Filter</h3>
      <p>Semester von:<input type="number" id="semMin" min="1" max="4"> bis:<input type="number" id="semMax" min="1" max="8"></p>
      <p>VP-Zahl von:<input type="number" id="vpzMin" min="0" max="3" step="0.25"> bis:<input type="number" id="vpzMax" min="0.25" max="4" step="0.25"></p>
      <p>Start ab: <input type="date" id="startDate"></p>
      <p>Ende bis: <input type="date" id="endDate"></p>
      <!-- min und max programatisch bestimmen -->
      <div>
        <h4>Kategorien</h4>
        <div id="katDiv">
        </div>
      </div>
      <div>
        <h4>Kurse</h4>
        <div id="kursDiv">
        </div>
      </div>
      <br>
      <button id="updateFilter">Filten anwenden</button>
    </div>
    <div id="vlRechts">
      <h3>Einträge</h3>
      <div id="hacker-list">
        <input class="search" placeholder="Suche"/>
        Sortieren nach
        <button><span class="sort" data-sort="name">Name</span></button>
        <button><span class="sort" data-sort="vp">VP-Zahl</span></button>
        <button><span class="sort" data-sort="einstellung">Einstellung</span></button>
        <ul class="list"></ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';
  import Firebase from '../js/Firebase';

  let myFirebase = new Firebase(),
  vArray = [],
  vName = "",
  startDate = "1970-01-01",
  endDate = "2999-12-31",
  semMin = 0,
  semMax = 99,
  vpzMin = 0.0,
  vpzMax = 99.0,
  filterArray = [],
  katArray = [],
  katBoolArray = [],
  kursBoolArray = [],
  firstBool = true;

  function loadVersuche() {
    vArray = myFirebase.convertVStrToArray(sessionStorage.getItem("vArrayStr"));
    //console.log(vArray);

    fillListe(vArray);
    setupNamenListener();
    setupFilterListeners();
    setKategorien(vArray);
    setKurse(vArray);
    firstBool = false;
  }

  function fillListe(versuche) {
    var options = {
      valueNames: [ 'name', 'typ', 'dauer', 'vp', 'leiter', 'xKurs', 'einstellung' ],
      item: '<li><a href="/vd" class="name"></a><p class="typ"></p><p class="dauer"></p><p class="vp"></p><p class="leiter"></p><p class="xKurs"></p><p class="einstellung"></p></li>'
    };
    var hackerList = new List('hacker-list', options, versuche);
    setExtraText();
    if(!firstBool) { //TODO: array übergeben, vorheriges zu beginn leeren
      setKategorien(versuche);
      setKurse(versuche);
    }
    setDateInputMinMax(versuche);
    setSemesterMinMax(versuche);
  }

  function setupFilterListeners() {
    setupDateListener();
    setupSemesterListener();
    setupVPListener();

    setFilterAnwenden();
  }

  function setFilterAnwenden() {
    let filterButton = document.getElementById("updateFilter");
    filterButton.addEventListener("click", function() {
      filterVersuche();
    })
  }

  function filterVersuche() {
    //console.log(semMin, semMax, vpzMin, vpzMax, startDate, endDate);
    filterArray = [];
    let checkedKats = getCheckedKats(),
    checkedKurse = getCheckedKurse();
    //console.log(checkedKats);
    document.getElementById("hacker-list").children[4].innerHTML = ""; //ul element
    //nach sem, vp, datum einzeln filtern, jeweils vNamen zurückgeben und dann schauen?
    for (let i=0; i<vArray.length; i++) {
      if(semMin <= vArray[i].xSemMax && vArray[i].xSemMin <= semMax) { //TODO logik - done
      //console.log("sem"+i);
        if(vpzMin <= vArray[i].vp && vArray[i].vp <= vpzMax) {
          //console.log("vpz"+i);
          let date1 = new Date(startDate),
          date2 = new Date(endDate),
          vDate1 = new Date(vArray[i].xStart),
          vDate2 = new Date(vArray[i].xEnd);
          //console.log(date1-vDate1);
          //console.log(date2-vDate2);
          if ((date1-vDate1)<=0 && (date2-vDate2)>=0) { //TODO logik - done
            //console.log("date"+i);
            let vArrayTypSplit = vArray[i].typ.split("~");
            for (let j=0; j<vArrayTypSplit.length; j++) {
              if (checkedKats.includes(vArrayTypSplit[j]) || checkedKats.includes(vArray[i].typ) || checkedKats.length === 0) {
                //filterArray.push(vArray[i]);
                if (checkedKurse.includes(vArray[i].xKurs) || checkedKurse.length == 0) {
                  filterArray.push(vArray[i]);
                }
                break; //keine mehrfacheinträge
              }
            }
          }
        }
      }
    }
    //katdiv.children[0].innerText
    console.log(filterArray);
    fillListe(filterArray);
  }

  function setupVPListener() {
    let vpzMinEl = document.getElementById("vpzMin"),
    vpzMaxEl = document.getElementById("vpzMax");

    vpzMinEl.addEventListener("input", function() {
      if (vpzMinEl.value != "") {
        vpzMin = vpzMinEl.value;
      } else {
        vpzMin = 0.0;
      }
    });

    vpzMaxEl.addEventListener("input", function() {
      if (vpzMaxEl.value != "") {
        vpzMax = vpzMaxEl.value;
      } else {
        vpzMax = 99.0;
      }
    });
  }

  function setupSemesterListener() {
    let semMinEl = document.getElementById("semMin"),
    semMaxEl = document.getElementById("semMax");

    semMinEl.addEventListener("input", function() {
      if (semMinEl.value != "") {
        semMin = semMinEl.value;
      } else {
        semMin = 0;
      }
    });

    semMaxEl.addEventListener("input", function() {
      if (semMaxEl.value != "") {
        semMax = semMaxEl.value;
      } else {
        semMax = 99;
      }
    });

    //setSemesterMinMax();
  }

  function setSemesterMinMax(versuche) {
    let semMinArray = [],
    semMaxArray = [],
    semMinInput = document.getElementById("semMin"),
    semMaxInput = document.getElementById("semMax"),
    minEndIndex,
    maxEndIndex;
    for (let i=0; i<versuche.length; i++) {
      semMinArray.push(versuche[i].xSemMin);
      semMaxArray.push(versuche[i].xSemMax);
    }
    semMinArray = sortNumbers(semMinArray);
    semMaxArray = sortNumbers(semMaxArray);
    minEndIndex = semMinArray.length-1;
    maxEndIndex = semMaxArray.length-1;

    semMinInput.min = semMinArray[0];
    semMinInput.max = semMinArray[minEndIndex];
    semMaxInput.min = semMaxArray[0];
    semMaxInput.max = semMaxArray[maxEndIndex];
  }

  function sortNumbers(numArray) {
    numArray.sort(function(a, b){return a-b});
    //https://www.w3schools.com/jsref/jsref_sort.asp
    console.log(numArray);
    return(numArray);
  }

  function setupDateListener() {
    let startDateEl = document.getElementById("startDate"),
    endDateEl = document.getElementById("endDate");

    startDateEl.addEventListener("input", function() {
      if (startDateEl.value != "") {
        startDate = startDateEl.value;
      } else {
        startDate = "1970-01-01";
      }
    });

    endDateEl.addEventListener("input", function() {
      if (endDateEl.value != "") {
        endDate = endDateEl.value;
      } else {
       endDate = "2999-12-31";
      }
    });
  }

  function setDateInputMinMax(versuche) {
    let startDates = [],
    endDates = [],
    startMinMax,
    endMinMax,
    startDateEl = document.getElementById("startDate"),
    endDateEl = document.getElementById("endDate");

    for (let i=0; i<versuche.length; i++) {
      //let startDateWip = new Date(versuche[i].xStart),
      //endDateWip = new Date(versuche[i].xEnd);
      //console.log(versuche[i].xStart);
      //console.log(startDateWip);
      //console.log(versuche[i].xEnd);
      //console.log(endDateWip);
      startDates.push(versuche[i].xStart);
      endDates.push(versuche[i].xEnd);
    }

    startMinMax = getSortedDateFromArray(startDates);
    endMinMax = getSortedDateFromArray(endDates);
    let startMaxIndex = startMinMax.length-1,
    endMaxIndex = endMinMax.length-1;

    startDateEl.min = startMinMax[0];
    startDateEl.max = startMinMax[startMaxIndex];
    endDateEl.min = endMinMax[0];
    endDateEl.max = endMinMax[endMaxIndex];
  }

  function getSortedDateFromArray(dateArray) {
    let returnArray = [],
    smallest,
    index;
    //sconsole.log(dateArray);
    while (dateArray.length > 0) {
      smallest = dateArray[0],
      index = 0;
      for (let i=0; i<dateArray.length; i++) {
        let dateA = new Date(smallest),
        dateB = new Date(dateArray[i]);
        if (smallest > dateArray[i]) {
          //console.log("smaller: "+ smallest + dateArray[i]);
          smallest = dateArray[i];
          index = i;
        } else {
          //console.log("not smaller: "+ smallest + dateArray[i]);
        }
      }
      dateArray.splice(index, 1);
      let partArray = [];
      partArray.push(smallest);
      //partArray.push(index);
      returnArray.push(partArray);
      //console.log(dateArray);
    }
    //console.log(returnArray);
    return(returnArray);
  }

  function setKurse(versuche) {
    let kursDiv = document.getElementById("kursDiv"),
    kursArray = [];
    kursDiv.innerHTML = "";
    kursBoolArray = [];
    for (let i=0; i<versuche.length; i++) {
      if(!(kursArray.includes(versuche[i].xKurs))) {
        kursArray.push(versuche[i].xKurs);
        //console.log(katArray);
        let itemdiv = document.createElement("DIV"),
        item = document.createElement("INPUT");
        itemdiv.class = "inlineP"
        item.type = "checkbox";
        item.name = "kurs";
        item.value = i;
        itemdiv.appendChild(item);
        itemdiv.innerHTML += versuche[i].xKurs + "</br>";
        kursDiv.appendChild(itemdiv);
        kursBoolArray.push(false);
      }
    }
    setKursListener(); //el wird zerstört und neu geladen
  }

  function setKursListener() {
    let kurse = document.getElementsByName("kurs");
    for (let i=0; i<kurse.length; i++) {
      kurse[i].addEventListener("input", function() {
        kursBoolArray[i] = kurse[i].checked;
        console.log(kurse, kursBoolArray);
      })
    }
  }

  function getCheckedKurse() {
    let kursDiv = document.getElementById("kursDiv").children,
    kursReturnArray = [];
    for (let i=0; i<kursBoolArray.length; i++) {
      if (kursBoolArray[i]) {
        kursReturnArray.push(kursDiv[i].innerText.slice(0, -1));
      }
    }
    return(kursReturnArray);
  }

  function setKategorien(versuche) {
    let katDiv = document.getElementById("katDiv"),
    katSplitArray = [];
    katArray = [];
    katDiv.innerHTML = "";
    //console.log(katBoolArray);
    if (!(katBoolArray.includes(true))) {
      //console.log(vArray);
      versuche = vArray;
    }
    katBoolArray = []; //buggy
    //console.log(versuche);
    for (let i=0; i<versuche.length; i++) { //unique kats
      let smallSplitArray=versuche[i].typ.split("~");
      for (let j=0; j<smallSplitArray.length; j++) {
        katSplitArray.push(smallSplitArray[j]);
      }
    }
    //console.log(katSplitArray);
    for (let i=0; i<katSplitArray.length; i++) {
      if (!(katArray.includes(katSplitArray[i]))) {
        katArray.push(katSplitArray[i]);
        let itemdiv = document.createElement("DIV"),
        item = document.createElement("INPUT");
        itemdiv.class = "inlineP"
        item.type = "checkbox";
        item.name = "kat";
        item.value = i;
        itemdiv.appendChild(item);
        itemdiv.innerHTML += katSplitArray[i] + "</br>";
        katDiv.appendChild(itemdiv);
        katBoolArray.push(false);
      }
    }
    setKatListener();
    //listener werden bei neu laden gelöscht, weil el neu erstellt -> neu setzen
  }

  function setKatListener() {
    let kats = document.getElementsByName("kat");
    for (let i=0; i<kats.length; i++) {
      kats[i].addEventListener("input", function() {
        katBoolArray[i] = kats[i].checked;
        //console.log(kats, katBoolArray);
      })
    }
  }

  function getCheckedKats() {
    let katDiv = document.getElementById("katDiv").children,
    katReturnArray = [];
    for (let i=0; i<katBoolArray.length; i++) {
      if (katBoolArray[i]) {
        katReturnArray.push(katDiv[i].innerText.slice(0, -1));
      }
    }
    return(katReturnArray);
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

    let vp = document.getElementsByClassName("vp");
    for (let i=0; i<vp.length; i++) {
      vp[i].innerText = "VP-Stunden: " + vp[i].innerText;
    }

    let leiter = document.getElementsByClassName("leiter");
    for (let i=0; i<leiter.length; i++) {
      leiter[i].innerText = "Leiter: " + leiter[i].innerText;
    }

    let kurse = document.getElementsByClassName("xKurs");
    for (let i=0; i<kurse.length; i++) {
      kurse[i].innerText = "Kurse: " + kurse[i].innerText;
    }

    let einstellung = document.getElementsByClassName("einstellung");
    for (let i=0; i<einstellung.length; i++) {
      einstellung[i].innerText = "Einstellungsdatum: " + einstellung[i].innerText;
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
  .inlineP {
    display: inline;
  }
</style>
