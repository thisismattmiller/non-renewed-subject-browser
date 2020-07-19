<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],

  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(

      this.chartData

    ,
    {
      responsive: true,
      maintainAspectRatio: false,
     legend: {
        display: false
     }, 

      scales: {
                  xAxes: [{
                     gridLines: {
                        display: false
                     },

                  }],
                  yAxes: [{
                     gridLines: {
                        display: false
                     },
                      ticks: {
                        display: false //this will remove only the label
                      }                     
                  }]
             }
    }


    )
  }
}
</script>
<style>

canvas{

  width:100% !important;
  height:120px !important;

}
</style>