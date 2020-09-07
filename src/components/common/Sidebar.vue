<template>
    <aside>
        <div class="right">
            <ul>
                <router-link v-if="isAuthenticated"
                             tag="li"
                             :to="{ name: 'accounts', }"
                             @click.native="logOutUser"
                >Log Out
                </router-link>
                <router-link v-if="isAuthenticated"
                             tag="li"
                             :to="{ name: 'dashboard', }"
                >Dashboard
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

                <i class="fa fa-close" @click="toggleSidebar"></i>
            </ul>
        </div>
    </aside>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import * as types from '../../store/modules/accounts/accountTypes';
  export default {
    name: 'header_component',
    props: {
      toggleSidebar: {
        required: true,
        type: Function
      }
    },
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
    aside {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background-color: red;
        color: #FFF;

        .right {
            width: 100%;

            ul {
                margin: 0;
                li {
                    padding: 0.5rem;
                    background-color: #341E40;
                    color: #FFF;
                    cursor: pointer;
                    transition: all 0.4s ease-in-out;
                    &:hover {
                        background-color: mintcream;
                        color: black;
                        transition: all 0.4s ease-in-out;
                    }
                }
                .fa-close {
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease-out;
                    padding: 0.5rem;

                    &:hover {
                        font-size: 2rem;
                        background-color: aliceblue;
                        color: black;
                    }
                }
            }
        }
    }
</style>
