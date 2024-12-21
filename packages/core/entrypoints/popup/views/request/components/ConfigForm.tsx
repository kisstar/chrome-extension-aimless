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
import type { FieldType } from '@/entrypoints/popup/views/request/AddConfig';

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
              确认并继续添加
            </Button>
            <Button htmlType="button" onClick={onCancel}>
              取消
            </Button>
          </Space>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default ConfigForm;
