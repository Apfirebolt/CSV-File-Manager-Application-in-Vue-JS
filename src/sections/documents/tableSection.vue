<template>
    <div class="row">
        <transition-group name="list" appear mode="ease">
            <div class="container" key="transition_container">
                <button class="btn" @click="hideTable">Hide Table <i class="fa fa-close"></i> </button>
            </div>
            <table v-if="csvData" class="highlight responsive-table" key="transition_table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Page Views</th>
                    <th>Sessions</th>
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
        </transition-group>
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import * as types from '../../store/modules/accounts/accountTypes';
  import moment from 'moment';
  export default {
    name: 'table_section',
    data() {
      return {
        tableHeader: [],
        tableData: []
      }
    },
    mounted() {
      console.log('Mounted props', this.props);
    },
    props: {
      csvData: {
        required: true,
        type: Array
      },
      hideTable: {
        required: true,
        type: Function
      }
    },
    filters: {
      date_filter(value) {
        let formatted_date = moment(value).format("YYYY-MM-DD");
        return formatted_date;
      }
    },
    methods: {
      ...mapActions({

      }),
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
    .list-enter-active {
        transition: all 1s;
    }
    .list-leave-active {
        transition: all 1s ease-in-out;
    }
    .list-enter {
        opacity: 0;
        transform: translate(-1000px, 100px)
    }
    .list-leave-to {
        opacity: 0;
        transform: translate(1000px, -100px)
    }

</style>
