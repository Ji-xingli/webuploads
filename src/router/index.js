import Vue from 'vue'
import Router from 'vue-router'
const allindex = r => require.ensure([], () => r(require('../pages/allindex.vue')), 'allindex');
const login = r => require.ensure([], () => r(require('../pages/login/login.vue')), 'login');
const index = r => require.ensure([], () => r(require('../pages/index.vue')), 'Index');
const media = r => require.ensure([], () => r(require('../pages/media/index.vue')), 'media');
const siteManage = r => require.ensure([], () => r(require('../pages/siteManage/index.vue')), 'siteManage');
const personalCenter = r => require.ensure([], () => r(require('../pages/personalCenter/index.vue')), 'personalCenter');
const personalCenterEdit = r => require.ensure([], () => r(require('../pages/personalCenter/edit.vue')), 'personalCenterEdit');


Vue.use(Router)
const routes = [
    {
        path: '/login',
        component: login,
        name: "login",
        meta: {
            title: '登录'
        }
    },
    {
        path: '/',
        component: index,
        // name: "index",
        meta: {
            title: '首页'
        },
        children: [
            {
                path: '/',
                component: allindex,
                name: "allindex",
                meta: {
                    title: '首页'
                },
            },
            {
                path: '/media',
                component: media,
                name: "media",
                meta: {
                    title: '多媒体素材'
                },
            },
            {
                path: '/siteManage',
                component: siteManage,
                name: "siteManage",
                meta: {
                    title: '站点管理'
                },
            },
            {
                path: '/personalCenter',
                component: personalCenter,
                name: "personalCenter",
                meta: {
                    title: '个人中心'
                },
            },
            {
                path: '/personalCenterEdit',
                component: personalCenterEdit,
                name: "personalCenterEdit",
                meta: {
                    title: '修改个人信息'
                },
            },

        ],


    }
];
const router = new Router({
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
})

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach((to, from) => {
    if (to.meta.title) {
        document.title = to.meta.title

    }
})
export default router