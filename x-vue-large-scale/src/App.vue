<template>
  <div id="app">
    <app-header></app-header>
      <router-view></router-view>
  </div>
</template>

<script>
    import navBar from './components/NavBar.vue';

    export default {
      components: {
          'app-header': navBar,
      },
      beforeMount: function() {
        VPApp.init();
      }
  }
</script>

<style>
html, body {
	font-family: "Trebuchet MS", Helvetica, sans-serif;
	margin: 0;
	padding: 0;
	background: #e0e0e2;
}

header {
	width: 98vw;
	height: 7vh;
	padding: 0 1vw;
	line-height: 7vh;
	background: #2b4162;
	border-style: solid;
	border-width: 0 0 1px 0;
	border-color: #e0e0e2;
	font-size: 4vh;
	color: #FFFFFF;
}

#mainApp {
	padding: 0 1vw;
}

#nav {
	width: 100vw;
	background: #2b4162;
}

#nav a {
	color: #FFF;
}

#nav ul {
	display: flex;
	margin: 0;
	padding: 0;
	list-style-type: none;
	color: rgb(255,255,255);
}

#nav li {
	padding: 1vh;
	background-color: #2b4162;
}

#nav li:hover {
	cursor: pointer;
	color: #2b4162;
	background-color: #FFF;
}

#nav li.active {
	text-decoration: underline;
}
</style>
