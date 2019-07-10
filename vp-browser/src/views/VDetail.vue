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
    let versuch = myFirebase.getVersuch(); //später query? jetz alle versuche aus sessionStorage durchsuchen
    var options = {
      valueNames: ['typ', 'dauer', 'vp', 'descr', 'linkSes', 'raum', 'leiter', 'email', 'lehrkraft'],
      item: '<li><p class="typ"></p><p class="dauer"></p><p class="vp"></p><p class="descr"></p></br><a href="/sessions" class="linkSes"></a><p class="raum"></p></br><p class="leiter"></p><p class="email"></p><p class="lehrkraft"></p></li>'};
    var detailList = new List('detail-list', options, versuch);
  }

  export default {
    name: 'VDetail',
    mounted: function() {loadVDetail();},
  };
</script>
