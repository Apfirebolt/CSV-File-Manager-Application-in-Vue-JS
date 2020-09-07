<template>
  <div id="app">
    <transition name="custom-slide" mode="out-in">
      <sidebar-component v-if="showSidebar" :toggleSidebar="toggleSidebar"></sidebar-component>
    </transition>
    <header-component :toggleSidebar="toggleSidebar"></header-component>

    <router-view></router-view>
    <footer-component></footer-component>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import * as types from './store/modules/accounts/accountTypes';
import HeaderComponent from './components/common/Header.vue';
import FooterComponent from './components/common/Footer.vue';
import SidebarComponent from './components/common/Sidebar.vue';
export default {
  name: 'App',
  data() {
    return {
      showSidebar: false
    }
  },
  components: {
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  },
  mounted() {
    this.isUserAuthenticated();
  },
  methods: {
    ...mapActions({
      isUserAuthenticated: types.CHECK_USER_AUTHENTICATION
    }),
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    }
  }
}
</script>

<style lang="scss" scoped>
/* Font Styles
font-family: 'Nunito', sans-serif;
font-family: 'Oxygen', sans-serif;
font-family: 'Roboto', sans-serif;
font-family: 'Source Sans Pro', sans-serif;
font-family: 'Titillium Web', sans-serif;
*/
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.custom-slide-enter-active {
  transition: all 1.3s ease;
}
.custom-slide-leave-active {
  transition: all 1s ease-in-out;
}
.custom-slide-enter {
  opacity: 0;
  transform: translate(1400px, 10px);
}
.custom-slide-leave-to {
  transform: translate(-1800px);
}
</style>
