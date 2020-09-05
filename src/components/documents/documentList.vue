<template>
   <div class="row">
       <div class="col s12">
           <p>
               {{ document_description }}
           </p>
           <div v-if="aboutToDelete" class="confirm_delete container">
               Are You sure you want to delete this CSV file ?
               <button class="red btn button white-text" @click="delete_helper">Yes, Delete It</button>
               <button class="orange btn button white-text" @click="aboutToDelete = false">Nope!</button>
           </div>
           <div class="container">
               <button class="btn button green lighten-1 black-text" @click="get_csv_data">View Data</button>
               <button class="btn button orange lighten-2 black-text" @click="getChartData">View Chart</button>
               <button class="btn button blue lighten-3 black-text">Update File</button>
               <button class="btn button red lighten-2 black-text" @click="aboutToDelete = true">Delete File</button>
           </div>
       </div>
   </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import * as types from '../../store/modules/documents/documentTypes';
  export default {
    name: 'document_list',
    props: {
      document_id: {
        required: true,
        type: Number
      },
      document_description: {
        required: true,
        type: String
      }
    },
    data() {
      return {
        aboutToDelete: false
      }
    },
    methods: {
      ...mapActions({
        getChartDataAction: types.GET_SINGLE_DOCUMENT,
        deleteSingleFile: types.DELETE_DOCUMENT,
        fetchCSVData: types.GET_CSV_DATA_ACTION
      }),
      getChartData() {
        console.log('Chart data called..');
        this.getChartDataAction(this.document_id);
      },
      delete_helper() {
        this.deleteSingleFile(this.document_id);
      },
      get_csv_data() {
        this.fetchCSVData(this.document_id);
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.col {
    margin: 1.5rem auto;
    font-family: 'Titillium Web', sans-serif;
    background-color: beige;

    .container {
        button {
            margin: 0.5rem;
        }
    }
    p {
        white-space: pre-line;
    }
}
</style>
