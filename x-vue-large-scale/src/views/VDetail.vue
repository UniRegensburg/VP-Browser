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

  export default {
    name: 'VDetail',
    mounted: function() {VPApp.loadVDetail();},
  };
</script>
