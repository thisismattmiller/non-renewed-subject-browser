<template>
  <div id="app">


  <input type="checkbox" id="sidebartoggler" name="" value="" checked>

  <div class="page-wrap">

    <nav id="navbar">
      <label for="sidebartoggler" class="toggle">
        <div class="hamb"></div><div class="hamb" style="">          
        </div>
        <div class="hamb"></div>
      </label>
      <h1 style="padding: 0px;
    margin: 0px;
    font-size: 2em;
    position: absolute;
    right: 0.25em;
    color: #fefaed;">Non-Renewed Subject Browser</h1>
    </nav>
    

    
    <div class="sidebar">
      <Facets/>
    </div>

    <div class="page-content">
      <div style="padding-top:50px">

        <Main/>

      </div>
    </div>
        

  </div>


    
  </div>
</template>

<script>
import Main from './components/Main.vue'
import Facets from './components/Facets.vue'

export default {
  name: 'App',
  components: {
    Main,
    Facets
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #201F27;
}
html, body {
  margin: 0;
  padding: 0; 
  font-family: sans-serif;
  background-color: #fefaed;
  min-height: 1000px;
}
.hamb{
  width: 28px;
  height: 5px;
  background: white;
  margin-bottom: 3px;
  
}
#navbar{
  height: 45px;
  width: 100%;
  position: fixed;
  z-index:9999;
  background: #7483fc;
}
.page-content {
  margin: auto;
  position: relative;
  margin-left: 0%;
  z-index: 0;
  -webkit-transition: all 0.15s ease-out 0;
  -moz-transition: all 0.15s ease-out 0;
  transition: all 0.15s ease-out 0;
  background: #fefaed; 

}

.toggle {
  text-decoration: none;
  font-size: 30px;
  color: black;
  -webkit-transition: all 0.15s ease-out 0;
  -moz-transition: all 0.15s ease-out 0;
  transition: all 0.15s ease-out 0;
  position: fixed;
  top: 10px;
  left: 20px;
  z-index: 1;
  cursor: pointer; 
  transition: .8s;
}

.sidebar {
  position: fixed;
  
  top: 45px;
  bottom: 0px;
  left: -16em;
  -webkit-transition: all 0.15s ease-out 0;
  -moz-transition: all 0.15s ease-out 0;
  transition: all 0.15s ease-out 0;
  width: 16em;
  padding: 2px;
  /*background: #333333;*/
  background-color: #FBEAF6;
  z-index: 1000; 
  transition: .7s;
  overflow-y: scroll;
}
  
.sidebar ul {
    list-style: none;
    margin: 0;
    padding: 0; 
    text-align: left;
}

.sidebar li {
    color: #201F27;
    font-family:  Avenir, Helvetica, Arial, sans-serif;
    /*font-size: 5px;*/
    margin: 0;
    margin-bottom: 5px;
    padding: 0.01em;
    -webkit-font-smoothing: antialiased;
    cursor: pointer; 
    clear: both;

}
   
.sidebar li:hover {
  background-color: white; 
  border-radius: 50px;
}

#sidebartoggler {
  display: none; 
}

.page-wrap .page-content {
    margin-left: 5px;
}   

#sidebartoggler:checked + .page-wrap .sidebar {
  left: 0px; 
  transition: .6s;
}
#sidebartoggler:checked + .page-wrap {
  left: 200px; 
  transition: .6s;
}







/* 
  ##Device = Desktops
  ##Screen = 1281px to higher resolution desktops
*/

@media (min-width: 1281px) {
  
  
  #sidebartoggler:checked + .page-wrap .page-content {
    margin-left: 260px;
  }  

}

/* 
  ##Device = Laptops, Desktops
  ##Screen = B/w 1025px to 1280px
*/

@media (min-width: 1025px) and (max-width: 1280px) {
  
  
  #sidebartoggler:checked + .page-wrap .page-content {
    margin-left: 260px;
  }  
  
}

/* 
  ##Device = Tablets, Ipads (portrait)
  ##Screen = B/w 768px to 1024px
*/

@media (min-width: 768px) and (max-width: 1024px) {
  
  
 #sidebartoggler:checked + .page-wrap .page-content {
  margin-left: 260px;
  } 

}

/* 
  ##Device = Tablets, Ipads (landscape)
  ##Screen = B/w 768px to 1024px
*/

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  
  
  #sidebartoggler:checked + .page-wrap .page-content {
    margin-left: 260px;
  }  
}

/* 
  ##Device = Low Resolution Tablets, Mobiles (Landscape)
  ##Screen = B/w 481px to 767px
*/

@media (min-width: 481px) and (max-width: 767px) {
  
  h1{
    font-size: 1.5em !important; 
  }
 

}

/* 
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/

@media (min-width: 320px) and (max-width: 480px) {
  
  h1{
    font-size: 1.5em !important;
  }


}








</style>
