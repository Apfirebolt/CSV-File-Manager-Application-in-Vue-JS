<template>
    <div class="container">
        <h4>DASHBOARD</h4>
        <dashboard-section v-if="profileData && documentData"
                           :profileData="profileData" :documentData="documentData"></dashboard-section>
        <p v-else>
            Loading...
        </p>
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import * as types from '../store/modules/accounts/accountTypes';
  import * as documentTypes from '../store/modules/documents/documentTypes';
  import DashboardSection from '../sections/accounts/userData.vue';
  export default {
    name: 'dashboard_page',
    mounted() {
      this.getUserDataAction();
      this.getUserDocumentsAction();
    },
    data() {
      return {
        showUpload: false
      }
    },
    methods: {
      ...mapActions({
        getUserDataAction: types.GET_PROFILE_DATA_ACTION,
        getUserDocumentsAction: documentTypes.GET_ALL_DOCUMENTS_ACTION
      }),
      toggleShowUpload() {
        this.showUpload = !this.showUpload;
      }
    },
    computed: {
      ...mapGetters({
        profileData: types.GET_PROFILE_DATA,
        documentData: documentTypes.GET_ALL_DOCUMENTS
      }),
    },
    components: {
      DashboardSection
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
p {
    font-family: 'Nunito', sans-serif;
}
.card-image {
    img {
        max-height: 450px;
        min-width: 100%;
    }
}
.card-content {
    button {
        margin: 1rem auto;
    }
}
.slide-enter-active  {
    transition: all 1s ease-in-out;
}

.slide-leave-active {
    transition: all 1s ease;
}

.slide-enter /* .fade-leave-active below version 2.1.8 */ {
    margin-left: -1200px;
}

.slide-leave-active {
    margin-left: -1200px;
}
</style>
