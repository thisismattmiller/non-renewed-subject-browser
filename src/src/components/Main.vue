<template>

  <div style="">

    <div v-if="activeHash != null">


      <div style="height: 1.5em;">
        

            <h2><span>{{title1}}</span><span style="color:#3348f5">{{title2}}</span><span>{{title3}}</span><span style="color:#3348f5">{{title4}}</span></h2>


      </div>

      <div v-if="chartDisplay==true"  style="height: 120px;">
        <LineChart :chart-data="chartData" ></LineChart>
      </div>

      <div style="height: 2em; padding-top: 0.2em;">
        
        <div  style="float:left">
          <a class="perm-link" :href="permUrl">Permanent Link</a>
        </div>

        <div class="page-nav" v-if="hasPages == true && loading == false">
            
            <span>Page {{parseInt(activePage)+1}} of {{parseInt(totalPage)+1}}.</span>

            <router-link v-if="activePage>0" style="" :to="{ name: 'facet', params: { pageNum: parseInt(activePage)-1, facetHash: activeHash }}">Previous Page</router-link>
            <span v-else>Previous Page</span>



            <router-link v-if="activePage<totalPage" style="" :to="{ name: 'facet', params: { pageNum: parseInt(activePage)+1, facetHash: activeHash }}">Next Page</router-link>
            <span v-else>Next Page</span>          


        </div>



      </div>



      <table v-if="loading ==false">
        <thead>
          <tr>
            <th>Title</th>
            <th>Creator</th>
            <th>© Date</th>
            <th>Subjects</th>
            <th>Links</th>
            <th>Hathi Status</th>

          </tr>
        </thead>
        <tbody>


          <tr v-for="(row,idx) in pageData.d" v-bind:key="idx">
            <td class="td-title">{{row.t}}</td>
            <td class="td-author">{{row.a}}</td>
            <td>{{row.d}}</td>
            <td><span  class="subject" v-for="sub in row.s" v-bind:key="sub">{{sub}}</span></td>


            <td style="column-count: 2;">
              <span  class="links" v-for="(link,idx) in row.l" v-bind:key="idx">
              <a v-if="row.l[idx].t == 'ld'" target="_blank" :href="'http://id.loc.gov/resources/instances/' + row.l[idx].u">
                id.loc.gov ({{row.l[idx].y.split(',')[0]}})
              </a>
              <a v-if="row.l[idx].t == 'ol'" target="_blank" :href="'https://openlibrary.org/works/' + row.l[idx].u">
                open library ({{row.l[idx].y.split(',')[0]}})
              </a>
              <a v-if="row.l[idx].t == 'l'" target="_blank" :href="'http://lccn.loc.gov/' + row.l[idx].u">
                lccn ({{row.l[idx].y.split(',')[0]}})
              </a>

              <a v-if="row.l[idx].t == 'o'" target="_blank" :href="'http://worldcat.org/oclc/' + row.l[idx].u">
                worldcat ({{row.l[idx].y.split(',')[0]}})
              </a>

              <a v-if="row.l[idx].t == 'h'" target="_blank" :href="'https://babel.hathitrust.org/cgi/pt?id=' + row.l[idx].u">
                hathi ({{row.l[idx].y.split(',')[0]}})
              </a>



              </span>
            </td>
            


            <td>{{row.h}}</td>

          </tr>


        </tbody>
      </table>

      <div v-else style="text-align: left">Loading data...</div>



      <div class="page-nav" v-if="hasPages == true && loading == false">
          
          <span>Page {{parseInt(activePage)+1}} of {{parseInt(totalPage)+1}}.</span>

          <router-link v-if="activePage>0" style="" :to="{ name: 'facet', params: { pageNum: parseInt(activePage)-1, facetHash: activeHash }}">Previous Page</router-link>
          <span v-else>Previous Page</span>



          <router-link v-if="activePage<totalPage" style="" :to="{ name: 'facet', params: { pageNum: parseInt(activePage)+1, facetHash: activeHash }}">Next Page</router-link>
          <span v-else>Next Page</span>          


      </div>


    </div>

    <div v-else>
        

        <div style="text-align: left; padding: 5em;">
            
            <h2 style="position: relative;">Welcome to the subject browser.</h2>
            <p>
              This tool allows browsing the subject headings of over 50,000 biblographic resources that have not had their copyright renewed in the United States 1923–1964.
            </p>
            <p>
              Select a subject on the left to begin. You can combine up to two subjects catagories.
            </p>
            <p>You can read more about this project <a  class="perm-link" href="https://thisismattmiller.com/post/non-renewed/">here</a></p>

        </div>




    </div>

  </div>
</template>

<script>

import EventBus from '../event-bus';

import LineChart from './Line.vue'


export default {
  name: 'Main',
  components: {
    LineChart,

  },  
  props: {
    msg: String
  },
  data: function(){
    return {
      herrr: "hello",
      title1: "",
      title2: "",
      title3: "",
      title4: "",

      permUrl: "",

      loading: false,
      activeHash: null,

      activePage: 0,
      totalPage: 0,
      hasPages: false,

      pageData: [],

      chartDisplay: false,
      chartData: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: '# resources copyrighted',
          backgroundColor: '#FBEAF6',
          data: [80, 20, 12, 39, 10, 40, 39, 40, 40, 90, 12, 11]
        }
      ]
    }
    }
  },

 created: function() {

    if(this.$route.params.pageNum){
      this.activePage = this.$route.params.pageNum
    }

  },  


  mounted: function(){

    EventBus.$on('FACET_CHANGE',(data) => {


      this.loading=true

      let chartDataLabels = Object.keys(data.di)
      let chartDataSeries = []
      chartDataLabels.forEach((i)=>{
        chartDataSeries.push(data.di[i])
      })

      this.chartData = {
      labels: chartDataLabels,
      datasets: [
          {
            label: '# of resources',
            backgroundColor: '#FBEAF6',
            data: chartDataSeries
          }
        ]
      }
      this.activeHash = data.m

      this.chartDisplay=true
      this.totalPage = data.pc
      if (data.pc > 0){
        this.hasPages=true
      }



      if (data.p.length == 2){

        this.title1 = `${data.p[1].c} resources with subjects`
        this.title2 = ' ' + data.p[0].f
        this.title3 = ' & '
        this.title4 = data.p[1].f

      }else if (data.p.length == 1){

        this.title1 = `${data.p[0].c} resources with subject`
        this.title2 = ' ' + data.p[0].f
        this.title3 = ''
        this.title4 = ''
      }

      let pg = 0
      if (this.$route.params.pageNum){
        pg = this.$route.params.pageNum
      }
      this.activePage=pg


      this.permUrl = 'https://thisismattmiller.github.io/non-renewed-subject-browser/#/facet/' + this.activeHash  +'/' + pg



      fetch(`https://thisismattmiller.s3.amazonaws.com/non-renewed/pages/${data.m}_${pg}.json`)
        .then(response => response.json())
        .then((data)=>{
          
          
          
          this.loading=false
          this.pageData=data


        });



      
    });

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-nav{
  float: right;

}
.page-nav a, .page-nav span{
  margin-right: 1em;
  color: #201F27 !important;

}
.perm-link{
  color: #201F27 !important;
  margin-left: 0.25em;
}
tr:nth-child(even){
  background-color: #f7f3e5;
}

thead{
  background-color: #f7f3e5;
}

tr:hover{
  background-color: #f1f3ff;
}

.subject{
  display: block;
  font-size: 0.85em;


}
.subject::before { 
  content: "» ";
}
.links{
  display: block;

  font-size: 0.85em;


}
.links::before { 
  content: "« ";
}
.links a{
  color: #201F27 !important;
}

table{
  border-spacing: 0;
  width: 100%;
}
td{
  text-align: left;
}
.td-title{
  max-width: 25em;
  font-weight: bold;
}
.td-author{
  max-width: 15em;
}
h2{
  color: #201F27;
  padding: 0;
  margin:0;
  position: absolute;
  right: 0;

  padding-right: 1em;
  padding-bottom: 1em;
  padding-top: 0.25em;
    z-index: -100;


}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
