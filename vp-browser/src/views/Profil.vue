<template>
  <div>
    <h1>Profil</h1>
    <form>
      <p>Email Benachrichtigungen</p>
      <input type="radio" name="email" value="all" checked>Alle <br>
      <input type="radio" name="email" value="versuche">nur neue Versuche<br>
      <input type="radio" name="email" value="bestätigung">nur Anmeldebestätigung<br>
    </form>
    <br>
    <router-link to="/mv">meine Versuche</router-link>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';
  //console.log("home");

  function loadProfil() {
    console.log("profil");
  }

  export default {
    name: 'home',
    mounted: function() {loadProfil();},
  };
</script>
