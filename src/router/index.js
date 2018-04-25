import Vue from 'vue'
import Router from 'vue-router'
import Profiles from '@/components/Profiles'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Profiles',
      component: Profiles
    }
  ]
})
