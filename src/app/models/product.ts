import {Image} from "./image";
import {ProductOption} from "./product-option";
export interface Product {
    _id: string
    category: boolean,
    description: string,
    images: Image[],
    price: string,
    product_options: ProductOption[],
    store: string
    title: string
}
