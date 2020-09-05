<script>
  import VueCharts from 'vue-chartjs';
  import { PolarArea } from 'vue-chartjs';
  import moment from 'moment';
  export default {
    extends: PolarArea,
    props: {
      date_data: {
        required: true,
        type: Array
      },
      page_data: {
        required: true,
        type: Array
      },
      session_data: {
        required: true,
        type: Array
      }
    },
    mounted () {
      // Overwriting base render method with actual data.
      this.renderChart({
        labels: this.date_data.map((item, index) => {
          return moment(item).format("YYYY-MM-DD");
        }),
        datasets: [
          {
            label: 'Session Data',
            backgroundColor: '#4BE222',
            data: this.session_data
          },
          {
            label: 'Page Data',
            backgroundColor: '#FE5B09',
            data: this.page_data
          },
        ]
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
