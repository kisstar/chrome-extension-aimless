import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, message } from 'antd';
import { useRequestStore } from '@/entrypoints/popup/stores';
import { uuid } from '@/shared';
import type { FormProps } from 'antd';
import ConfigForm from '@/entrypoints/popup/views/request/components/ConfigForm';

export type FieldType = {
  group: string;
  request_url: string;
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
    response_content: ''
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    addConfig({
      id: uuid(),
      request_url: values.request_url,
      response_content: values.response_content
    });
    form.resetFields();
    console.log(values);
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
