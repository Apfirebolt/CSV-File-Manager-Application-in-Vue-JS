<template>
    <div class="container" v-if="csvData">
        <h4 class="center blue-text text-lighten-1">TABLE DATA</h4>
        <table class="highlight">
            <thead>
            <tr>
                <th>ID</th>
                <th>TIME</th>
                <th>PAGE VIEWS</th>
                <th>SESSION VIEWS</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(each_data, index) in csvData" :key="index">
                <td>{{ each_data[0] }}</td>
                <td>{{ each_data[1]|date_filter }}</td>
                <td>{{ each_data[2] }}</td>
                <td>{{ each_data[3] }}</td>
            </tr>
            </tbody>
        </table>
    </div>
    <div v-else>
        <h4 class="center red-text">LOADING...</h4>
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import * as types from '../store/modules/accounts/accountTypes';
  import * as documentTypes from '../store/modules/documents/documentTypes';
  import moment from 'moment';
  export default {
    name: 'table_page',
    mounted() {
      if(!this.csvData) {
        try {
          let current_item = localStorage.getItem('csv_item');
          this.fetchCSVData(current_item);
        } catch(err) {
          console.log(err);
        }
      }
    },
    data() {
      return {

      }
    },
    methods: {
      ...mapActions({
        fetchCSVData: documentTypes.GET_CSV_DATA_ACTION,
      }),
      toggleShowUpload() {
        this.showUpload = !this.showUpload;
      }
    },
    computed: {
      ...mapGetters({
        csvData: documentTypes.GET_CSV_DATA,
      }),
    },
    filters: {
      date_filter(value) {
        return moment(value).format("YYYY-MM-DD");
      }
    },
    destroyed() {
      this.$store.state.documents.csv_data = null;
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
</style>
