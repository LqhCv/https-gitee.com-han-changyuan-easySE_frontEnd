/*
 * @Author: hcy
 * @Date: 2022-10-04 17:08:52
 * @LastEditors: hcy
 * @LastEditTime: 2022-10-27 18:03:30
 * @FilePath: \src\config\routes.ts
 * @Description: 路由
 *
 */

export default [
  // 路由表
  {
    //登录注册页面
    path: '/beforeLogin',
    component: '@/pages/BeforeLogin',
    routes: [
      {
        path: '/beforeLogin/login',
        component: '@/pages/BeforeLogin/components/Login',
      },
      {
        path: '/beforeLogin/register',
        component: '@/pages/BeforeLogin/components/Register',
      },
    ],
  },
  {
    //忘记密码
    path: '/forgetPassword',
    component: '@/pages/forgetPassword',
  },
  {
    path: '/askquestion',
    component: '@/pages/AskQuestion',
  },
  {
    //主要页面
    path: '/',
    component: '@/layouts',
    routes: [
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        component: '@/pages/Home',
      },
      {
        //实践案例
        path: '/case',
        component: '@/pages/Case', //设计模式
      },
      {
        //设计模式详情
        path: '/modeDetail/:id',
        component: '@/pages/Case/components/modeDetail',
      },
      {
        //技术分享
        path: '/techShare',
        component: '@/pages/Case/components/techShare',
      },
      {
        //技术分享详情
        path: '/techShareDetail/:id',
        component: '@/pages/Case/components/techShareDetail',
      },
      { path: '/task', component: '@/pages/Task' },
      {
        //我的分享问答界面
        path: '/myshare',
        component: '@/pages/myShare',
        routes: [
          {
            path: '/myshare/latest',
            component: '@/pages/myShare/components/Latest',
          },
          {
            path: '/myshare/reply',
            component: '@/pages/myShare/components/Reply',
          },
          {
            path: '/myshare/mouth',
            component: '@/pages/myShare/components/Mouth',
          },
          {
            path: '/myshare/week',
            component: '@/pages/myShare/components/Week',
          },
        ],
      },
      {
        path: '/details',
        component: '@/pages/myShare/components/QuestionDetails',
      },

      {
        //个人中心
        path: '/user',
        component: '@/pages/User',
        routes: [
          {
            path: '/user/usermsgs',
            component: '@/pages/User/components/UserMsgs',
          },
          {
            path: '/user/mycases',
            component: '@/pages/User/components/MyCases',
          },
          {
            path: '/user/myquestions',
            component: '@/pages/User/components/MyQuestions',
          },
          { path: '/user/myasks', component: '@/pages/User/components/MyAsks' },
          {
            path: '/user/myshares',
            component: '@/pages/User/components/MyShares',
          },
        ],
      },

      { component: '@/pages/404' },
    ],
  },

  { component: '@/pages/404' },
];
