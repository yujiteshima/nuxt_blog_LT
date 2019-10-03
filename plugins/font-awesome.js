import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCalendarAlt, faTags } from '@fortawesome/free-solid-svg-icons'

library.add(faCalendarAlt, faTags)

Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false
