<template>
  <div class="main">
    <h1>Versuche</h1>
    <div id="vlMain">
      <div id="vlLinks">
        <h3>Filter</h3>
        <p>Semester von:<input type="number" id="semMin" min="1" max="4"> bis:<input type="number" id="semMax" min="1" max="8"></p>
        <p>VP-Zahl von:<input type="number" id="vpzMin" min="0" max="3" step="0.25"> bis:<input type="number" id="vpzMax" min="0.25" max="4" step="0.25"></p>
        <p>Datum: <input type="date" id="vDate"></p>
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
        <div>
          <h4>Studium</h4>
          <div id="studDiv">
          </div>
        </div>
        <div>
          <hr>
          <p><input type="checkbox" id="oldCheck">abgelaufene Versuche</p>
        </div>
        <!--<br>
        <button id="updateFilter">Filten anwenden</button>-->
      </div>
      <div id="vlRechts">
        <h3>Einträge</h3>
        <div id="vListDiv">
          <input class="search" placeholder="Suche" id="searchBox"/>
          Sortieren nach
          <button><span class="sort" data-sort="name">Name</span></button>
          <button><span class="sort" data-sort="vp">VP-Zahl</span></button>
          <button><span class="sort" id="sortByDate" data-sort="einstellung">Einstellung</span></button>
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
  katBoolArray = [],
  kursBoolArray = [],
  studBoolArray = [],
  firstBool = true,
  katKursCutOf = 3, //3 zeigt alle kat, immer nur 2 kurse
  katShowMore = false,
  kursShowMore = false,
  studShowMore = false, //stud ausklappbar machen?
  oldCheck = false,
  dateCheck = false,
  userDate = "";


  //TODO: / bugs: kat oder kurs auswahl zeigt beim gegenpart alle einträge
  // list sort fkt mit gefiltertern versuchen nicht - 2x filtern fkt - notlösung

  function loadVersuche() {
    vArray = myFirebase.convertVStrToArray(sessionStorage.getItem("vArrayStr"));
    //console.log(vArray);

    loadShowMoreFilter();

    //filterVersuche();
    //setupNamenListener();
    setupFilterListeners();
    setKategorien(vArray);
    setKurse(vArray);
    setStud(vArray);
    loadPrevFilter()

    filterVersuche();

    //setKategorien(filterArray);
    //setKurse(filterArray);
    //setStud(filterArray);
    setDateInputMinMax(vArray); //wo egal eig
    firstBool = false;
    setAltListener();
    sortByDate();
    //setupEnterListener(); //durch update bei input evenet redundant
    setupSearchUpdater(); //wo eig egal
  }

  function loadPrevFilter() {
    //katBoolArray = [];
    let inputs = document.getElementsByTagName("input");

    inputs[0].value = sessionStorage.getItem("semMin");
    semMin = sessionStorage.getItem("semMin");
    inputs[1].value = sessionStorage.getItem("semMax");
    if ((sessionStorage.getItem("semMax") != "") && (sessionStorage.getItem("semMax") != null)) {
      semMax = sessionStorage.getItem("semMax");
    }
    inputs[2].value = sessionStorage.getItem("vpzMin");
    vpzMin = sessionStorage.getItem("vpzMin");
    inputs[3].value = sessionStorage.getItem("vpzMax");
    if ((sessionStorage.getItem("vpzMax") != "") && (sessionStorage.getItem("vpzMax") != null)) {
      vpzMax = sessionStorage.getItem("vpzMax");
    }
    inputs[4].value = sessionStorage.getItem("vDate");
    if ((sessionStorage.getItem("vDate") != "") && (sessionStorage.getItem("vDate") != null)) {
      userDate = sessionStorage.getItem("vDate");
      dateCheck = true;
    }

    for (let i=5; i<inputs.length; i++) {
      if (inputs[i].name === "kat") {
        let idStr = "kat~" + inputs[i].value;
        inputs[i].checked = conStrToBool(sessionStorage.getItem(idStr));
        katBoolArray[inputs[i].value][0] = conStrToBool(sessionStorage.getItem(idStr));
      } else if (inputs[i].name === "kurs") {
        let idStr = "kurs~" + inputs[i].value;
        inputs[i].checked = conStrToBool(sessionStorage.getItem(idStr));
        kursBoolArray[inputs[i].value][0] = conStrToBool(sessionStorage.getItem(idStr));
      } else if (inputs[i].name === "kurs") {
        let idStr = "stud~" + inputs[i].value;
        inputs[i].checked = conStrToBool(sessionStorage.getItem(idStr));
        studBoolArray[inputs[i].value][0] = conStrToBool(sessionStorage.getItem(idStr));
      } else if (inputs[i].id === "oldCheck") {
      inputs[i].checked = conStrToBool(sessionStorage.getItem("oldCheck"));
      oldCheck = conStrToBool(sessionStorage.getItem("oldCheck"));
      } else {
        inputs[i].value = sessionStorage.getItem("inputSearch");
      }
    }
    //console.log("load done");
    //filterAnwenden();
  }

  function conStrToBool(inStr) {
    if (inStr == "true") {
      return(true);
    } else {
      return(false);
    }
  }

  function loadShowMoreFilter() {
    katShowMore = conStrToBool(sessionStorage.getItem("katShowMore"));
    kursShowMore = conStrToBool(sessionStorage.getItem("kursShowMore"));
  }

  function setPrevFilter() {
    let inputs = document.getElementsByTagName("input");
    //i: 0-4 sem-datum, 5-length-2 checkboxes; length-1 search
    for (let i=0; i<inputs.length; i++) {
      if (i<5) {
        sessionStorage.setItem(inputs[i].id, inputs[i].value)
      } else if (i<inputs.length-2) {
        let idStr = inputs[i].name + "~" + inputs[i].value;
        sessionStorage.setItem(idStr, inputs[i].checked);
      } else if (i<inputs.length-1) {
        sessionStorage.setItem("oldCheck", inputs[i].checked);
      } else {
        sessionStorage.setItem("inputSearch", inputs[i].value);
      }
    }

    sessionStorage.setItem("katShowMore", katShowMore);
    sessionStorage.setItem("kursShowMore", kursShowMore);
  }

  function setupSearchUpdater() {
    let searchBox = document.getElementById("searchBox");
    searchBox.addEventListener("input", setPrevFilter);
  }

  function setupEnterListener() {
    let inputs = document.getElementsByTagName("input"),
    btn = document.getElementById("updateFilter");
    for (let i=0; i<5; i++) { //anfang keyboard input
      inputs[i].addEventListener("keyup", function() {
        if(event.key === "Enter") {
          //btn.click();
          filterAnwenden();
        }
      });
    }
  }

  function sortByDate() {
    document.getElementById("sortByDate").click();
    document.getElementById("sortByDate").click();
  }

  function fillListe(versuche) {
    var options = {
      valueNames: [ 'name', 'typ', 'dauer', 'vp', 'leiter', 'xKurs', 'einstellung' ],
      item: '<li class="bigList"><a href="/vd" class="name"></a><p class="typ"></p><p class="dauer"></p><p class="vp"></p><p class="leiter"></p><p class="xKurs"></p><p class="einstellung"></p></li>'
    };
    var vList = new List('vListDiv', options, versuche);
    setExtraText();
    if(!firstBool) { //TODO: array übergeben, vorheriges zu beginn leeren - done
    //TODO nichtmehr nötig weil filterVersuche jetz erster aufruf
      //setKategorien(versuche);
      //setKurse(versuche);
      //setKategorien(versuche); //doppelt?
    }
    setupNamenListener();
    //setDateInputMinMax(versuche);
    setSemesterMinMax(vArray);
    setVPZMinMax(vArray);
  }

  function setupFilterListeners() {
    setupDateListener();
    setupSemesterListener();
    setupVPListener();

    //setFilterAnwendenButton(); //eig unnütz
  }

  function setFilterAnwendenButton() { //button redundant?
    let filterButton = document.getElementById("updateFilter");
    filterButton.addEventListener("click", filterAnwenden);
  }

  function filterAnwenden() {
    setPrevFilter();
    filterVersuche();
    filterVersuche(); //filter list sort bugfix? - ja - warum?
    sortByDate();
    sortByDate();
  }

  function filterVersuche() {
    console.log(semMin, semMax, vpzMin, vpzMax, userDate);
    //console.log("filter");
    filterArray = [];
    let checkedKats = getCheckedKats(),
    checkedKurse = getCheckedKurse(),
    checkedStud = getCheckedStud();
    //console.log(checkedKats);
    document.getElementById("vListDiv").children[4].innerHTML = ""; //ul element
    //nach sem, vp, datum einzeln filtern, jeweils vNamen zurückgeben und dann schauen?
    for (let i=0; i<vArray.length; i++) {
      //console.log(vArray[i].xSemMax, semMax);
      if(semMin <= vArray[i].xSemMin && parseInt(vArray[i].xSemMax) <= parseInt(semMax)) { //TODO logik - done?-!
        //console.log(vArray[i].xSemMax, semMax);
        if(vpzMin <= vArray[i].vp && vArray[i].vp <= vpzMax) {
          //console.log("vpz"+i);
          //let date1 = new Date(startDate),
          //date2 = new Date(endDate),
          let uDate = new Date(userDate),
          vDate1 = new Date(vArray[i].xStart),
          vDate2 = new Date(vArray[i].xEnd);
          //console.log(date1-vDate1);
          //console.log(date2-vDate2);
          //if ((date1-vDate1)<=0 && (date2-vDate2)>=0) { //TODO logik - done
          if ((!(dateCheck)) || ((uDate-vDate1)>0 && (vDate2-uDate)>0)) {
            //console.log("date"+i);
            let vArrayTypSplit = vArray[i].typ.split("~");
            for (let j=0; j<vArrayTypSplit.length; j++) {
              if (checkedKats.includes(vArrayTypSplit[j]) || checkedKats.length === 0) { //  ||checkedKats.includes(vArray[i].typ)
                //filterArray.push(vArray[i]);
                if (checkedKurse.includes(vArray[i].xKurs) || checkedKurse.length === 0) {
                  if (checkedStud.includes(vArray[i].studiengang) || checkedStud.length === 0) {
                    if((vArray[i].aktiv == "true") && (oldCheck == false)) {
                      //console.log(vArray[i].name, vArray[i].aktiv, oldCheck);
                      filterArray.push(vArray[i]);
                    } else if ((vArray[i].aktiv == "false") && (oldCheck == true)){
                      filterArray.push(vArray[i]);
                    }
                  }
                }
                break; //keine mehrfacheinträge
              }
            }
          }
        }
      }
    }
    //katdiv.children[0].innerText
    //console.log(filterArray);
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
      filterAnwenden();
    });

    vpzMaxEl.addEventListener("input", function() {
      if (vpzMaxEl.value != "") {
        vpzMax = vpzMaxEl.value;
      } else {
        vpzMax = 99.0;
      }
      filterAnwenden();
    });
  }

  function setVPZMinMax(versuche) {
    let vpzArray = [],
    vpzMinInput = document.getElementById("vpzMin"),
    vpzMaxInput = document.getElementById("vpzMax"),
    vpzEndIndex;
    for (let i=0; i<versuche.length; i++) {
      vpzArray.push(versuche[i].vp);
    }
    vpzArray = sortNumbers(vpzArray);
    vpzEndIndex = vpzArray.length-1;

    vpzMinInput.min = vpzArray[0];
    vpzMinInput.max = vpzArray[vpzEndIndex];
    vpzMaxInput.min = vpzArray[0];
    vpzMaxInput.max = vpzArray[vpzEndIndex];
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
      filterAnwenden();
    });

    semMaxEl.addEventListener("input", function() {
      if (semMaxEl.value != "") {
        semMax = semMaxEl.value;
      } else {
        semMax = 99;
      }
      filterAnwenden();
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
    //console.log(numArray);
    return(numArray);
  }

  function setupDateListener() {
    let userDateEl = document.getElementById("vDate");
    userDateEl.addEventListener("input", function() {
      if (userDateEl.value != "") {
        userDate = userDateEl.value;
        dateCheck = true;
      } else {
        userDate = "";
        dateCheck = false;
      }
      filterAnwenden();
    });
    /* alt
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
    */
  }

  function setDateInputMinMax(versuche) {
    let startDates = [],
    endDates = [],
    startMinMax,
    endMinMax,
    userDateEl = document.getElementById("vDate");
    //startDateEl = document.getElementById("startDate"),
    //endDateEl = document.getElementById("endDate");

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

    userDateEl.min = startMinMax[0];
    userDateEl.max = endMinMax[endMaxIndex];
    //startDateEl.min = startMinMax[0];
    //startDateEl.max = startMinMax[startMaxIndex];
    //endDateEl.min = endMinMax[0];
    //endDateEl.max = endMinMax[endMaxIndex];
  }

  function getSortedDateFromArray(dateArray) {
    let returnArray = [],
    smallest,
    index;
    //console.log(dateArray);
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
////////////////////////////////////////////////////////////////////////////////
//KURSE
///////////////////////////////////////////////////////////////////////////////
  function setKurse(versuche) { //TODO checked bug - done
    //console.log(versuche);
    let kursDiv = document.getElementById("kursDiv"),
    kursArray = [],
    kursCountArray = [],
    kursSortedCounts = [],
    wipBool = kursBoolArray,
    onlyBools = [];
    kursDiv.innerHTML = "";
    kursBoolArray = [];

    //selbe if bool abfrage nötig wie in kat?
    for (let i=0; i<katBoolArray.length; i++) {
      onlyBools.push(katBoolArray[i][0]);
    }
    for (let i=0; i<kursBoolArray.length; i++) {
      onlyBools.push(kursBoolArray[i][0]);
    }
    for (let i=0; i<studBoolArray.length; i++) { //TODO in kurs,kat und dann aktiv?
      onlyBools.push(studBoolArray[i][0]);
    }
    //console.log(kursBoolArray);
    if (!(onlyBools.includes(true))) {
      //kurs damit bei kurs bool und kein kat nicht ganze kat kommt
      //console.log(vArray);
      versuche = vArray;
    }

    for (let i=0; i<versuche.length; i++) {
      //console.log(versuche[i]);
      if(!(kursArray.includes(versuche[i].xKurs))) { // unique kurse
        kursArray.push(versuche[i].xKurs);

        let kursCountWip = [];
        kursCountWip.push(versuche[i].xKurs);
        kursCountWip.push(1);
        kursCountArray.push(kursCountWip);
      } else {
        for (let j=0; j<kursCountArray.length; j++) {
          if(versuche[i].xKurs == kursCountArray[j][0]) {
            kursCountArray[j][1] += 1; //add count to unqie
          }
        }
      }
    }

    for (let i=0; i<kursCountArray.length; i++) {
      kursSortedCounts.push(kursCountArray[i][1]);
    }
    kursSortedCounts = sortCounts(kursSortedCounts);

    //console.log(kursArray);
    //console.log(wipBool);
    //console.log(kursArray);
    let counter = 0;
    for (let i=0; i<kursSortedCounts.length; i++) {
      for (let j=0; j<kursCountArray.length; j++) {
        //console.log(kursSortedCounts[i], kursCountArray[j][1])
        if (kursSortedCounts[i] == kursCountArray[j][1]) {
          //console.log("in if");
          //console.log(kursSortedCounts[i], kursCountArray[j][1])
          let index = 0;
          //console.log(kursArray);
          for (let k=0; k<kursArray.length; k++) {
            //console.log(kursCountArray[j][0], kursArray[k])
            if (kursCountArray[j][0] == kursArray[k]) { //TODO wenn gechecked -> gechecked setzen - done
            //console.log(i, katKursCutOf, kursShowMore, i, j, k);
              //if (i<katKursCutOf || kursShowMore) { //i sortiert, js cuttet, wtf, showMore sortiert auch
              if (kursCountArray[j][1] > 1 || kursShowMore) { //i sortiert, js cuttet, wtf, showMore sortiert auch
                //console.log(kursArray[k]);
                let itemdiv = document.createElement("DIV"),
                item = document.createElement("INPUT"),
                singleBool = [],
                checkedBool = false;
                itemdiv.class = "inlineP";
                item.type = "checkbox";
                item.name = "kurs";
                item.value = counter;
                //item.checked = true; //fkt nicht

                itemdiv.appendChild(item);
                itemdiv.innerHTML += kursArray[k] + "</br>";
                kursDiv.appendChild(itemdiv);

                for (let l=0; l<wipBool.length; l++) {
                  if (wipBool[l][1] == kursArray[k] && wipBool[l][0]) {
                    //console.log(kursDiv.children[0].children[0]);
                    for (let p=0; p<kursDiv.children.length; p++) { //-1?
                      //console.log(kursArray[k], kursDiv.children[p].innerText.slice(0, -1));
                      if (kursArray[k] == kursDiv.children[p].innerText.slice(0, -1)) {
                        kursDiv.children[p].children[0].checked = true;
                      }
                    }
                    //kursDiv.children[l].children[0].checked = true;
                    //k falsche werte, l out of range bei kat, hier nicht, evtl weil test sample hier nur 2
                    singleBool.push(true);
                    checkedBool = true;
                  }
                }
                if (!checkedBool) {
                  singleBool.push(false);
                }

                //singleBool.push(false);
                singleBool.push(kursArray[k])
                kursBoolArray.push(singleBool);
                index = k;
                kursArray.splice(index, 1);
                counter += 1;
              }
            }
          }
          //kursArray.splice(index, 1);
        }
      }
    }

    if (kursShowMore) {
      createKursShowLess(versuche);
    } else {
      //removeExtraKurse();
      createKursShowMore(versuche);
    }

    setKursListener(); //el wird zerstört und neu geladen
  }

  function removeExtraKurse() {
    //console.log("remove");
    let kursDiv = document.getElementById("kursDiv"),
    children = kursDiv.children;
    //console.log(kursDiv);
    //console.log(children, katKursCutOf);
    for (let i=0; i<children.length; i++) { //button lassen -1?
      //console.log(i, children[i]);
      if (katKursCutOf-1 <= i) {
        kursDiv.removeChild(children[i]);
      }
    }
  }

  function createKursShowLess(versuche) {
    let kursDiv = document.getElementById("kursDiv"),
    btn = document.createElement("BUTTON");
    btn.innerText = "Zeig weniger";

    kursDiv.appendChild(btn);

    btn.addEventListener("click", function() {
      kursShowMore = false;
      setKurse(versuche);
      setPrevFilter();
    });
  }

  function createKursShowMore(versuche) {
    let kursDiv = document.getElementById("kursDiv"),
    btn = document.createElement("BUTTON");
    btn.innerText = "Zeig mehr";

    kursDiv.appendChild(btn);

    btn.addEventListener("click", function() {
      kursShowMore = true;
      setKurse(versuche);
      setPrevFilter();
    });
  }

  function setKursListener() {
    let kurse = document.getElementsByName("kurs");
    for (let i=0; i<kurse.length; i++) {
      kurse[i].addEventListener("input", function() {
        kursBoolArray[i][0] = kurse[i].checked;
        //console.log(kursBoolArray);
        //kurse[i].checked = true;
        filterAnwenden();
      })
    }
  }

  function getCheckedKurse() {
    let kursDiv = document.getElementById("kursDiv").children,
    kursReturnArray = [];
    for (let i=0; i<kursBoolArray.length; i++) {
      if (kursBoolArray[i][0]) {
        kursReturnArray.push(kursDiv[i].innerText.slice(0, -1));
      }
    }
    return(kursReturnArray);
  }
////////////////////////////////////////////////////////////////////////////////
//Studiengang
////////////////////////////////////////////////////////////////////////////////
  function setStud(versuche) { //TODO checked bug - done
    //console.log(versuche);
    let studDiv = document.getElementById("studDiv"),
    studArray = [],
    studCountArray = [],
    studSortedCounts = [],
    wipBool = studBoolArray,
    onlyBools = [];
    studDiv.innerHTML = "";
    studBoolArray = [];

    //selbe if bool abfrage nötig wie in kat?
    for (let i=0; i<katBoolArray.length; i++) {
      onlyBools.push(katBoolArray[i][0]);
    }
    for (let i=0; i<kursBoolArray.length; i++) {
      onlyBools.push(kursBoolArray[i][0]);
    }
    for (let i=0; i<studBoolArray.length; i++) { //TODO in kurs,kat und dann aktiv?
      onlyBools.push(studBoolArray[i][0]);
    }
    //console.log(studBoolArray);

    if (!(onlyBools.includes(true))) {
      //kurs damit bei kurs bool und kein kat nicht ganze kat kommt
      //console.log(vArray);
      versuche = vArray;
    }

    for (let i=0; i<versuche.length; i++) {
      //console.log(versuche[i]);
      if(!(studArray.includes(versuche[i].studiengang))) { // unique kurse
        studArray.push(versuche[i].studiengang);

        let studCountWip = [];
        studCountWip.push(versuche[i].studiengang);
        studCountWip.push(1);
        studCountArray.push(studCountWip);
      } else {
        for (let j=0; j<studCountArray.length; j++) {
          if(versuche[i].studiengang == studCountArray[j][0]) {
            studCountArray[j][1] += 1; //add count to unqie
          }
        }
      }
    }

    for (let i=0; i<studCountArray.length; i++) {
      studSortedCounts.push(studCountArray[i][1]);
    }
    studSortedCounts = sortCounts(studSortedCounts);

    //console.log(studArray);
    //console.log(wipBool);
    let counter = 0;
    for (let i=0; i<studSortedCounts.length; i++) {
      for (let j=0; j<studCountArray.length; j++) {
        if (studSortedCounts[i] == studCountArray[j][1]) {
          let index = 0;
          for (let k=0; k<studArray.length; k++) {
            if (studCountArray[j][0] == studArray[k]) { //TODO wenn gechecked -> gechecked setzen - done
            //console.log(kursShowMore);
              //if (j<katKursCutOf || kursShowMore) { //kein cut of
                //console.log(studArray[k]);
                let itemdiv = document.createElement("DIV"),
                item = document.createElement("INPUT"),
                singleBool = [],
                checkedBool = false;
                itemdiv.class = "inlineP";
                item.type = "checkbox";
                item.name = "stud";
                console.log(counter);
                //item.value = counter; //wieso fkt nicht?, fkt bei kat und kurs
                console.log(item);

                //hat leere value ohne zuweisung in elements
                //in console richtig

                itemdiv.appendChild(item);
                itemdiv.innerHTML += studArray[k] + "</br>";
                //console.log(itemdiv);
                //itemdiv.children[0].value = counter; //setzt we
                studDiv.appendChild(itemdiv);

                //console.log(studDiv);
                //studDiv.children[0].children[counter].value = counter; //setzt value aber macht error

                for (let l=0; l<wipBool.length; l++) {
                  if (wipBool[l][1] == studArray[k] && wipBool[l][0]) {
                    //console.log(studDiv.children[0].children[0]);
                    for (let p=0; p<studDiv.children.length; p++) { //-1?
                      //console.log(studArray[k], studDiv.children[p].innerText.slice(0, -1));
                      if (studArray[k] == studDiv.children[p].innerText.slice(0, -1)) {
                        studDiv.children[p].children[0].checked = true;
                      }
                    }
                    //studDiv.children[l].children[0].checked = true;
                    //k falsche werte, l out of range bei kat, hier nicht, evtl weil test sample hier nur 2
                    singleBool.push(true);
                    checkedBool = true;
                  }
                }
                if (!checkedBool) {
                  singleBool.push(false);
                }

                //singleBool.push(false);
                singleBool.push(studArray[k]);
                studBoolArray.push(singleBool);
                index = k;
                counter += 1;
              //}
            }
          }
          studArray.splice(index, 1); //evtl wie kurs buggy, aber aufgrund des samples egal & no cut of
        }
      }
    }
    setStudListener(); //el wird zerstört und neu geladen
  }

  function setStudListener() {
    let stud = document.getElementsByName("stud");
    for (let i=0; i<stud.length; i++) {
      //stud[i].value = 99;
      stud[i].addEventListener("input", function() {
        studBoolArray[i][0] = stud[i].checked;
        //console.log(studBoolArray);
        //stud[i].checked = true;
        filterAnwenden();
      })
    }
  }

  function getCheckedStud() {
    let studDiv = document.getElementById("studDiv").children,
    studReturnArray = [];
    for (let i=0; i<studBoolArray.length; i++) {
      if (studBoolArray[i][0]) {
        studReturnArray.push(studDiv[i].innerText.slice(0, -1));
      }
    }
    return(studReturnArray);
  }
////////////////////////////////////////////////////////////////////////////////
//Kategorien
////////////////////////////////////////////////////////////////////////////////
  function setKategorien(versuche) {
  //TODO nach zeig mehr weniger lädt hier imemr alle v, kurse bleibt richtig?
  //oder mehr -> wieder alle besser? -> checked bug? - war checked - done
    //console.log(versuche);
    let katDiv = document.getElementById("katDiv"),
    katSplitArray = [],
    katSortedCounts = [],
    katCountArray = [],
    katArray = [],
    wipBool = katBoolArray,
    onlyBools = [];
    katDiv.innerHTML = "";

    for (let i=0; i<katBoolArray.length; i++) {
      onlyBools.push(katBoolArray[i][0]);
    }
    for (let i=0; i<kursBoolArray.length; i++) {
      onlyBools.push(kursBoolArray[i][0]);
    }
    for (let i=0; i<studBoolArray.length; i++) { //TODO in kurs,kat und dann aktiv?
      onlyBools.push(studBoolArray[i][0]);
    }
    //console.log(onlyBools);
    if (!(onlyBools.includes(true))) {
      //kurs damit bei kurs bool und kein kat nicht ganze kat kommt
      //console.log(vArray);
      versuche = vArray;
    }
    katBoolArray = [];
    //console.log(versuche);
    for (let i=0; i<versuche.length; i++) { //multi kats aufteilen
      //console.log(versuche[i]);
      let smallSplitArray=versuche[i].typ.split("~");
      for (let j=0; j<smallSplitArray.length; j++) {
        katSplitArray.push(smallSplitArray[j]);
      }
    }
    //console.log(katSplitArray);
    for (let i=0; i<katSplitArray.length; i++) {
      if (!(katArray.includes(katSplitArray[i]))) {  //unique kats

        let katCountWip = [];
        katCountWip.push(katSplitArray[i]);
        katCountWip.push(1);
        katCountArray.push(katCountWip);

        katArray.push(katSplitArray[i]);
      } else {
        for (let j=0; j<katCountArray.length; j++) {
          if(katSplitArray[i] == katCountArray[j][0]) {
            katCountArray[j][1] += 1; //add count to unqie
          }
        }
      }
    }
    //console.log(katArray);
    //console.log(wipBool);

    for (let i=0; i<katCountArray.length; i++) {
      katSortedCounts.push(katCountArray[i][1]);
    }
    let counter = 0;
    katSortedCounts = sortCounts(katSortedCounts);
    //console.log(katSortedCounts);
    for (let i=0; i<katSortedCounts.length; i++) {
      for (let j=0; j<katCountArray.length; j++) {
        if (katSortedCounts[i] == katCountArray[j][1]) {
          let index = 0;
          for (let k=0; k<katArray.length; k++) {
            if (katCountArray[j][0] == katArray[k]) { //TODO wenn gechecked -> gechecked setzen - done
              //if (i<katKursCutOf || katShowMore) { //j cuttet zu früh, i garnicht
              if (katCountArray[j][1] > 1 || katShowMore) { //j cuttet zu früh, i garnicht
                //console.log(katArray[k]);
                let itemdiv = document.createElement("DIV"),
                item = document.createElement("INPUT"),
                singleBool = [],
                checkedBool = false;
                itemdiv.class = "inlineP"
                item.type = "checkbox";
                item.name = "kat";
                //console.log(j)
                item.value = counter;
                //console.log(item);

                itemdiv.appendChild(item);
                itemdiv.innerHTML += katArray[k] + "</br>";
                katDiv.appendChild(itemdiv);

                for (let l=0; l<wipBool.length; l++) {
                  if (wipBool[l][1] == katArray[k] && wipBool[l][0]) {
                    //console.log(kursDiv.children[0].children[0]);
                    for (let p=0; p<katDiv.children.length; p++) { //-1?
                      //console.log(katArray[k], katDiv.children[p].innerText.slice(0, -1));
                      if (katArray[k] == katDiv.children[p].innerText.slice(0, -1)) {
                        katDiv.children[p].children[0].checked = true;
                      }
                    }
                    //katDiv.children[l].children[0].checked = true;
                    singleBool.push(true);
                    checkedBool = true;
                  }
                }
                if (!checkedBool) {
                  singleBool.push(false);
                }

                //singleBool.push(false);
                singleBool.push(katArray[k]);
                katBoolArray.push(singleBool);
                index = k;
                //console.log(katArray[k]);
                katArray.splice(index, 1); //wo splice egal
                //break;
                counter += 1;
                //break;
              }
            }
          }
          //katArray.splice(index, 1);
        }
      }
    }

    //console.log(katBoolArray);

    if (katShowMore) {
      createKatShowLess(versuche);
    } else {
      //removeExtraKats();
      createKatShowMore(versuche);
    }

    setKatListener();
    //listener werden bei neu laden gelöscht, weil el neu erstellt -> neu setzen
  }

  function removeExtraKats() {
    //console.log("remove");
    let katDiv = document.getElementById("katDiv"),
    children = katDiv.children;
    //console.log(kursDiv);
    //console.log(children, katKursCutOf);
    for (let i=0; i<children.length; i++) { //button lassen -1?
      //console.log(i, children[i]);
      if (katKursCutOf-1 < i+1) {
        katDiv.removeChild(children[i]);
      }
    }
  }

  function createKatShowLess(versuche) {
    let katDiv = document.getElementById("katDiv"),
    btn = document.createElement("BUTTON");
    btn.innerText = "Zeig weniger";

    katDiv.appendChild(btn);

    btn.addEventListener("click", function() {
      katShowMore = false;
      setKategorien(versuche); //TODO vArray?
      setPrevFilter();
    });
  }

  function createKatShowMore(versuche) {
    let katDiv = document.getElementById("katDiv"),
    btn = document.createElement("BUTTON");
    btn.innerText = "Zeig mehr";

    katDiv.appendChild(btn);

    btn.addEventListener("click", function() {
      katShowMore = true;
      setKategorien(versuche);
      setPrevFilter();
    });
  }

  function setKatListener() {
    let kats = document.getElementsByName("kat");
    for (let i=0; i<kats.length; i++) {
      kats[i].addEventListener("input", function() {
        katBoolArray[i][0] = kats[i].checked;
        //console.log(katBoolArray);
        filterAnwenden();
      })
    }
  }

  function getCheckedKats() {
    let katDiv = document.getElementById("katDiv").children,
    katReturnArray = [];
    //console.log(katBoolArray, katDiv);
    for (let i=0; i<katBoolArray.length; i++) {
      if (katBoolArray[i][0]) {
        katReturnArray.push(katDiv[i].innerText.slice(0, -1));
      }
    }
    return(katReturnArray);
  }
////////////////////////////////////////////////////////////////////////////////
//alte Versuche
////////////////////////////////////////////////////////////////////////////////
  function setAltListener() {
    let altCheck = document.getElementById("oldCheck");
    altCheck.addEventListener("input", function() {
      oldCheck = altCheck.checked;
      filterAnwenden();
    })
  }

  function sortCounts(numArray) { //groß zu klein, sortNumbers klein zu groß
    numArray.sort(function(a, b){return b-a});
    //https://www.w3schools.com/jsref/jsref_sort.asp
    //console.log(numArray);
    return(numArray);
  }

  function setExtraText() {
    //name abgelaufen
    let aNamen = document.getElementsByClassName("name");
    for (let i=0; i<aNamen.length; i++) {
      for (let j=0; j<filterArray.length; j++) {
        if ((aNamen[i].innerText == filterArray[j].name) && (filterArray[j].aktiv == "false")) {
          aNamen[i].innerText = "[Abgelaufen] " + aNamen[i].innerText;
        }
      }
    }

    let typ = document.getElementsByClassName("typ");
    for (let i=0; i<typ.length; i++) {
      typ[i].innerText = "Typ: " + typ[i].innerText.replace(/~/g, ", ");
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
    //console.log(event);
    vName = event.path[0].innerText;
    vName = vName.replace("[Abgelaufen] ", "");
    //vName = vName.replace(" ", "_");
    //console.log(vName);
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
