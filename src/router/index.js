import Vue from 'vue'
import Router from 'vue-router'

import About from '@/components/About'
import Contact from '@/components/Contact'
import FAQ from '@/components/FAQ'
import Home from '@/components/Home'
import Imprint from '@/components/Imprint'
import Login from '@/components/Login'
import PageNotFound from '@/components/PageNotFound'
import Podcasterin from '@/components/Podcasterin'
import Podcasterinnen from '@/components/Podcasterinnen'
import Privacy from '@/components/Privacy'
import Profile from '@/components/Profile'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/kontakt',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/datenschutz',
      name: 'Privacy',
      component: Privacy
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQ
    },
    {
      path: '/impressum',
      name: 'Imprint',
      component: Imprint
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/podcasterinnen',
      name: 'Podcasterinnen',
      component: Podcasterinnen
    },
    {
      path: '/podcasterinnen/:id',
      name: 'Podcasterin',
      component: Podcasterin
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})
