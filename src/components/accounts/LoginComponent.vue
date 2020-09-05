<template>
    <div>
        <div class="row">
            <form class="col s12">
                <div class="row white form_container">
                    <h4 class="center red-text accent-2">LOGIN</h4>
                    <div class="input-field col s6">
                        <label for="username">Please Enter Your Username</label>
                        <input id="username" type="text" name="username" class="validate" v-model="userName.text" />
                        <p v-if="userName.errorText" class="red-text text-lighten-1">{{ userName.errorText }}</p>
                    </div>
                    <div class="input-field col s6">
                        <label for="password">Please Enter Your Password</label>
                        <input id="password" name="password" type="password" class="validate" v-model="userPassword.text" />
                        <p v-if="userPassword.errorText" class="red-text text-lighten-1">{{ userPassword.errorText }}</p>
                    </div>
                    <input type="submit" class="btn button teal" value="Login"
                           @click.stop.prevent="login_user">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import * as types from '../../store/modules/accounts/accountTypes';
  export default {
    name: 'login_component',
    data() {
      return {
        userName: {
          text: '',
          errorText: ''
        },
        userPassword: {
          text: '',
          errorText: ''
        },
      }
    },
    methods: {
      ...mapActions({
        loginUserAction: types.SET_TOKEN_ACTION,
      }),
      login_user() {
        let hasErrors = false;
        if(!this.userName.text) {
          this.userName.errorText = 'Please Enter Your Username, cannot be left blank.';
          hasErrors = true;
        }
        else {
          this.userName.errorText = ''
        }

        if(!this.userPassword.text) {
          this.userPassword.errorText = 'Please Enter Your Password, cannot be left blank.';
          hasErrors = true;
        }
        else {
          this.userPassword.errorText = '';
        }
        if(!hasErrors) {
          let data = {
            'username': this.userName.text,
            'password': this.userPassword.text
          };
          // Call API here
          this.loginUserAction(data);
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "account_styles";
</style>