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

  import Firebase from '../js/Firebase';

  let myFirebase = new Firebase(),
  vName = sessionStorage.getItem('versuch');

  function loadVDetail() {
    console.log(vName);

    //id -> name
    let strVN = "ffs";
    if (vName != null) {
      strVN = vName.replace("_", " ");
    }
    document.getElementById("vdvName").innerHTML = strVN;

    //list laden
    let versuch = myFirebase.getVersuch(), //später query? jetz alle versuche aus sessionStorage durchsuchen,
    link = versuch.href;
    var options = {
      valueNames: ['typ', 'dauer', 'vp', 'descr', 'linkSes', 'raum', 'leiter', 'email', 'lehrkraft'],
      item: '<li><p class="typ"></p><p class="dauer"></p><p class="vp"></p><p class="descr"></p></br><a class="linkSes"></a><p class="raum"></p></br><p class="leiter"></p><p class="email"></p><p class="lehrkraft"></p></li>'};
    var detailList = new List('detail-list', options, versuch);

    setLink(link);
    setExtraText();
  }

  function setExtraText() {
    let typ = document.getElementsByClassName("typ")[0];
    typ.innerText = "Typ: " + typ.innerText;

    let dauer = document.getElementsByClassName("dauer")[0];
    dauer.innerText = "Dauer: " + dauer.innerText + "h";

    let vp = document.getElementsByClassName("vp")[0];
    vp.innerText = "VP-Stunden: " + vp.innerText;

    let descr = document.getElementsByClassName("descr")[0];
    descr.innerText = "Beschreibung: " + descr.innerText;

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
    console.log(aTag);
    aTag.addEventListener("click", function() {
      console.log("listener");
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
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
