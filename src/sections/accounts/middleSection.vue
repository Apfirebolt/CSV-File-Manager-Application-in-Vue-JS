<template>
    <div class="middle_section">
        <div class="container">
            <div>
                <p v-if="selectedComponent === 'LoginComponent'"
                   @click="selectedComponent = 'RegisterComponent'" class="white-text center">
                    Don't have an account yet, create one here !
                </p>
                <p v-if="selectedComponent === 'RegisterComponent'"
                   @click="selectedComponent = 'LoginComponent'" class="white-text center">
                    Already have an account ? Login here !
                </p>
            </div>
            <transition name="fade" mode="out-in" appear>
                <keep-alive>
                    <component :is="selectedComponent">
                        <p>Default Content</p>
                    </component>
                </keep-alive>
            </transition>

        </div>
    </div>
</template>

<script>
  import LoginComponent from '../../components/accounts/LoginComponent.vue';
  import RegisterComponent from '../../components/accounts/RegisterComponent.vue';
  export default {
    name: 'middle_accounts_section',
    data() {
      return {
        selectedComponent: 'LoginComponent'
      }
    },
    components: {
      LoginComponent,
      RegisterComponent,
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.middle_section {
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    background-image: url('../../assets/728218.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    font-family: 'Titillium Web', sans-serif;

    p {
        font-size: 1rem;
        cursor: pointer;
    }

    .container > div {
        p {
            font-size: 1.2rem;
        }
        background-color: grey;
        padding: 1rem;
        font-weight: 500;
        box-shadow: 1px 2px 2px grey;
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

</style>
