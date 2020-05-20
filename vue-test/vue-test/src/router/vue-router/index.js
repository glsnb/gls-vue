import Vue from 'vue'
import Router from 'vue-router'
// import Router from '../k-router'
// import Router from './kRouter-children'


// import communication from '@/components/communication';
// import helloworld from '@/components/HelloWorld';

Vue.use(Router)

const constRouters = [
    // {
    //     path: '/',
    //     redirect: "/hello",
    // },
    {
        path: '/hello',
        name: 'hello',
        // component: helloworld
        component: () => import('@/components/HelloWorld')
    },
    {
        path: '/communication',
        name: 'communication',
        // component: communication
        component: () => import('@/components/communication'),
        children: [
            {
                
                path: '/communication/son',
                name: 'communicationSon',
                // component: helloworld
                component: () => import('@/components/communication/son')
                
            }
        ]
    },
    {
        path: '/grand',
        name: 'grand',
        component: () => import('@/components/communication/grandFather'),
    },
    {
        path: '/kform',
        name: 'kform',
        component: () => import('@/components/k-form')
    },
    {
        path: '/ktoast',
        name: 'ktoast',
        component: () => import('@/components/toast')
    }
]
export default new Router({
    routes: constRouters
})