/*
 * @Author: hcy
 * @Date: 2022-10-18 16:54:33
 * @LastEditors: hcy
 * @LastEditTime: 2022-12-30 11:54:02
 * @FilePath: \src\src\pages\myShare\components\Latest\index.tsx
 * @Description: 最新
 * 
 */
import { latestData } from '@/api/myShare/latest'
import Common from '@/pages/User/components/Common'
import { useAtom } from 'jotai'
import { divider0 } from '@/jotai'
import { arrayReplaceAt } from 'markdown-it/lib/common/utils'
import { useEffect, useState } from 'react'
// 数据占位
const defaultListData = [
  {
    anser: 60,
    read: 15,
    title: '{}内必须包含[]的js正则怎么写？',
    tag: ['php', 'js', 'docker', '运维', '容器'],
    headIcon: '',
    auth: '汝河不上云霄',
    id: 1,
    userId: 1,
  }, {
    anser: 60,
    read: 15,
    title: '{}内必须包含[]的js正则怎么写？',
    tag: ['php', 'js', 'docker', '运维', '容器'],
    headIcon: '',
    auth: '汝河不上云霄',
    id: 1,
    userId: 1,
  }, {
    anser: 60,
    read: 15,
    title: '{}内必须包含[]的js正则怎么写？',
    tag: ['php', 'js', 'docker', '运维', '容器'],
    headIcon: '',
    auth: '汝河不上云霄',
    id: 1,
    userId: 1,
  }, {
    anser: 60,
    read: 15,
    title: '{}内必须包含[]的js正则怎么写？',
    tag: ['php', 'js', 'docker', '运维', '容器'],
    headIcon: '',
    auth: '汝河不上云霄',
    id: 1,
    userId: 1,
  }, {
    anser: 60,
    read: 15,
    title: '{}内必须包含[]的js正则怎么写？',
    tag: ['php', 'js', 'docker', '运维', '容器'],
    headIcon: '',
    auth: '汝河不上云霄',
    id: 1,
    userId: 1,
  }, {
    anser: 60,
    read: 15,
    title: '{}内必须包含[]的js正则怎么写？',
    tag: ['php', 'js', 'docker', '运维', '容器'],
    headIcon: '',
    auth: '汝河不上云霄',
    id: 1,
    userId: 1,
  }, {
    anser: 60,
    read: 15,
    title: '{}内必须包含[]的js正则怎么写？',
    tag: ['php', 'js', 'docker', '运维', '容器'],
    headIcon: '',
    auth: '汝河不上云霄',
    id: 1,
    userId: 1,
  },
]
export default () => {
  // 设置刷新状态
  const [loadingState, setLoadingState] = useState(true);
  const [page,] = useAtom(divider0);
  const [total,setTotal] =useState(10)
  const [listData, setListData] = useState(defaultListData);
  // 获取首页列表数据
  useEffect(() => {
    setLoadingState(true)
    latestData(0).then((result: any) => {
      console.log(result)

      let data = result.data.techqas.filter((e: any, i: number) => i < 7*page&&i>=7*(page-1)).map((e: any, i: number) => {
        return {
          anser: e.techqa.commentAmount || 0, // 评论
          read: e.visitcount || 0, // 阅读
          title: e.techqa.title || 0, // 题目
          tag: e.topics.map((el: any) => el.description) || '无', // 文章标签
          auth: e.user.username ? e.user.username : null, // 文章所有者昵称
          headIcon: e.user.headerUrl || '', // 头像地址
          id: e.techqa.id,// 文章id
          userId: e.user.id // 文章所有者id
        }
      })
      setTotal(result.data.techqas.length)
      setListData(data);
      setLoadingState(false)
    }).catch((err: Error) => {
      console.log(err)
    })
  },[page])
 
  return (
    <>
      {/* 展示插件并传值 */}
      <Common listData={listData} num={7} loading={loadingState} id={0} total={total}></Common>
    </>
  )
}
