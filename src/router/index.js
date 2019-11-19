import Vue from 'vue'
import Router from 'vue-router'
import cimeraRouter from './cinema'
import mineRouter from './mine'
import movieRouter from './movie'

Vue.use(Router)

export default new Router({
  routes: [
    cimeraRouter,
    mineRouter,
    movieRouter,
    {
      path: '/*',
      redirect: '/movie'
    }
  ]
})
