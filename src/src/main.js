import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
Vue.use(VueRouter);


Vue.config.productionTip = false


const routes = [
  {
    path: "/",
    name: "Home",
    component: App
  },

  { name: "facet", path: '/facet/:facetHash/:pageNum', component: App, props: true },

  // {
  //   path: "/edit",
  //   name: "Edit",
  //   component: Edit

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () =>
    //  import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});



new Vue({
  render: h => h(App),
  router

}).$mount('#app')
