<template>
    <form class="col s12" method="post" enctype="multipart/form-data">
        <div class="row white form_container">
            <h4 class="center red-text accent-2">UPLOAD CSV DOCUMENT</h4>
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

            <input type="submit" class="btn button teal" value="Upload Document"
                   @click.stop.prevent="upload_document">
            <p v-if="uploaded_file_required" class="red-text text-lighten-1">{{ uploaded_file_required }}</p>
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
    methods: {
      ...mapActions({
        uploadDocumentAction: types.SAVE_DOCUMENT
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

        if(!hasErrors) {
          const formData = new FormData();
          formData.append("file_description", this.file_description.text);
          formData.append("uploaded_file", this.uploaded_file);
          // Call API here
          this.uploadDocumentAction(formData);
        }
      },
      // Handles CSV File upload
      handleFileChange(event) {
        this.uploaded_file = event.target.files[0];
      },
    },
    computed: {
      ...mapGetters({
      }),
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
</style>