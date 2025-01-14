import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, message } from 'antd';
import { useRequestStore } from '@/entrypoints/options/stores';
import { uuid } from '@/shared';
import ConfigForm from '@/entrypoints/options/views/request/components/config-form';
import type { FormProps } from 'antd';

export type FieldType = {
  group: string;
  request_url: string;
  request_method: string;
  response_content: string;
};

const AddConfig: React.FC = () => {
  const { addConfig } = useRequestStore();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm<FieldType>();
  const initialValues = {
    group: 'system',
    request_url: '',
    request_method: 'get',
    response_content: ''
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    addConfig({
      key: uuid(),
      request_url: values.request_url,
      request_method: values.request_method,
      response_content: values.response_content
    });
    form.resetFields();
    messageApi.open({
      type: 'success',
      content: '添加成功'
    });
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <>
      {contextHolder}
      <ConfigForm
        form={form}
        initialValues={initialValues}
        onFinish={onFinish}
        onCancel={onCancel}
      />
    </>
  );
};

export default AddConfig;
