/* eslint-env browser */

// Create components
// TODO: Use component files instead of template strings
const Home = { template: "<div<h1>Home</h1></div>" },
  About = { template: "<div><h1>About</h1></div>" },
  NotFound = { template: "<p>Page not found</p>" };  

// Export components
export default {
  Home: Home,
  About: About,
  NotFound: NotFound,
};