import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import VueMaterialSlider from 'vue-material-slider'
import VueRouter from 'vue-router'
//import x5GMaps from 'x5-gmaps'
import * as VueGoogleMaps from 'vue2-google-maps'





import ListeDesRestaurants from './components/ListeDesRestaurants.vue'
import Restaurant from './components/Restaurant.vue'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'


Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueMaterialSlider)
Vue.use(VueRouter)

//Vue.use(x5GMaps, { key: 'AIzaSyB3gY8zwg5W6jJbBpnEnz3LRMRCvnUrJa0', libraries: ['places'] })
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB3gY8zwg5W6jJbBpnEnz3LRMRCvnUrJa0',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'gmap-vue/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then set installComponents to 'false'.
  //// If you want to automatically install all the components this property must be set to 'true':
  installComponents: true
})


// on definit des routes
const router = new VueRouter({
  routes : [
    {
      path: '/',
      component: ListeDesRestaurants
    },
    {
      path: '/restaurant/:id',
      component: Restaurant
    },
  
    
    
  ],

  mode: 'history'
})



new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
}).$mount('#app')
