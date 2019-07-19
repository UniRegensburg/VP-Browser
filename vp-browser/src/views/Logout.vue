<template>
  <div class="main">
    <h1>Logout</h1>
    <p>Wirklich ausloggen?</p>
    <p><button id="yLog">Ja</button>&emsp;&emsp;&emsp;<button id="nLog">Nein</button></p>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';
  //console.log("home");

  function loadLogout() {
    setupButtonListener();
  }

  function setupButtonListener() {
    setupJaButton();
    setupNeinButton();
  }

  function setupJaButton() {
    let btn = document.getElementById("yLog");
    btn.addEventListener("click", function() {
      sessionStorage.setItem("logout", "true");
      window.location.href = "/";
    });
  }

  function setupNeinButton() {
    let btn = document.getElementById("nLog");
    btn.addEventListener("click", function() {
      window.history.back();
    });
  }

  export default {
    name: 'home',
    mounted: function() {loadLogout();},
  };
</script>
