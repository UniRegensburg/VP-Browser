/* eslint-env browser */

// Create components
// TODO: Use component files instead of template strings

//https://stackoverflow.com/questions/40676377/run-component-method-on-load-vue-js

const Home = { template: "<div><h1>Home</h1><button id='bla'>bla</button></div>", mounted: function() {VPApp.loadHome();} },
  About = { template: "<div><h1>About</h1><button id='blub'>blub</button></div>", mounted: function() {VPApp.loadAbout();} },
  NotFound = { template: "<p>Page not found</p>" };

// Export components
export default {
  Home: Home,
  About: About,
  NotFound: NotFound,
};
