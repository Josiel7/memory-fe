import {
  Card,
  Checkbox,
  Steps,
  Pagination,
  Button,
  Form,
  Input,
  Space,
} from 'antd';
import type { PaginationProps } from 'antd';
import React from 'react';
import { fetchList } from '@/service/list';
import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import styles from './index.less';

const showTotal: PaginationProps['showTotal'] = (total) =>
  `Total ${total} items`;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const IndexPage: React.FC = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const { data, error, loading } = useRequest(() => {
    return fetchList();
  });

  useEffect(() => {}, []);

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const combineTimeList = (arr) => {
    let res = [];
    for (let i = 0; i < 8; i++) {
      res[i] = arr[i]
        ? { title: i + 1, description: arr[i] }
        : { title: i + 1, description: '' };
    }
    return res;
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.main}>
        {data?.map((item) => (
          <Card
            title={item.title}
            extra={<Checkbox onChange={onChange}></Checkbox>}
            // style={{ width: 300 }}
            loading={loading}
            className={styles.card}
          >
            <Steps
              current={current}
              onChange={onChange}
              items={combineTimeList(item.time_list)}
            />
          </Card>
        ))}
        <Pagination
          size="small"
          total={50}
          // disabled
          showTotal={showTotal}
          showSizeChanger
          showQuickJumper
        />
      </div>
      <div className={styles.opt}>
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          className={styles.form}
        >
          <Form.Item name="title" label="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="desc"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default IndexPage;
