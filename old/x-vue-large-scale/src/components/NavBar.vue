<template>
  <div id="nav">
    <ul>
    	<!-- Navbar with router links -->
      <li class="active">
      	<!-- Specify route target with "to"-attribute -->
        <router-link to="/">Home</router-link>
      </li>
      <li >
        <router-link to="/versuche">Versuchsliste</router-link>
      </li>
      <li >
        <router-link to="/mv">meine Versuche</router-link>
      </li>
      <li >
        <router-link to="/profil">Profil</router-link>
      </li>
      <li >
        <router-link to="/logout" id="logout">Logout</router-link>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    name: 'HelloWorld',
    props: {
      msg: String,
    },
  };
</script>
