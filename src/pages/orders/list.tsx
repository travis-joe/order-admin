
import React from 'react';
import { Table } from 'antd';
import styles from './list.less';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
]

export default function () {
  return (
    <div className={styles.normal}>
      <h1>订单列表</h1>
      <Table columns={columns} />
    </div>
  );
}
