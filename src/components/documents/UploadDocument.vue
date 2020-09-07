<template>
    <form class="s12 grey lighten-4 form_container" method="post" enctype="multipart/form-data">
        <p>{{ currentDocumentData }}</p>
        <div class="row">
            <h4 class="center red-text accent-2">{{ isUpdateMode ? 'UPDATE FILE' : 'UPLOAD CSV DOCUMENT' }}</h4>
            <div v-if="isUpdateMode" class="row">
                <div class="input-field col s12">
                    <input disabled id="disabled" type="text" class="validate">
                    <label for="disabled">{{ currentDocumentData.uploaded_file }}</label>
                </div>
            </div>
            <div class="input-field col s6">
                <label for="file_description">Please Enter File Description</label>
                <textarea id="file_description" name="file_description" type="text" class="validate materialize-textarea"
                       v-model="file_description.text">
                </textarea>
                <p v-if="file_description.errorText" class="red-text text-lighten-1">{{ file_description.errorText }}</p>
            </div>
            <div class="input-field col s12">
                <label for="uploaded_file">Please Upload CSV File)</label>
                <input id="uploaded_file" name="uploaded_file" type="file" class="validate"
                       @change="handleFileChange($event)"/>
            </div>

            <input type="submit" class="btn button teal" :value="isUpdateMode ? 'Update Document' : 'Upload Document'"
                   @click.stop.prevent="upload_document">
            <p v-if="uploaded_file_required" class="red-text text-lighten-1">{{ uploaded_file_required }}</p>
            <button class="teal btn accent-1 black-text" @click.stop.prevent="hideUploadBtn">Close</button>
        </div>
    </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import * as types from '../../store/modules/documents/documentTypes';
  export default {
    name: 'upload_document_component',
    data() {
      return {
        uploaded_file: null,
        file_description: {
          text: '',
          errorText: ''
        },
        uploaded_file_required: ''
      }
    },
    props: {
      hideUploadBtn: {
        required: true,
        type: Function
      },
      isUpdateMode: {
        required: true,
        type: Boolean
      }
    },
    methods: {
      ...mapActions({
        uploadDocumentAction: types.SAVE_DOCUMENT,
        updateDocumentAction: types.UPDATE_DOCUMENT
      }),
      upload_document() {
        let hasErrors = false;
        if(!this.file_description.text) {
          this.file_description.errorText = 'File description would be used for searching files, cannot leave it blank.';
          hasErrors = true;
        }
        else {
          this.file_description.errorText = '';
        }

        if(!this.uploaded_file) {
          this.uploaded_file_required = 'Please Upload a file in CSV format only.';
          hasErrors = true;
        }
        else {
          this.uploaded_file_required = '';
        }

        // When we are updating the data
        if(this.isUpdateMode) {
          if(!this.file_description.text) {
            this.file_description.errorText = 'File description would be used for searching files, cannot leave it blank.';
          } else {
            // Call update function with formData
            const formData = new FormData();
            formData.append("file_description", this.file_description.text);
            if(this.uploaded_file) {
              formData.append("uploaded_file", this.uploaded_file);
            }
            // Call API for update and close Modal here
            let payload = {
              document_id: this.currentDocumentData.id,
              data: formData
            }
            this.updateDocumentAction(payload);
            this.hideUploadBtn();
          }
        }
        // Upload file Mode
        else {
          if(!hasErrors) {
            const formData = new FormData();
            formData.append("file_description", this.file_description.text);
            formData.append("uploaded_file", this.uploaded_file);
            // Call API and close Modal here
            this.uploadDocumentAction(formData);
            this.hideUploadBtn();
          }
        }
      },
      // Handles CSV File upload
      handleFileChange(event) {
        this.uploaded_file = event.target.files[0];
      },
    },
    computed: {
      ...mapGetters({
        currentDocumentId: types.GET_CURRENT_DOCUMENT_ID,
        currentDocumentData: types.GET_DOCUMENT_UPDATE_DATA
      }),
    },
    mounted() {
      if(this.isUpdateMode && this.currentDocumentData) {
        this.file_description.text = this.currentDocumentData.file_description;
      }
    },
    destroyed() {
      // Reset the data if update mode
      this.$store.state.documents.document_update_data = null;
    },
    // Track changes in the data from the API
    watch: {
      currentDocumentData: function (value) {
        this.file_description.text = value.file_description;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
    border: 2px solid black;
    padding: 1rem;
    margin: 1.5rem auto;
}
.form_container {
    position: fixed;
    z-index: 1000;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 1.5rem;

    button {
        margin: auto 1rem;
    }
}
</style>
