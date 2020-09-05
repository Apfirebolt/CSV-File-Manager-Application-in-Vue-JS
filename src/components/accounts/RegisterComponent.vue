<template>
    <div>
        <div class="row">
            <form class="col s12" method="post" enctype="multipart/form-data">
                <div class="row white form_container">
                    <h4 class="center red-text accent-2">REGISTER</h4>
                    <div class="input-field col s6">
                        <label for="username">Username</label>
                        <input id="username" name="username" type="text" class="validate" v-model="userName.text" />
                        <p v-if="userName.errorText" class="red-text text-lighten-1">{{ userName.errorText }}</p>
                    </div>
                    <div class="input-field col s6">
                        <label for="email">Email</label>
                        <input id="email" name="email" type="email" class="validate" v-model="userEmail.text">
                        <p v-if="userEmail.errorText" class="red-text text-lighten-1">{{ userEmail.errorText }}</p>
                    </div>
                    <div class="input-field col s6">
                        <label for="password">Please Enter Your Password</label>
                        <input id="password" name="password" type="password" class="validate" v-model="userPassword.text" />
                        <p v-if="userPassword.errorText" class="red-text text-lighten-1">{{ userPassword.errorText }}</p>
                    </div>
                    <div class="input-field col s6">
                        <label for="confirm_password">Please Confirm Your Password</label>
                        <input id="confirm_password" name="confirm_password" type="password" class="validate"
                               v-model="userConfirmPassword.text">
                        <p v-if="userConfirmPassword.errorText" class="red-text text-lighten-1">{{ userConfirmPassword.errorText }}</p>
                    </div>
                    <div class="input-field col s12">
                        <label for="profile_image">Please Upload Profile Image (Optional - Not required)</label>
                        <input id="profile_image" name="profile_image" type="file" class="validate"
                               @change="handleFileChange($event)"/>
                    </div>

                    <input type="submit" class="btn button teal" value="Register"
                        @click.stop.prevent="register_user">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import * as types from '../../store/modules/accounts/accountTypes';
  export default {
    name: 'register_component',
    data() {
      return {
        userEmail: {
          text: '',
          errorText: ''
        },
        userName: {
          text: '',
          errorText: ''
        },
        userPassword: {
          text: '',
          errorText: ''
        },
        userConfirmPassword: {
          text: '',
          errorText: ''
        },
        profile_image: null
      }
    },
    methods: {
      ...mapActions({
        registerUserAction: types.REGISTER_USER,
      }),
      register_user() {
        let hasErrors = false;
        if(!this.userEmail.text) {
          this.userEmail.errorText = 'Please Enter Your Email, cannot be left blank.';
          hasErrors = true;
        }
        else {
          this.userEmail.errorText = '';
        }

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

        if(this.userPassword.text && !this.userConfirmPassword.text) {
          this.userConfirmPassword.errorText = 'Please Confirm Your Password Again.';
          hasErrors = true;
        }

        if(this.userPassword.text && this.userConfirmPassword.text && this.userConfirmPassword.text !== this.userPassword.text) {
          this.userConfirmPassword.errorText = 'The passwords you entered do not match.';
          hasErrors = true;
        }
        else {
          this.userConfirmPassword.errorText = '';
        }
        if(!hasErrors) {
          const formData = new FormData();
          formData.append("email", this.userEmail.text);
          formData.append("username", this.userName.text);
          formData.append("password", this.userPassword.text);
          formData.append("profile_image", this.profile_image);
          // Call API here
          this.registerUserAction(formData);
          console.log('Perfect form..');
        }
      },
      // Handles profile image upload
      handleFileChange(event) {
        this.profile_image = event.target.files[0];
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "account_styles";
    #profile_image_label {
        margin: 1rem auto;
    }

</style>
