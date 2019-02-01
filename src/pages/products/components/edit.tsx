import React, { Component, CSSProperties } from 'react';
import { Button, Col, Drawer, Form, Input, InputNumber, Row, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';
import { ProductsStore } from '../../../models/products';
import { ProductType } from '../../../interface/product.type';
import styles from './edit.less';

const { Option } = Select;

interface ProductsEditFormProps {
  visible?: boolean,
  drawerStyle?: CSSProperties,
  activeRow?: ProductType,
  products?: ProductsStore,
  onClose?: (e) => void,
}

@inject('products')
@observer
class ProductsEditForm extends Component<ProductsEditFormProps & FormComponentProps, any> {

  handleSubmit = (ev) => {
    ev.preventDefault()
    const { form, activeRow, products } = this.props

    form.validateFields(async (err, values) => {
      if (err) throw err

      await products.editProduct(activeRow, {
        ...values,
        price: values.price * 100
      })
      this.handleClose(ev)
    })
  }

  handleClose = (ev) => {
    const { form, onClose } = this.props
    form.resetFields()
    onClose(ev)
  }

  render() {
    const { visible, drawerStyle, form: { getFieldDecorator }, activeRow } = this.props
    const safeRow = activeRow || new ProductType

    return (
      <Drawer
        style={drawerStyle}
        width={720}
        visible={visible}
        onClose={this.handleClose}
      >
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="商品名称">
                {getFieldDecorator('name', {
                  initialValue: safeRow.name
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="标签">
                {getFieldDecorator('tags', {
                  initialValue: safeRow.tags
                })(<Select mode="tags" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="单价">
                {getFieldDecorator('price', {
                  initialValue: (safeRow.price / 100) || undefined
                })(<InputNumber style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="库存">
                {getFieldDecorator('stock', {
                  initialValue: safeRow.stock
                })(<InputNumber style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item label="商品状态">
                {getFieldDecorator('status', {
                  initialValue: safeRow.status
                })(<Select>
                  <Option value={0}>正常</Option>
                  <Option value={1}>下架</Option>
                </Select>)}
              </Form.Item>
            </Col> */}
          </Row>
          <Form.Item label="描述">
            {getFieldDecorator('description', {
              initialValue: safeRow.description
            })(<Input.TextArea autosize style={{ minHeight: 80 }} />)}
          </Form.Item>

          <div className={styles.btnGroup}>
            <Button onClick={this.handleClose}>取消</Button>
            <Button type="primary" htmlType="submit">提交</Button>
          </div>
        </Form>
      </Drawer>
    )
  }
}

const ProductsEdit = Form.create<ProductsEditFormProps & FormComponentProps>()(ProductsEditForm)

export default ProductsEdit
