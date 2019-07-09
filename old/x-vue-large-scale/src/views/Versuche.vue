<template>
<div>
  <h1>Versuche</h1>
  <div id="vlMain">
    <div id="vlLinks">
      <h3>Filter</h3>
      <p>min. Semester <input type="number" name="sem" min="1" max="4"></p>
      <p>min. VP-Zahl <input type="number" name="vpz" min="0" max="3" step="0.25"></p>
      <!-- min und max programatisch bestimmen -->
      <div>
        <h4>Kategorien</h4>
        <form>
          <input type="checkbox" name="kat" value="01">VR<br>
          <input type="checkbox" name="kat" value="02">Online<br>
          <input type="checkbox" name="kat" value="03">Programmieren<br>
        </form>
      </div>
      <div>
        <h4>Kurse</h4>
        <form>
          <input type="checkbox" name="kurs" value="01">UE<br>
          <input type="checkbox" name="kurs" value="02">MMI<br>
          <input type="checkbox" name="kurs" value="03">Sonstige<br>
        </form>
      </div>
      <br>
      <button id="updateFilter">Filten anwenden</button>
    </div>
    <div id="vlRechts">
      <h3>Einträge</h3>
      <div id="hacker-list">
        <input class="search" />
        <span class="sort" data-sort="name">Sort by name</span>
        <span class="sort" data-sort="VP">Sort by VP</span>
        <ul class="list"></ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  // @ is an alias to /src
  //import HelloWorld from '@/components/HelloWorld.vue';

  export default {
    name: 'versuche',
    mounted: function() {VPApp.loadVersuche();},
  };
</script>

<style>
  #vlMain {
  	display: grid;
  	grid-template-columns: 1fr 3fr;
  }
</style>
