<template>
  <div class="hello">
    
    <div v-if="subFacetBrowse==false">
      <input id="filter-facet" type="text" v-on:keydown="filter" placeholder="filter subjects" :value="filterTerm" autofocus />
      <ul>
        <li v-for="f in returnFacets" v-bind:key="f['f']">
          <router-link style="color:#201F27; text-decoration: none;" :to="{ name: 'facet', params: { pageNum: 0, facetHash: returnFacetHash(f['f']) }}">
          <div>            
              <span :title="f['f']" v-if="f['f'].length > 26">{{f['f'].substring(0,24)}}...</span>  
              <span :title="f['f']" v-else>{{f['f']}}</span>  
              <div :title="f['f']" class="count">{{f['c']}}</div>            
          </div>
          </router-link>
        </li>
      </ul> 
      <div class="top-facet-msg" v-if="filterTerm==''">Only subjects with more than 50 resources are shown. Use the Filter field to search.</div>
    </div>
    <div v-if="subFacetBrowse==true">

      <div style="display: flex">

        <router-link style="color:#201F27" :to="{ name: activeBackRoute, params: activeBackParms}">
        

          <span >
            <span class="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up" width="33" height="33" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />
                  </svg>  
            </span>
            <span class="text">BACK</span>
          </span>

        </router-link>
      </div>

        <div v-if="facetData.p.length==1" style="background-color: #f1f3ff; margin-bottom: 1em;">
              <div style="font-weight: bold;">{{facetData.f}}</div>
              <div>
                combine with:
          </div>
        </div>

        <div v-if="facetData.p.length==2" style="background-color: #f1f3ff; margin-bottom: 1em;">
              <div style="font-weight: bold;">{{facetData.p[0].f}}</div>
              <div>and</div>
              <div style="font-weight: bold;">{{facetData.p[1].f}}</div>
        </div>

        <ul v-if="facetData.p.length<2">
          <li v-for="f in facetData.t" v-bind:key="f.f">
              <router-link style="color:#201F27; text-decoration: none;" :to="{ name: 'facet', params: { pageNum: 0, facetHash: f.m }}">

              <div>
                  <span :title="f.f" v-if="f.f.length > 26">{{f.f.substring(0,24)}}...</span>  
                  <span :title="f.f" v-else>{{f.f}}</span>  
                  <div :title="f.f" class="count">{{f.c}}</div>
                
              </div>
            </router-link>
          </li>
        </ul> 


    </div>
  </div>
</template>

<script>


import json from '../facets.json'
import md5 from 'md5'
import EventBus from '../event-bus';



function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}






export default {
  name: 'Main',
  props: {
    msg: String
  },
  data: function(){
    return {
      herrr: "hello",
      topLevelFacets: json,
      filterTerm: "",
      facetData: {},      
      subFacetBrowse: false,
      subFacetParent: "",
      activeBackRoute: "Home",
      activeBackParms: {}
    }
  },
  computed: {
     returnFacets() {
        if (this.filterTerm == ''){
          return this.topLevelFacets.filter(f => f.c > 50)
        }else{
          return this.topLevelFacets
        }
     }
  },
  watch: {
    $route(to) {
      // react to route changes...
      


      if (to.params.facetHash){
        this.fetchFacetData(to.params.facetHash)
      }else{
        this.subFacetBrowse=false

        window.setTimeout(()=>{
          document.getElementById('filter-facet').focus()
        },0)

      }
      
    }
  },

  created: function() {
    console.log(this.$route.params)
    

    if (this.$route.params.facetHash){
      this.fetchFacetData(this.$route.params.facetHash)

    }

    window.setTimeout(()=>{
      document.getElementById('filter-facet').focus()
    },0)

  },  

  methods: {

    filter: debounce(function(event) {
      // All the taxing stuff you do
      this.filterTerm = event.target.value

      if (event.target.value.trim()==''){  
        this.topLevelFacets = json
      }else{
        this.topLevelFacets = json.filter(f => f.f.toLowerCase().includes(event.target.value.toLowerCase()))
      }


    }, 300),


     returnFacetHash: function(val){

        return md5(val)

     },

     fetchFacetData: function(hash){

        fetch(`https://thisismattmiller.s3.amazonaws.com/non-renewed/facets/${hash}.json`)
          .then(response => response.json())
          .then((data)=>{
            
            
            
            this.facetData = data
            this.subFacetBrowse = true

            if (this.facetData.p.length == 2){
              this.activeBackRoute = "facet"
              this.activeBackParms = {facetHash: hash.split('-')[0], pageNum: 0}
            }
            else if (this.facetData.p.length == 1){
              this.activeBackRoute = "Home"
              this.activeBackParms = {}
            }            

            EventBus.$emit('FACET_CHANGE', data);


          });



     }


  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input{
  width: 90%;
  border-radius: 2em;
  background: #f1f3ff;
  border: none;
  font-size: 1em;
  padding: 0.35em;
  /*margin: 1px;*/
  margin: 1em 0 1em 0;
}
input:focus{
/*  border: 1px solid black;
  margin: 0px;*/
  outline: none;
  background-color: #fefaed;

}
.top-facet-msg{
  background: #f1f3ff;
  padding: 1em;
}
.count{
    background-color: #f1f3ff;
    padding: 4px;
    border-radius: 19px;
    font-size: 0.75em;
    float: right;
}

.icon,
.text {
  vertical-align: middle;
  display: inline-block;
}
</style>
