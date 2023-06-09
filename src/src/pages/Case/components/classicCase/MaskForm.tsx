import React from 'react';
import {
  Button,
  Col,
  DatePicker as TDatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
} from 'antd';
import styled from './index.less';
import {
  FilePptOutlined,
  InboxOutlined,
  PlusOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
interface maskProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: maskProps['isModalOpen']) => void;
}

let DatePicker: any = TDatePicker;
export default function MaskForm({ isModalOpen, setIsModalOpen }: maskProps) {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  return (
    <div>
      <Form layout="vertical" form={form}>
        {/* 组号年级班级 */}
        <Row gutter={16} justify="center">
          <Col span={8}>
            <Form.Item
              name="group"
              label="组号"
              rules={[{ required: true, message: '请输入小组组号' }]}
            >
              <Input placeholder="请输入小组组号" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="year"
              label="年级/班级"
              rules={[{ required: true, message: '请输入年级' }]}
            >
              <Select placeholder="请选择所在班级">
                <Select.Option value="2021级3班">2021级3班</Select.Option>
                <Select.Option value="2022级4班">2021级4班</Select.Option>
                <Select.Option value="2020级3班">2020级3班</Select.Option>
                <Select.Option value="2020级4班">2020级4班</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {/* 前后端课题时间 */}
        <Row gutter={16} justify="center">
          <Col span={8}>
            <Form.Item
              name="techType"
              label="技术类别"
              rules={[{ required: true, message: '请输入类别' }]}
            >
              <Select placeholder="请选择技术方向">
                <Select.Option value="前端">前端</Select.Option>
                <Select.Option value="后端">后端</Select.Option>
                <Select.Option value="游戏开发">游戏开发</Select.Option>
                <Select.Option value="其它">其它</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="techShare"
              label="技术分享课题"
              rules={[{ required: true, message: '请输入您的技术分享课题' }]}
            >
              <Input placeholder="技术分享课题" />
            </Form.Item>
          </Col>
        </Row>
        {/* 文件上传 */}
        <Row gutter={16} justify="center">
          <Col span={8}>
            <Form.Item label="文件上传" valuePropName="fileList">
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <FilePptOutlined />
                </p>
                <p className="ant-upload-text">点击/拖拽/文档文件到此处上传</p>
              </Upload.Dragger>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="视频上传" valuePropName="fileList">
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <VideoCameraOutlined />
                </p>
                <p className="ant-upload-text">点击/拖拽/ 视频到此处上传</p>
              </Upload.Dragger>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} justify="center">
          <Col span={16}>
            <Form.Item
              name="dateTime"
              label="时间"
              rules={[{ required: true, message: '请选择分享的日期' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
        {/* 备注
        <Row gutter={16}>
          <Col span={16}>
            <Form.Item
              name="description"
              label="备注"
              rules={[
                {
                  required: false,
                  message: '添加技术分享备注',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="添加技术分享备注" />
            </Form.Item>
          </Col>
        </Row> */}
        {/* 提交内容 */}
        <Row gutter={16} justify="center">
          <Col span={4}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styled['form-button']}
              >
                提交
              </Button>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button
                onClick={onReset}
                htmlType="button"
                className={styled['form-button']}
              >
                重置
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
