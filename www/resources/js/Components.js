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
    <div>
      <h3>Nächster Versuch</h3>
      <p><router-link to="/vd">Name</router-link></p>
      <p>Zeit</p>
      <p>Raum</p>
    </div>
    <br>
    <router-link to="versuche">Versuchsliste</router-link>
    <br>
    <br>
    <router-link to="profil">mein Profil</router-link>
  </div>`
  , mounted: function() {VPApp.loadHome();} },

  Versuche = { template: `
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
    </div>`
  , mounted: function() {VPApp.loadVersuche();} },

  VDetail = { template: `
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
    </div>`
  , mounted: function() {VPApp.loadVDetail();} },

  Profil = { template: `
    <div>
      <h1>Profil</h1>
      <form>
        <p>Email Benachrichtigungen</p>
        <input type="radio" name="email" value="all" checked>Alle <br>
        <input type="radio" name="email" value="versuche">nur neue Versuche<br>
        <input type="radio" name="email" value="bestätigung">nur Anmeldebestätigung<br>
      </form>
      <br>
      <router-link to="/mv">meine Versuche</router-link>
    </div>`
  , mounted: function() {} },

  Sessions = { template: `
    <div>
      <h1>Versuchstitel - Sessions</h1>
      <form>
        <p>Termine</p>
        <input type="radio" name="email" value="01" checked>Zeit 1 <br>
        <input type="radio" name="email" value="02">Zeit 2<br>
        <input type="radio" name="email" value="03" disabled>Zeit 3<br>
        <!-- wie bei doodle gefüllte slots zeigen und nicht klickbar?, label außen rum? -->
      </form>
      <br>
      <button id="vAnmelden">für Session anmelden</button>
    </div>`
  , mounted: function() {} },

  meineVersuche = { template: `
    <div>
      <h1>meine Versuche</h1>
      <table>
        <tr>
          <td>Name</td>
          <td><router-link to="/vd">Name</router-link></td>
        </tr>
        <tr>
          <td>Session</td>
          <td>Termin</td>
        </tr>
        <!-- wenn nicht online, wenn session, zeit weg? -->
          <tr>
            <td>Typ</td>
            <td id="vdTyp">online, tagebuch, vr; kat</td>
          </tr>
          <tr>
            <td>Dauer</td>
            <td>Zeit</td>
          </tr>
          <tr>
            <td>VP</td>
            <td>VP-Zahl</td>
          </tr>
          <tr>
            <td>Leiter</td>
            <td>Name</td>
          </tr>
        </table>
    </div>`
  , mounted: function() {} },

  Logout = { template: "<p>Logout</p>" },

  NotFound = { template: "<p>Page not found</p>" };

var justKeepingString = `
<table>
  <table>
    <tr>
      <td>Name</td>
      <td><router-link to="/vd">Name</router-link></td>
    </tr>
    <tr>
      <td>Typ</td>
      <td id="vdTyp">online, tagebuch, vr; kat</td>
    </tr>
    <tr>
      <td>Dauer</td>
      <td>Zeit</td>
    </tr>
    <tr>
      <td>VP</td>
      <td>VP-Zahl</td>
    </tr>
    <tr>
      <td>Leiter</td>
      <td>Name</td>
    </tr>
  </table>
  <br>
  <table id="vt01">
    <tr>
      <td>Name</td>
      <td><router-link to="/vd">Name2</router-link></td>
    </tr>
    <tr>
      <td>Typ</td>
      <td id="vdTyp">online, tagebuch, vr; kat</td>
    </tr>
    <tr>
      <td>Dauer</td>
      <td>Zeit</td>
    </tr>
    <tr>
      <td>VP</td>
      <td>VP-Zahl</td>
    </tr>
    <tr>
      <td>Leiter</td>
      <td>Name</td>
    </tr>
  </table>
</table>
`

// Export components
export default {
  Home: Home,
  Versuche: Versuche,
  VDetail: VDetail,
  Profil: Profil,
  meineVersuche: meineVersuche,
  Sessions: Sessions,
  Logout: Logout,
  NotFound: NotFound,
};
