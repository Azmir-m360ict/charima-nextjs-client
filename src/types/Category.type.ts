import { IProductAttribute } from './Product.type';

export interface ICategories {
  id: number;
  cate_name_en: string;
  cate_name_bn: string;
  cate_slug: string;
  cate_status: number;
  cate_image: string;
  parentId: number | null;
  children: ICategories[];
}

export interface IAllAttributesList {
  attributes: IProductAttribute[];
  brands: IProductBrand[];
}

export interface IProductBrand {
  brand_name: string;
  brand_id: number;
}
