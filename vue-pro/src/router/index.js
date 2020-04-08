import Vue from 'vue'
import Router from 'vue-router'
// import Router from './myRouter/router.js'
import HelloWorld from '@/components/HelloWorld'
import communication from '@/components/communication/grandFather';
import slot from '@/components/slot';
import form from '@/components/form';
import tree from '@/components/tree';
import notice from '@/components/notice';
import routerIndex from '@/components/router';
import routerHome from '@/components/router/routerHome';
import routerDetial from '@/components/router/routerDetial';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/communication',
      name: 'communication',
      component: communication
    },
    {
      path: '/slot',
      name: 'slot',
      component: slot
    },
    {
      path: '/form',
      name: 'form',
      component: form
    },
    {
      path: '/tree',
      name: 'tree',
      component: tree
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice
    },
    {
      path: '/router',
      name: 'routerIndex',
      component: routerIndex,
      children: [
        {
          path: '/router/home',
          name: 'routerHome',
          component: routerHome
        },
        {
          path: '/router/detial',
          name: 'routerDetial',
          component: routerDetial
        }
      ]
    }
  ]
})
