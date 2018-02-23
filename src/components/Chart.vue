
  <div id="app">
    <div class="container">
      <div class="Chart__list">
        <div class="Chart">
          <h2>Linechart</h2>
        </div>
      </div>
    </div>
  </div>


<script>
  import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

  export default {
    name: 'app',
    extends: Doughnut,
    mixins: [reactiveProp],
    props: ['chartData', 'options'],
    mounted() {
      this.renderChart(this.chartData, this.options)
    }
    
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

</style>
