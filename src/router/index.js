import Vue from 'vue'
import Router from 'vue-router'
const allindex = r => require.ensure([], () => r(require('../pages/allindex.vue')), 'allindex');
const login = r => require.ensure([], () => r(require('../pages/login/login.vue')), 'login');
const index = r => require.ensure([], () => r(require('../pages/index.vue')), 'Index');
const media = r => require.ensure([], () => r(require('../pages/media/index.vue')), 'media');
const siteManage = r => require.ensure([], () => r(require('../pages/siteManage/index.vue')), 'siteManage');
const personalCenter = r => require.ensure([], () => r(require('../pages/personalCenter/index.vue')), 'personalCenter');
const personalCenterEdit = r => require.ensure([], () => r(require('../pages/personalCenter/edit.vue')), 'personalCenterEdit');
const programManage = r => require.ensure([], () => r(require('../pages/programManage/index.vue')), 'programManage');
const progranEdit = r => require.ensure([], () => r(require('../pages/programManage/progranEdit.vue')), 'progranEdit');
const addProgram = r => require.ensure([], () => r(require('../pages/programManage/addProgram.vue')), 'addProgram');
const progranView = r => require.ensure([], () => r(require('../pages/programManage/progranView.vue')), 'progranView');


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
            {
                path: '/programManage',
                component: programManage,
                name: "programManage",
                meta: {
                    title: '节目管理'
                },
            },
            {
                path: '/progranEdit',
                component: progranEdit,
                name: "progranEdit",
                meta: {
                    title: '编辑'
                },
            },
            {
                path: '/progranAdd',
                component: addProgram,
                name: "addProgram",
                meta: {
                    title: '添加'
                },
            },
            {
                path: '/progranView',
                component: progranView,
                name: "progranView",
                meta: {
                    title: '预览'
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