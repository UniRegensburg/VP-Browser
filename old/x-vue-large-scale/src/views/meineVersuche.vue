<template>
  <div>
    <h1>meine Versuche</h1>
    <table>
      <tr>
        <td>Name</td>
        <td><router-link to="/vd">Name</router-link></td>
      </tr>
      <tr>
        <td>Session</td>
        <td>Termin</td>
      </tr>
      <!-- wenn nicht online, wenn session, zeit weg? -->
      <tr>
        <td>Typ</td>
        <td id="vdTyp">online, tagebuch, vr; kat</td>
      </tr>
      <tr>
        <td>Dauer</td>
        <td>Zeit</td>
      </tr>
      <tr>
        <td>VP</td>
        <td>VP-Zahl</td>
      </tr>
      <tr>
        <td>Leiter</td>
        <td>Name</td>
      </tr>
    </table>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';
  //console.log("home");

  export default {
    name: 'home',
    mounted: function() {VPApp.loadMV();},
  };
</script>
