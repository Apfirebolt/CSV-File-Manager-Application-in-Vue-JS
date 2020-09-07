<template>
    <div class="container">
        <h4>CHARTS</h4>
        <div v-if="chartData" class="container-fluid">
            <div class="container">
                <h5 class="center black-text">PIE CHART</h5>
                <pie-chart-component
                        :date_data="chartData.date_data"
                        :session_data="chartData.session_data"
                        :page_data="chartData.page_data"
                ></pie-chart-component>
            </div>
            <div class="container">
                <h5 class="center black-text">LINE CHART</h5>
                <line-chart-component
                        :date_data="chartData.date_data"
                        :session_data="chartData.session_data"
                        :page_data="chartData.page_data"
                ></line-chart-component>
            </div>
            <div class="container">
                <h5 class="center black-text">DOUGHNUT CHART</h5>
                <doughnut-chart-component
                        :date_data="chartData.date_data"
                        :session_data="chartData.session_data"
                        :page_data="chartData.page_data"
                ></doughnut-chart-component>
            </div>
            <div class="container">
                <h5 class="center black-text">BAR CHART</h5>
                <bar-chart-component
                        :date_data="chartData.date_data"
                        :session_data="chartData.session_data"
                        :page_data="chartData.page_data"
                ></bar-chart-component>
            </div>
            <div class="container">
                <h5 class="center black-text">RADAR CHART</h5>
                <radar-chart-component
                        :date_data="chartData.date_data"
                        :session_data="chartData.session_data"
                        :page_data="chartData.page_data"
                ></radar-chart-component>
            </div>
            <div class="container">
                <h5 class="center black-text">POLAR AREA CHART</h5>
                <polar-area-component
                        :date_data="chartData.date_data"
                        :session_data="chartData.session_data"
                        :page_data="chartData.page_data"
                ></polar-area-component>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
  import PieChartComponent from '../components/charts/Pie.vue';
  import RadarChartComponent from '../components/charts/Radar.vue';
  import BarChartComponent from '../components/charts/Bar.vue';
  import DoughnutChartComponent from '../components/charts/Doughnut.vue';
  import LineChartComponent from '../components/charts/Line.vue';
  import PolarAreaComponent from '../components/charts/PolarArea.vue';
  import { mapActions, mapGetters } from 'vuex';
  import * as documentTypes from '../store/modules/documents/documentTypes';
  export default {
    name: 'dashboard_page',
    data() {
      return {
        startIndex: 0,
        endIndex: this.startIndex += 20,
        totalPages: 1
      }
    },
    mounted() {
      if(!this.chartData) {
        try {
          let document_id = localStorage.getItem('current_item');
          this.getChartDataAction(document_id);
          this.totalPages = Math.ceil(this.chartData.page_data.length / 20);
        }
        catch(err) {
          console.log('Error', err);
        }
      }

      console.log('Total Pages', this.totalPages);
    },
    destroyed() {
      try {
        localStorage.removeItem('current_item');
      }
      catch (err) {
        console.log('Error');
      }
    },
    methods: {
      ...mapActions({
        getChartDataAction: documentTypes.GET_SINGLE_DOCUMENT
      })
    },
    computed: {
      ...mapGetters({
        chartData: documentTypes.GET_GRAPH_DATA,
      }),
    },
    components: {
      PieChartComponent,
      RadarChartComponent,
      BarChartComponent,
      DoughnutChartComponent,
      LineChartComponent,
      PolarAreaComponent
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    p {
        font-family: 'Nunito', sans-serif;
    }
    .container-fluid {
        width: 100%;
        padding: 1rem;
        margin: 1rem;

        .container {
            margin: 1.5rem auto;
        }
    }

</style>
