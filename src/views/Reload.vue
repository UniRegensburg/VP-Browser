<template>
  <div class="main">
    <h1>Reload</h1>
    <input id="reloadIn" type="password">
    <button id="reloadB">Ja</button>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';
  //console.log("home");
  import Firebase from '../js/Firebase';

  let myFirebase = new Firebase();

  function loadReload() {
    setupButton();
  }

  function setupButton() {
    let btn = document.getElementById("reloadB");
    btn.addEventListener("click", function() {
      if (document.getElementById("reloadIn").value == "xedos") {
        reloadDB();
      }
    });
  }

  function reloadDB() {
    console.log("reload");
    myFirebase.reloadData();
  }

  export default {
    name: 'home',
    mounted: function() {loadReload();},
  };
</script>
