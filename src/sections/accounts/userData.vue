<template>
    <div class="row">
        <upload-document-component v-if="showUpload"></upload-document-component>
        <div class="col s12 m7">
            <div class="card">
                <div class="card-image">
                    <img v-if="profileData.profile_image" :src="profileData.profile_image" alt="Image Not Available" />
                    <img src="@/assets/no_image.png" alt="" v-else>
                    <span class="card-title">Welcome, {{ profileData.username }}</span>
                </div>
                <div class="card-content">
                    <p>{{ profileData.email }}</p>
                </div>
            </div>
        </div>
        <div class="col s12 m5">
            <div class="card">
                <div class="card-content">
                    <p>Hey {{ profileData.username }}, Welcome to the dashboard page. You can upload CSV files
                        and view charts from here.</p>
                    <button class="btn orange waves-effect waves-light"
                            @click="toggleShowUpload">Upload CSV File</button>
                    <button class="btn blue lighten-2 waves-effect waves-light"
                            @click="toggleShowUpload">View All File Details</button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col s12" v-for="(each_data, index) in documentData.data" :key="index">
                <document-list-component
                    :document_id="each_data.id"
                    :document_description="each_data.file_description"
                >
                </document-list-component>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import * as types from '../../store/modules/accounts/accountTypes';
  import UploadDocumentComponent from '../../components/documents/UploadDocument.vue';
  import DocumentListComponent from '../../components/documents/documentList.vue';
  export default {
    name: 'dashboard_section',
    data() {
      return {
        showUpload: false
      }
    },
    props: {
      profileData: {
        required: true,
        type: Object
      },
      documentData: {
        required: true,
        type: Object
      }
    },
    methods: {
      ...mapActions({

      }),
      toggleShowUpload() {
        this.showUpload = !this.showUpload;
      }
    },
    components: {
      UploadDocumentComponent,
      DocumentListComponent
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
            margin: 1rem 0.5rem;
        }
    }
    .row {
        margin: 0;
    }
</style>
