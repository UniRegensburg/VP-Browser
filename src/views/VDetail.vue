<template>
  <div class="main">
    <h1 id="vdvName"></h1>
    <div>
      <h3>Informationen</h3>
      <div id="detail-list">
        <ul class="list" id="vdUL"></ul>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';

  import Firebase from '../js/Firebase';

  let myFirebase = new Firebase(),
  vName = sessionStorage.getItem('versuch');

  function loadVDetail() {
    document.getElementById("vdvName").innerHTML = vName;

    //list load
    let versuch = myFirebase.getVersuch(), //später query? jetz alle versuche aus sessionStorage durchsuchen,
    link = versuch.href;
    var options = {
      valueNames: ['typ', 'dauer', 'vp', 'descr', 'xSpecial', 'linkSes', 'raum', 'leiter', 'email', 'lehrkraft'],
      item: '<li><p class="typ"></p><p class="dauer"></p><p class="vp"></p><p class="descr"></p><p class="xSpecial"></p><hr><a class="linkSes"></a><p class="raum"></p><hr><p class="leiter"></p><p class="email"></p><p class="lehrkraft"></p></li>'};
    var detailList = new List('detail-list', options, versuch);

    setLink(link);
    setExtraText();
  }

  function setExtraText() {
    let name = document.getElementById("vdvName");
    name.innerText = name.innerText.replace(/_/g, " ");

    let typ = document.getElementsByClassName("typ")[0];
    typ.innerText = "Typ: " + typ.innerText.replace(/~/g, ", ");

    let dauer = document.getElementsByClassName("dauer")[0];
    dauer.innerText = "Dauer: " + dauer.innerText + "h";

    let vp = document.getElementsByClassName("vp")[0];
    vp.innerText = "VP-Stunden: " + vp.innerText;

    let descr = document.getElementsByClassName("descr")[0];
    descr.innerText = "Beschreibung: " + descr.innerText.replace(/~/g, ",");

    let special = document.getElementsByClassName("xSpecial")[0];
    special.innerText = "weitere Kriterien: " + special.innerText.replace(/~/g, ",");

    let raum = document.getElementsByClassName("raum")[0];
    raum.innerText = "Raum: " + raum.innerText;

    let leiter = document.getElementsByClassName("leiter")[0];
    leiter.innerText = "Leiter: " + leiter.innerText;

    let email = document.getElementsByClassName("email")[0];
    email.innerText = "Email: " + email.innerText;

    let lehrkraft = document.getElementsByClassName("lehrkraft")[0];
    lehrkraft.innerText = "Lehrkraft: " + lehrkraft.innerText;
  }

  function setLink(link) {
    let aTag = document.getElementsByClassName("linkSes")[0];
    aTag.addEventListener("click", function() {
      window.location.href=link;
    });
  }

  export default {
    name: 'VDetail',
    mounted: function() {loadVDetail();},
  };
</script>

<style>
  .linkSes {
    text-decoration: underline;
    cursor: pointer;
  }
  #vdUL {
    padding: 0;
    list-style: none;
    max-width: 1000px;
  }
</style>
