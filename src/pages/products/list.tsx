import React, { Component } from 'react';
import { Button, Table, Tag } from 'antd';
import { observer, inject } from 'mobx-react';
import ProductsEdit from './components/edit';
import { safeCurrency } from '../../utils/safe.utils';
import { ProductsStore } from '../../models/products';
import { ProductType, ProductStatusEnum } from '../../interface/product.type';
import styles from './list.less';

interface ProductsListPageProps {
  products: ProductsStore
}

@inject('products')
@observer
class ProductsListPage extends Component<ProductsListPageProps> {
  columns = [{
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags: string[]) =>
      <>{tags.map((item, key) =>
        <Tag key={key}>{item}</Tag>
      )}</>
  }, {
    title: '单价',
    dataIndex: 'price',
    key: 'price',
    render: (val: number) => safeCurrency(val)
  }, {
    title: '库存',
    dataIndex: 'stock',
    key: 'stock',
  }, {
    title: '商品状态',
    dataIndex: 'status',
    key: 'status',
    render: (val) => ProductStatusEnum[val]
  }, {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    render: (val: null, row: ProductType) => {
      return (
        <Button.Group>
          <Button onClick={() => this.handleEditBtnClick(row)}>基本信息</Button>
          <Button>详情页</Button>
          {row.status === ProductStatusEnum.off && <Button type="primary">上架</Button>}
          {row.status === ProductStatusEnum.off && <Button type="danger">删除</Button>}
          {row.status === ProductStatusEnum.on && <Button type="danger">下架</Button>}
          {row.status === ProductStatusEnum.trash && <Button type="primary">恢复</Button>}
        </Button.Group>
      )
    }
  }]

  state = {
    products: [],
    visible: false,
    activeRow: null,
  }

  async componentDidMount() {
    const { products } = this.props
    await products.getProducts()
  }

  handleEditBtnClick = (activeRow?: ProductType) => {
    this.setState({ visible: true, activeRow })
  }
  handleEditDrawerClose = () => {
    this.setState({ visible: false })
  }

  render() {
    const { products: { list } } = this.props
    const { visible, activeRow } = this.state

    return (
      <div className={styles.normal}>
        <div className={styles.header}>
          <h1>商品列表</h1>
          <Button.Group>
            <Button type="primary" onClick={() => this.handleEditBtnClick()}>新建</Button>
          </Button.Group>
        </div>

        <Table
          className={styles.table}
          rowKey="id"
          columns={this.columns}
          dataSource={list}
        />
        <ProductsEdit
          visible={visible}
          activeRow={activeRow}
          onClose={this.handleEditDrawerClose}
        />
      </div>
    );
  }
}

export default ProductsListPage;
