import { IAtributeType } from './common.type';

export interface IProducts {
  id: number;
  name: string;
  organic: number;
  price: number;
  images: IProductImage[];
  attribute: IProductAttribute[];
  sale_price: number;
  details?: string;
  unit: string;
  brand_name: string;
  slug: string;
  available_stock: number;
  tags: string;
  avg_rating: string | null;
  total_sold: string;
  ep_seo_title: string;
  ep_seo_description: string;
  ep_short_details: string;
}

export interface ISearchProduct {
  id: number;
  name: string;
  slug: string;
  sale_price: number;
  price: number;
  images: {
    image_id: number;
    image_name: string;
  }[];
}

export interface IProductAttribute {
  av_id: number;
  a_name: IAtributeType;
  av_value: string;
}

export interface IProductImage {
  image_id: number;
  image_name: string;
}

// PURCHASE PRODUCT

export interface IPurchase {
  address_id: number | string;
  delivery_charge: number;
  products: IPurchaseProduct[];
}

export interface IPurchaseProduct {
  id: number;
  quantity: number;
  av_id: number[] | null;
}

export interface IOrderList {
  id: number;
  payment_status: number;
  grand_total: number;
  order_status: string;
  order_date: string;
}

export interface ISingleOrderDetails {
  id: number;
  order_status: string;
  payment_status: number;
  sub_total: number;
  delivery_charge: number;
  discount: number;
  grand_total: number;
  order_create_date: Date;
  address: Address;
  productDetails: IOrderDetailsProductDetail[];
}

export interface Address {
  id: number;
  label: string;
  name: string;
  phone: string;
  address: string;
  area_id: number;
  area_name: string;
  sub_city_id: number;
  sub_city_name: string;
  city_id: number;
  city_name: string;
  province_id: number;
  province_name: string;
}

export interface IOrderDetailsProductDetail {
  id: number;
  ep_id: number;
  price: number;
  name: string;
  quantity: number;
  attributes: IProductAttribute[];
  review: IProductDetailsReviews[];
}

export interface IProductDetailsReviews {
  epr_id: number;
  epr_rating: number;
  epr_comment: string;
  epri_image: {
    epri_image_id: number;
    epri_image: string;
  }[];
}

export interface IProductQuestion {
  id: number;
  customer_id: number;
  customer_name: string;
  question: string;
  question_date: string;
  answer: string;
  answer_date: string;
}

export interface IProductQuestionForCustomer extends IProductQuestion {
  product_name: string;
  product_images: ProductImage[];
  slug: string;
  status: number;
}

export interface ProductImage {
  image_id: number;
  image_name: string;
}

export interface IProductReviewList {
  id: number;
  rating: number;
  customer_id?: number;
  comment: string;
  created_at: string;
  customer_name: string;

  product_id?: number;
  product_slug?: string;
  product_name?: string;
  review_images?: {
    image_id: number;
    image_name: string;
  }[];
}
