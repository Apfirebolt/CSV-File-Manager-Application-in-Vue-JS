<template>
    <div class="row">
        <transition name="custom-slide" mode="out-in">
            <upload-document-component v-if="showUpload"
                                       :hideUploadBtn="hide_upload_btn"
                                       :isUpdateMode="isUpdateMode"
            ></upload-document-component>
        </transition>

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
                            @click="show_upload_btn">Upload CSV File</button>
                </div>
            </div>
        </div>

        <div>
            <h4 class="center text-black">You can filter your file searches by file description.</h4>
            <p>Please use the filtering box provided below to filter out files based on file description.</p>
            <div class="row">
                <div class="input-field col s12">
                    <input id="file_description_text" type="text" class="validate" v-model="document_description_text">
                    <label for="file_description_text">Please Enter Text To Search Files</label>
                </div>
            </div>
        </div>

        <div class="row">
            <transition-group name="list" tag="div" mode="out-in">
                <document-list-component v-for="(each_data, index) in filteredDocumentData" :key="index" class="col s12 m-1"
                                         :document_id="each_data.id"
                                         :document_description="each_data.file_description"
                                         :showUpload="show_upload_btn"
                                         :updateMode="update_mode_function"
                >
                </document-list-component>
            </transition-group>
        </div>

        <table-section v-if="csvData && viewTable" :csvData="csvData" :hideTable="hideTable"></table-section>
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import * as types from '../../store/modules/accounts/accountTypes';
  import * as documentTypes from '../../store/modules/documents/documentTypes';
  import UploadDocumentComponent from '../../components/documents/UploadDocument.vue';
  import DocumentListComponent from '../../components/documents/documentList.vue';
  import TableSection from '../documents/tableSection.vue';
  export default {
    name: 'dashboard_section',
    data() {
      return {
        showUpload: false,
        viewTable: true,
        document_description_text: '',
        isUpdateMode: false
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
      show_upload_btn() {
        this.showUpload = true;
        this.isUpdateMode = false;
      },
      hide_upload_btn() {
        this.showUpload = false;
      },
      hideTable() {
        this.viewTable = false;
      },
      update_mode_function() {
        this.isUpdateMode = true;
        this.showUpload = true;
      }
    },
    computed: {
      ...mapGetters({
        csvData: documentTypes.GET_CSV_DATA
      }),
      filteredDocumentData() {
        let filteredResults = [];
        if (this.documentData) {
          filteredResults = this.documentData.data.filter((item) => {
            return item.file_description.match(this.document_description_text);
          });
        }
        return filteredResults;
      }
    },
    components: {
      UploadDocumentComponent,
      DocumentListComponent,
      TableSection
    },
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
    .m-1 {
        margin: 1rem auto;
    }
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(100px);
    }
    .custom-slide-enter-active {
        transition: all 1.3s ease;
    }
    .custom-slide-leave-active {
        transition: all 1s ease-in-out;
    }
    .custom-slide-enter {
        opacity: 0;
        transform: translate(1800px, 50px);
    }
    .custom-slide-leave-to {
        transform: translate(-1800px);
    }
</style>
