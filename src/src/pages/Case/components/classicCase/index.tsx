/*
 * @Author: zyq
 * @Date: 2022-10-24 09:50:36
 * @Last Modified by: zyq
 * @Last Modified time: 2022-10-30 21:20:46
 */

import React, { useEffect, useState } from 'react';
import { PieChartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Input, Menu, Skeleton, Divider, Modal, Tooltip } from 'antd';
import { Link, NavLink, useHistory } from 'umi';
import styled from './index.less';
import InfiniteScroll from 'react-infinite-scroll-component';
import MaskForm from './MaskForm';
import BackToTop from '@/components/BackTop';

type MenuItem = Required<MenuProps>['items'][number];
const { Search } = Input;
function getItem(
  label: React.ReactNode,
  key?: string | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

//左侧菜单
const items: MenuItem[] = [
  getItem('技术分享', 'tech', <PieChartOutlined />, [
    getItem(
      '上传',
      null,
      null,
      [getItem('技术分享案例', '/techShare'), getItem('技术分享上传', ' ')],
      'group',
    ),
  ]),
];

function ClassicCase() {
  const history = useHistory();
  const [modeList, setModeList] = useState([]);
  //提交技术分享的表单模态框
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClick: MenuProps['onClick'] = (e) => {
    e.keyPath[0] === ' ' ? setIsModalOpen(true) : history.push(e.keyPath[0]);
  };

  //获取设计模式的列表
  const appendData = () => {
    fetch('/umi/modeList')
      .then((res) => res.json())
      .then((res) => {
        setModeList(res.data);
      });
  };
  useEffect(() => {
    appendData();
  }, []);

  const Like = () => {
    console.log('点赞成功');
  };
  //搜索设计模式
  const getData = async () => {};
  //关闭模态框
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styled['caseWrapper']}>
      <div>
        <Menu
          onClick={onClick}
          style={{ width: 200 }}
          mode="inline"
          items={items}
          defaultOpenKeys={['tech']}
        />
      </div>
      {/* 遮罩层实现技术分享的上传 */}
      <Modal
        footer={null}
        width="70vw"
        style={{
          maxWidth: '100vw',
          top: 30,
          paddingBottom: 0,
        }}
        maskClosable={false}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <MaskForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </Modal>

      {/* 设计模式的卡片 */}
      <div>
        <Search
          className={styled['search']}
          placeholder="搜索设计模式"
          onSearch={getData}
        />
        <div className={styled['card']}>
          <InfiniteScroll
            style={{ display: 'flex', flexWrap: 'wrap', paddingTop: '2rem' }}
            dataLength={modeList.length}
            next={appendData}
            hasMore={modeList.length < 30}
            loader={<Skeleton avatar paragraph={{ rows: 2 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          >
            {modeList.map((item: any, index: any) => {
              return (
                <div key={index} className={styled['cardItem']}>
                  <NavLink to={`/modeDetail/${item.id}`}>
                    <div className={styled['image']}>
                      <img src={item.src} alt="" />
                    </div>
                  </NavLink>
                  <div className={styled['content']}>
                    <div className={styled['title']}>{item.title}</div>
                    <div className={styled['bottom']}>{item.description}</div>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
      <BackToTop />
    </div>
  );
}

export default ClassicCase;
