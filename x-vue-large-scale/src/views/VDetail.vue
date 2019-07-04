<template>
  <div>
    <h1>Versuchsname</h1>
    <div>
      <h3>Informationen</h3>
      <table>
        <tr>
          <td>Typ</td>
          <td id="vdTyp">online, tagebuch, vr; kat</td>
        </tr>
        <tr>
          <td>Aktiv bis</td>
          <td>Datum</td>
        </tr>
        <tr>
          <td>Dauer</td>
          <td>Zeit</td>
        </tr>
        <tr>
          <td>VP / Belohnung</td>
          <td>VP-Zahl</td>
        </tr>
        <tr>
          <td>Beschreibung</td>
          <td>Beschreibung, <a href="#">link</a> wenn online</td>
        </tr>
      </table>
      <!-- rechtsbündig -->
      <br>
      <table>
        <tr>
          <td>Zeit</td>
          <td><router-link to="/sessions">Sessionsknopf</router-link> oder Zeit wenn angemeldet</td>
        </tr>
        <tr>
          <td>Raum</td>
          <td>Raum</td>
        </tr>
      </table>
      <br>
      <table>
        <tr>
          <td>Versuchsleiter</td>
          <td>Name, Email</td>
        </tr>
        <tr>
          <td>betreuende Lehrkraft</td>
          <td>Name, Raum, Email</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';

  export default {
    name: 'VDetail',
    mounted: function() {VPApp.loadVDetail();},
  };
</script>
