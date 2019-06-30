/* eslint-env browser */

// Create components
// TODO: Use component files instead of template strings !!!

//https://stackoverflow.com/questions/40676377/run-component-method-on-load-vue-js

//import pageManager from "../pages/pageManager.js";

//``

//const Home = { template: "<div><h1>Home</h1><button id='bla'>bla</button><router-link to='/right'>right rout</router-link></div>", mounted: function() {VPApp.loadHome();} },
const Home = { template: `
  <div>
    <h1>Home</h1>
    <p><button id='bla'>bla</button></p>
    <p><router-link to='/profil'>profil</router-link></p>
  </div>`
  , mounted: function() {VPApp.loadHome();} },

  Versuche = { template: `
    <div>
      <h1>Versuche</h1>
      <button id='blub'>blub</button>
    </div>`
  , mounted: function() {VPApp.loadVersuche();} },

  VDetail = { template: `
    <div id='right'>
      <h1 id='h1r'>Detailansicht</h1>
      <button>useless</button>
    </div>`
  , mounted: function() {VPApp.loadVDetail();} },

  Profil = { template: `
    <div>
      <h1>Profil</h1>
    </div>`
  , mounted: function() {} },

  NotFound = { template: "<p>Page not found</p>" };

// Export components
export default {
  Home: Home,
  Versuche: Versuche,
  VDetail: VDetail,
  Profil: Profil,
  NotFound: NotFound,
};
