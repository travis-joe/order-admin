import { observable } from 'mobx';
import { ProductType } from '../interface/product.type';
import { productsService } from '../services/products.service';

export class ProductsStore {

  @observable list: ProductType[] = []

  addProduct(product) {
    this.list.push(product)
  }

  async editProduct(product, values) {
    let newProduct = await productsService.editProduct({...product, ...values})
    if (product) {
      Object.assign(product, newProduct)
    } else {
      this.list = [newProduct, ...this.list.slice(0, 9)]
    }
    return product
  }

  async getProducts() {
    this.list = await productsService.getProducts()
    return this.list
  }
}

export default new ProductsStore();
