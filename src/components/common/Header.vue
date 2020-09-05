<template>
    <nav>
        {{ isAuthenticated }}
        <div class="left">
            <h5 class="darken_text">CSV Manager</h5>
        </div>
        <div class="right">
            <ul>
                <router-link v-if="isAuthenticated"
                        tag="li"
                        :to="{ name: 'accounts', }"
                        @click.native="logOutUser"
                >Log Out
                </router-link>
                <router-link v-else
                        tag="li"
                        :to="{ name: 'accounts', }"
                >Accounts
                </router-link>
                <router-link
                        tag="li"
                        :to="{ name: 'home', }"
                        >About
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import * as types from '../../store/modules/accounts/accountTypes';
  export default {
    name: 'header_component',
    methods: {
      ...mapActions({
        logOutUser: types.LOG_OUT
      }),
    },
    computed: {
      ...mapGetters({
        isAuthenticated: types.IS_USER_AUTHENTICATED
      }),
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        h5 {
            color: mintcream;
        }
        @include largeScreens {
            width: 50%;
        }
    }
    .right {
        background-color: indianred;
        display: flex;
        justify-content: center;
        align-items: center;

        ul {
            li {
                margin: auto 1rem;
                cursor: pointer;
                &:hover {
                    color: mintcream;
                    font-size: 1.1rem;
                    transition: all 0.4s ease-in-out;
                }
            }
        }

        @include largeScreens {
            width: 50%;
        }
    }
}
</style>
