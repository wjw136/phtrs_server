import Router from 'vue-router';
import Login from '../components/Login.vue';
import Vue from 'vue'
import index from '../components/Home.vue';
import { Message } from 'element-ui';


Vue.use(Router)

const routes = [{
        path: '/',
        name: 'root',
        redirect: 'login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: 'Login/Sign Up',
            auth: false,
        }
    },
    {
        path: '/index',
        name: 'index',
        component: index,
        meta: {
            title: 'index',
            auth: true,
        }
    }
]

const router = new Router({
    // mode: 'history', //浏览器地址有两部分 后端交互和数据 改变数据并不向后端发送请求(模式分为history和hash)
    routes: routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

router.beforeEach((to, from, next) => {

    //全局路由守护=> user // user_token
    let flag = sessionStorage.getItem('user');
    if (to.meta.auth) {
        if (!flag) {
            Message({
                showClose: true,
                message: '请先登录',
                type: 'warning',
            })

            next({ path: '/login' })
        } else {
            next();
        }
    } else {
        next();
    }

})


export default router