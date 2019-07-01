/* eslint-env browser */

import Components from "./Components.js";

// Create and export routes to componentes

 export default [
   { path: "/", component: Components.Home },
   { path: "/versuche", component: Components.Versuche },
   { path: "/vd", component: Components.VDetail },
   { path: "/profil", component: Components.Profil },
   { path: "/mv", component: Components.meineVersuche },
   { path: "/sessions", component: Components.Sessions },
   { path: "/logout", component: Components.Logout },
   { path: "/404", component: Components.NotFound },
 ];
