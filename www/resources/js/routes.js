/* eslint-env browser */

import Components from "./Components.js";

// Create and export routes to componentes

 export default [
   { path: "/", component: Components.Home },
   { path: "/versuche", component: Components.Versuche },
   { path: "/vd", component: Components.VDetail },
   { path: "/profil", component: Components.Profil },
   { path: "/404", component: Components.NotFound },
 ];
