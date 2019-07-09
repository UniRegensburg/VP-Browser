<template>
  <div>
    <h1 id="sessionTitel"></h1>
    <p>Termine</p>
    <div id="sessionSlots"></div>
    <!-- wie bei doodle gefüllte slots zeigen und nicht klickbar?, label außen rum? -->
    <br>
    <button id="vAnmelden">für Session anmelden</button>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';
  //console.log("home");

  export default {
    name: 'home',
    mounted: function() {VPApp.loadSessions();},
  };
</script>

<style>
  .inlineP {
    display: inline;
  }
</style>
