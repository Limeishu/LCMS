import Vue          from 'vue'
import axios        from 'axios'
import VueAxios     from 'vue-axios'
import { sync }     from 'vuex-router-sync'
import vueScrollTo  from 'vue-scroll-to'
import VueCookies   from 'vue-cookies'
import { VueEditor } from 'vue2-editor'
import VueDatepicker from '@aries0d0f/vue2-datepicker'

import App          from './App'
import router       from './router'
import store        from './store'

// Fontawesome
import { FontAwesomeIcon }  from '@fortawesome/vue-fontawesome'
import { library }          from '@fortawesome/fontawesome-svg-core'
import { fab }              from '@fortawesome/free-brands-svg-icons'
import { fas }              from '@fortawesome/free-solid-svg-icons'
import { far }              from '@fortawesome/free-regular-svg-icons'

library.add(fab)
library.add(fas)
library.add(far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('VueEditor', VueEditor)

Vue.router = router
Vue.use(VueAxios, axios)

Vue.use(vueScrollTo)

Vue.use(VueCookies)

Vue.component('VueDatepicker', VueDatepicker)

// Enable devtools
Vue.config.devtools = true

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
}).$mount('#LCMS')

export { app }
