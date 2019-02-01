import { io, METHOD } from '../utils/io.utils';
import { ProductType } from '../interface/product.type';

export namespace productsService {

  export const getProducts = () =>
    io<ProductType[]>('/products')

  export const editProduct = (product: ProductType) =>
    io<ProductType>(product.id ? `/products/${product.id}` : '/products', {
      method: product.id ? METHOD.PUT : METHOD.POST,
      body: JSON.stringify(product)
    })

}
