import React from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  Flex,
  Space,
  type FormInstance
} from 'antd';
import type { FieldType } from '@/entrypoints/options/views/request/AddConfig';

interface ConfigFormProps {
  form: FormInstance<FieldType>;
  initialValues: FieldType;
  onFinish: ((values: FieldType) => void) | undefined;
  onCancel: () => void;
}

const { TextArea } = Input;
const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const methodSelectOptions = [
  { label: 'GET', value: 'get' },
  { label: 'POST', value: 'post' },
  { label: 'PUT', value: 'put' },
  { label: 'DELETE', value: 'delete' },
  { label: 'PATCH', value: 'patch' },
  { label: 'HEAD', value: 'head' },
  { label: 'OPTIONS', value: 'options' },
  { label: 'TRACE', value: 'trace' },
  { label: 'CONNECT', value: 'connect' }
];

const ConfigForm: React.FC<ConfigFormProps> = ({
  form,
  initialValues,
  onFinish,
  onCancel
}) => {
  return (
    <Form
      style={{ width: 350 }}
      {...layout}
      layout="horizontal"
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item name="group" label="分组" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
          disabled
        >
          <Option value="system">System</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="request_url"
        label="请求地址"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="request_method"
        label="请求方法"
        rules={[{ required: true }]}
      >
        <Select
          placeholder="Select a option and change input text above"
          allowClear
          options={methodSelectOptions}
        ></Select>
      </Form.Item>

      <Form.Item
        name="response_content"
        label="返回内容"
        rules={[{ required: true }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Flex justify={'flex-end'}>
          <Space>
            <Button type="primary" htmlType="submit">
              确认添加并继续
            </Button>
            <Button htmlType="button" onClick={onCancel}>
              返回
            </Button>
          </Space>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default ConfigForm;
