import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '系统通知', icon: 'dashboard' }
    }]
    // meta: { title: '首页', icon: 'dashboard',roles: ['18'] }
  },
  {
    path: '/medicare',
    component: Layout,
    children: [{
      path: 'medicareApply',
      name: 'medicareApply',
      component: () => import('@/views/medicare/medicareApply'),
      meta: { title: '体检报名', icon: 'example'}
    }],
    meta: { title: '体检报名', icon: 'dashboard',roles: ['4'] }
  },
  {
    path: '/medicare',
    component: Layout,
    children: [{
      path: 'medicareApplyView',
      name: 'medicareApplyView',
      component: () => import('@/views/medicare/medicareApplyView'),
      meta: {title: '报名信息查看', icon: 'example'}
    }],
    meta: { title: '报名信息查看', icon: 'dashboard',roles: ['6'] }
  },
  {
    path: '/medicare',
    component: Layout,
    children: [{
      path: 'medicareReportView',
      name: 'medicareReportView',
      component: () => import('@/views/medicare/medicareReportView'),
      meta: { title: '体检报告查看', icon: 'example'}
    }],
    meta: { title: '体检报告查看', icon: 'dashboard',roles: ['7'] }
  },
  {
    path: '/medicare',
    component: Layout,
    children: [{
      path: 'medicareExaminationQuery',
      name: 'medicareExaminationQuery',
      component: () => import('@/views/medicare/medicareExaminationQuery'),
      meta: { title: '体检报名情况', icon: 'example'}
    }],
    meta: { title: '体检报名情况', icon: 'dashboard',roles: ['10'] }
  },
  {
    path: '/medicare',
    component: Layout,
    children: [{
      path: 'StudentMedicareApply',
      name: 'StudentMedicareApply',
      component: () => import('@/views/medicare/studentMedicareApply'),
      meta: { title: '医保信息报名', icon: 'example',roles: ['3']}
    }],
    meta: { title: '医保信息报名', icon: 'dashboard',roles: ['3'] }
  },
  {
    path: '/medicare',
    component: Layout,
    children: [{
      path: 'StudentMedicareApplyView',
      name: 'StudentMedicareApplyView',
      component: () => import('@/views/medicare/studentMedicareApplyView'),
      meta: { title: '医保报名信息查看', icon: 'example',roles: ['5']}
    }],
    meta: { title: '医保报名信息查看', icon: 'dashboard',roles: ['5'] }
  },
  {
    path: '/medicare',
    component: Layout,
    children: [{
      path: 'CollegeMedicareApplyQuery',
      name: 'CollegeMedicareApplyQuery',
      component: () => import('@/views/medicare/collegeMedicareApplyQuery'),
      meta: { title: '本科生医保报名查询', icon: 'example',roles: ['8']}
    }],
    meta: { title: '本科生医保报名查询', icon: 'example',roles: ['8']}
  }, {
    path: '/medicare',
    component: Layout,
    children: [{
      path: 'MasterMedicareApplyQuery',
      name: 'MasterMedicareApplyQuery',
      component: () => import('@/views/medicare/masterMedicareApplyQuery'),
      meta: { title: '研究生医保报名查询', icon: 'example',roles: ['9']}
    }],
    meta: { title: '研究生医保报名查询', icon: 'example',roles: ['9']}
  },
  { path: '/', redirect: '/login', hidden: true },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
