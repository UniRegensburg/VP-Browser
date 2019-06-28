/* eslint-env browser */

// Create components
// TODO: Use component files instead of template strings
const Home = { template: "<div><h1>Home</h1><button id='bla'>bla</button></div>", script: "export default {mounted(){VPApp.loadHome();}}"},
  About = { template: "<div><h1>About</h1><button id='blub'>blub</button><script><VPApp.loadAbout();</script></div>" },
  NotFound = { template: "<p>Page not found</p>" };

// Export components
export default {
  Home: Home,
  About: About,
  NotFound: NotFound,
};
