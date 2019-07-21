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
  katKursCutOf = 3,
  katShowMore = false,
  kursShowMore = false,
  oldCheck = false,
  dateCheck = false,
  userDate = "";



  function loadVersuche() {
    vArray = myFirebase.convertVStrToArray(sessionStorage.getItem("vArrayStr"));

    loadShowMoreFilter();

    setupFilterListeners();
    setKategorien(vArray);
    setKurse(vArray);
    setStud(vArray);
    loadPrevFilter()

    filterVersuche();

    setDateInputMinMax(vArray);
    setAltListener();
    sortByDate();
    setupSearchUpdater();
  }

  function loadPrevFilter() {
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

    setupNamenListener();
    setSemesterMinMax(vArray);
    setVPZMinMax(vArray);
  }

  function setupFilterListeners() {
    setupDateListener();
    setupSemesterListener();
    setupVPListener();
  }

  function filterAnwenden() {
    setPrevFilter();
    filterVersuche();
    filterVersuche(); //double filter fixes list sort
    sortByDate();
    sortByDate(); //shows newest first
  }

  function filterVersuche() {
    filterArray = [];
    let checkedKats = getCheckedKats(),
    checkedKurse = getCheckedKurse(),
    checkedStud = getCheckedStud();
    document.getElementById("vListDiv").children[4].innerHTML = ""; //ul element
    for (let i=0; i<vArray.length; i++) {
      if(semMin <= vArray[i].xSemMin && parseInt(vArray[i].xSemMax) <= parseInt(semMax)) {
        if(vpzMin <= vArray[i].vp && vArray[i].vp <= vpzMax) {
          let uDate = new Date(userDate),
          vDate1 = new Date(vArray[i].xStart),
          vDate2 = new Date(vArray[i].xEnd);
          if ((!(dateCheck)) || ((uDate-vDate1)>0 && (vDate2-uDate)>0)) {
            let vArrayTypSplit = vArray[i].typ.split("~");
            for (let j=0; j<vArrayTypSplit.length; j++) {
              if (checkedKats.includes(vArrayTypSplit[j]) || checkedKats.length === 0) {
                if (checkedKurse.includes(vArray[i].xKurs) || checkedKurse.length === 0) {
                  if (checkedStud.includes(vArray[i].studiengang) || checkedStud.length === 0) {
                    if((vArray[i].aktiv == "true") && (oldCheck == false)) {
                      filterArray.push(vArray[i]);
                    } else if ((vArray[i].aktiv == "false") && (oldCheck == true)){
                      filterArray.push(vArray[i]);
                    }
                  }
                }
                break; //no double entries
              }
            }
          }
        }
      }
    }
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
  }

  function setDateInputMinMax(versuche) {
    let startDates = [],
    endDates = [],
    startMinMax,
    endMinMax,
    userDateEl = document.getElementById("vDate");

    for (let i=0; i<versuche.length; i++) {
      startDates.push(versuche[i].xStart);
      endDates.push(versuche[i].xEnd);
    }

    startMinMax = getSortedDateFromArray(startDates);
    endMinMax = getSortedDateFromArray(endDates);
    let startMaxIndex = startMinMax.length-1,
    endMaxIndex = endMinMax.length-1;

    userDateEl.min = startMinMax[0];
    userDateEl.max = endMinMax[endMaxIndex];
  }

  function getSortedDateFromArray(dateArray) {
    let returnArray = [],
    smallest,
    index;
    while (dateArray.length > 0) {
      smallest = dateArray[0],
      index = 0;
      for (let i=0; i<dateArray.length; i++) {
        let dateA = new Date(smallest),
        dateB = new Date(dateArray[i]);
        if (smallest > dateArray[i]) {
          smallest = dateArray[i];
          index = i;
        } else {
        }
      }
      dateArray.splice(index, 1);
      let partArray = [];
      partArray.push(smallest);
      returnArray.push(partArray);
    }
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
    for (let i=0; i<studBoolArray.length; i++) {
      onlyBools.push(studBoolArray[i][0]);
    }
    if (!(onlyBools.includes(true))) { //TODO noch nötig?
      versuche = vArray;
    }

    for (let i=0; i<versuche.length; i++) {
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

    let counter = 0;
    for (let i=0; i<kursSortedCounts.length; i++) {
      for (let j=0; j<kursCountArray.length; j++) {
        if (kursSortedCounts[i] == kursCountArray[j][1]) {
          for (let k=0; k<kursArray.length; k++) {
            if (kursCountArray[j][0] == kursArray[k]) {
              if (kursCountArray[j][1] > 1 || kursShowMore) {
                let itemdiv = document.createElement("DIV"),
                item = document.createElement("INPUT"),
                singleBool = [],
                checkedBool = false;
                itemdiv.class = "inlineP";
                item.type = "checkbox";
                item.name = "kurs";
                item.value = counter;

                itemdiv.appendChild(item);
                itemdiv.innerHTML += kursArray[k] + "</br>";
                kursDiv.appendChild(itemdiv);

                for (let l=0; l<wipBool.length; l++) {
                  if (wipBool[l][1] == kursArray[k] && wipBool[l][0]) {
                    for (let p=0; p<kursDiv.children.length; p++) {
                      if (kursArray[k] == kursDiv.children[p].innerText.slice(0, -1)) {
                        kursDiv.children[p].children[0].checked = true;
                      }
                    }
                    singleBool.push(true);
                    checkedBool = true;
                  }
                }
                if (!checkedBool) {
                  singleBool.push(false);
                }

                singleBool.push(kursArray[k])
                kursBoolArray.push(singleBool);
                kursArray.splice(k, 1);
                counter += 1;
              }
            }
          }
        }
      }
    }

    if (kursShowMore) {
      createKursShowLess(versuche);
    } else {
      createKursShowMore(versuche);
    }

    setKursListener(); //elements destroyed -> new listener
  }

  function removeExtraKurse() {
    let kursDiv = document.getElementById("kursDiv"),
    children = kursDiv.children;
    for (let i=0; i<children.length; i++) { //button lassen -1?
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
        filterAnwenden();
      });
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
    let studDiv = document.getElementById("studDiv"),
    studArray = [],
    studCountArray = [],
    studSortedCounts = [],
    wipBool = studBoolArray,
    onlyBools = [];
    studDiv.innerHTML = "";
    studBoolArray = [];

    for (let i=0; i<katBoolArray.length; i++) {
      onlyBools.push(katBoolArray[i][0]);
    }
    for (let i=0; i<kursBoolArray.length; i++) {
      onlyBools.push(kursBoolArray[i][0]);
    }
    for (let i=0; i<studBoolArray.length; i++) { //TODO in kurs,kat und dann aktiv?
      onlyBools.push(studBoolArray[i][0]);
    }

    if (!(onlyBools.includes(true))) {
      versuche = vArray;
    }

    for (let i=0; i<versuche.length; i++) {
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

    let counter = 0;
    for (let i=0; i<studSortedCounts.length; i++) {
      for (let j=0; j<studCountArray.length; j++) {
        if (studSortedCounts[i] == studCountArray[j][1]) {
          let index = 0;
          for (let k=0; k<studArray.length; k++) {
            if (studCountArray[j][0] == studArray[k]) { //TODO wenn gechecked -> gechecked setzen - done
                let itemdiv = document.createElement("DIV"),
                item = document.createElement("INPUT"),
                singleBool = [],
                checkedBool = false;
                itemdiv.class = "inlineP";
                item.type = "checkbox";
                item.name = "stud";
                //console.log(counter);
                //item.value = counter;
                //item always has "value", not 'value=""', regardles of value set or not set
                //console.log(item);

                itemdiv.appendChild(item);
                itemdiv.innerHTML += studArray[k] + "</br>";
                //itemdiv.children[0].value = counter; //not working
                studDiv.appendChild(itemdiv);

                //studDiv.children[0].children[counter].value = counter; //works but throws error

                for (let l=0; l<wipBool.length; l++) {
                  if (wipBool[l][1] == studArray[k] && wipBool[l][0]) {
                    for (let p=0; p<studDiv.children.length; p++) {
                      if (studArray[k] == studDiv.children[p].innerText.slice(0, -1)) {
                        studDiv.children[p].children[0].checked = true;
                      }
                    }
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
            }
          }
          studArray.splice(index, 1);
        }
      }
    }
    setStudListener(); //item destroyed and new -> new listener
  }

  function setStudListener() {
    let stud = document.getElementsByName("stud");
    for (let i=0; i<stud.length; i++) {
      stud[i].addEventListener("input", function() {
        studBoolArray[i][0] = stud[i].checked;
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
    if (!(onlyBools.includes(true))) {
      versuche = vArray;
    }
    katBoolArray = [];
    for (let i=0; i<versuche.length; i++) { //multi kats aufteilen
      let smallSplitArray=versuche[i].typ.split("~");
      for (let j=0; j<smallSplitArray.length; j++) {
        katSplitArray.push(smallSplitArray[j]);
      }
    }
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

    for (let i=0; i<katCountArray.length; i++) {
      katSortedCounts.push(katCountArray[i][1]);
    }
    let counter = 0;
    katSortedCounts = sortCounts(katSortedCounts);

    for (let i=0; i<katSortedCounts.length; i++) {
      for (let j=0; j<katCountArray.length; j++) {
        if (katSortedCounts[i] == katCountArray[j][1]) {
          let index = 0;
          for (let k=0; k<katArray.length; k++) {
            if (katCountArray[j][0] == katArray[k]) {
              if (katCountArray[j][1] > 1 || katShowMore) {
                let itemdiv = document.createElement("DIV"),
                item = document.createElement("INPUT"),
                singleBool = [],
                checkedBool = false;
                itemdiv.class = "inlineP"
                item.type = "checkbox";
                item.name = "kat";
                item.value = counter;

                itemdiv.appendChild(item);
                itemdiv.innerHTML += katArray[k] + "</br>";
                katDiv.appendChild(itemdiv);

                for (let l=0; l<wipBool.length; l++) {
                  if (wipBool[l][1] == katArray[k] && wipBool[l][0]) {
                    for (let p=0; p<katDiv.children.length; p++) { //-1?
                      if (katArray[k] == katDiv.children[p].innerText.slice(0, -1)) {
                        katDiv.children[p].children[0].checked = true;
                      }
                    }
                    singleBool.push(true);
                    checkedBool = true;
                  }
                }
                if (!checkedBool) {
                  singleBool.push(false);
                }

                singleBool.push(katArray[k]);
                katBoolArray.push(singleBool);
                index = k;
                katArray.splice(index, 1);
                counter += 1;
              }
            }
          }
          //katArray.splice(index, 1); //both splices work
        }
      }
    }

    if (katShowMore) {
      createKatShowLess(versuche);
    } else {
      createKatShowMore(versuche);
    }

    setKatListener(); //item destroyed -> new listener
  }

  function removeExtraKats() {
    let katDiv = document.getElementById("katDiv"),
    children = katDiv.children;
    for (let i=0; i<children.length; i++) { //button lassen -1?
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
      setKategorien(versuche);
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
        filterAnwenden();
      })
    }
  }

  function getCheckedKats() {
    let katDiv = document.getElementById("katDiv").children,
    katReturnArray = [];
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
    return(numArray);
  }

  function setExtraText() {
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
    vName = event.path[0].innerText;
    vName = vName.replace("[Abgelaufen] ", "");
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
