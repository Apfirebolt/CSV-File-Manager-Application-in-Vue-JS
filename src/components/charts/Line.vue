<script>
  import VueCharts from 'vue-chartjs';
  import { Line } from 'vue-chartjs'
  import moment from 'moment';
  export default {
    extends: Line,
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
            label: 'Page Data',
            backgroundColor: '#7F071F',
            data: this.page_data
          },
          {
            label: 'Session Data',
            backgroundColor: '#1212A6',
            data: this.session_data
          }
        ]
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
