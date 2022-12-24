/*
 * @Author: hcy
 * @Date: 2022-10-04 17:08:52
 * @LastEditors: zyqqun 2450100414@qq.com
 * @LastEditTime: 2022-12-18 14:40:42
 * @FilePath: \src\src\api\api.ts
 * @Description: axios封装
 *
 */
import axios from 'axios';
import configEnv from '@/utils/configEnv';
import mock from '@/utils/configEnv';
import storage from '@/utils/storage';
import { message } from 'antd';
import { useHistory } from 'umi';
// const history = useHistory();
const TOKEN_Lose_Efficacy = '你的Token已经失效了，请重新登录！';
const NETWORK_ERROR = '网络连接失败，请稍后重试';
/* axios配置 */
export const service = axios.create({
  //基本地址
  baseURL: mock ? configEnv.mockApi : configEnv.baseApi,
  //设置超时时间
  timeout: 10000,
  // headers: {
  //     // "content-type": "application/json",
  //     // "content-type": "application /x-www-urlcoded",
  //     // "Access-Control-Allow-Origin": "*"
  //     // "Content-Type": "multipart/form-data"
  // }
  headers: {
    'Access-Control-Allow-Origin': '*',
    // 'content-type': 'application/json',
  },
});
/***
 *
 * 请求拦截
 *
 */

service.interceptors.request.use((req: any) => {
  //console.log(req);
  const headers = req.headers;
  if (!headers.Authorization) headers.Authorization = 'hcy';

  if (storage.getItem('token') != undefined) {
    headers.Authorization = storage.getItem('token');
  }

  return req;
});

/***
 *
 * 返回拦截
 */
service.interceptors.response.use((res: any) => {
  let { data, msg } = res;
  if (res.status === 200 && res.data.code != '40001') {
    return data;
  } else if (res.data.code === '40001') {
    //message.error(TOKEN_Lose_Efficacy);
    setTimeout(() => {
      storage.clearItem('userInfo');
      // history.push('/login');
    }, 6000);

    return Promise.reject(TOKEN_Lose_Efficacy);
  } else {
    // message.error(msg || NETWORK_ERROR);
    return Promise.reject(msg || NETWORK_ERROR);
  }
});

/***
 *
 * 关键函数
 *
 * options参数配置
 *
 */

function request(options: any) {
  options.method = options.method || 'get';

  console.log(options);

  // if (options.method.toLowerCase() === 'get') {
  //   options.params = options.data;
  // }

  if (configEnv.env === 'prod') {
    service.defaults.baseURL = configEnv.baseApi;
  } else {
    service.defaults.baseURL = configEnv.mock
      ? configEnv.mockApi
      : configEnv.baseApi;
  }

  return service(options); //注意返回axios对象
}

['get', 'post', 'put', 'delete'].forEach((item) => {
  request[item] = (url: any, data: any, options: any) => {
    // console.log(url,data);
    return request({
      url,
      data,
      method: item,
      ...options,
    });
  };
});

// http request 拦截器
// req.interceptors.request.use(
//   (config) => {
//     // const token = window.sessionStorage.getItem('token')
//     // const userid = window.sessionStorage.getItem('userid')

//     // if (token && userid) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//     //   // config.headers.authorization = token //请求头加上token
//     //   config.headers.token = token;
//     //   config.headers.userid = userid
//     // }
//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   },
// );

// http response 拦截器
// req.interceptors.response.use(
//   (response) => {
//     //拦截响应，做统一处理
//     return response;
//   },
//   //接口错误状态处理，也就是说无响应时的处理
//   (error) => {
//     return Promise.reject(error.response.status); // 返回接口返回的错误信息
//   },
// );

//export default req;
export default request;
