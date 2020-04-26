import Vue from 'vue'
import Router from 'vue-router'
// import Router from '../k-router'

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
                
                path: '/communication/1',
                name: 'communicationHello',
                // component: helloworld
                component: () => import('@/components/communication')
                
            }
        ]
    }
]
export default new Router({
    routes: constRouters
})