<template>
  <div>
    <h1 id="vdvName"></h1>
    <div>
      <h3>Informationen</h3>
      <div id="detail-list">
        <ul class="list"></ul>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';

  var wipData = [],
  vName = sessionStorage.getItem('versuch');

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

  function loadVDetail() {
    console.log(vName);

    //id -> name
    let strVN = "ffs";
    if (vName != null) {
      strVN = vName.replace("_", " ");
    }
    document.getElementById("vdvName").innerHTML = strVN;

    //list laden
    let versuch = getVersuch(); //später query
    var options = {
        valueNames: ['typ', 'end', 'dauer', 'VP', 'descr', 'session', 'raum', 'leiter', 'email', 'lehrkraft'],
        item: '<li><p class="typ"></p><p class="end"></p><p class="dauer"></p><p class="VP"></p><p class="descr"></p></br><a href="/sessions" class="session"></a><p class="raum"></p></br><p class="leiter"></p><p class="email"></p></p class="lehrkraft"></p></li>'};
    var detailList = new List('detail-list', options, versuch);
  }

  function getVersuch() {
    fillWipData();
    for (let i=0; i<wipData.length; i++) {
      if(wipData[i].name === vName) {
        return(wipData[i]);
      }
    }
  }

  export default {
    name: 'VDetail',
    mounted: function() {loadVDetail();},
  };
</script>
