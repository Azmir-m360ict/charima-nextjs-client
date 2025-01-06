export interface HTTPResponse<T> {
  success: boolean;
  total?: number;
  data?: T;
  message?: string;
  token?: string;
}
export interface ILoginRes {
  ec_id: number;
  ec_name: string;
  ec_phone: string;
  ec_image?: string;
  ec_email: string;
  ec_status: number;
  ec_is_deleted: number;
}

export interface ISignUp {
  name: string;
  email: string;
  password: string;
}

export type IAtributeType = 'Color' | 'Size';

export type Discount = {
  amount: number;
  percentage: number;
};

export interface IGetAllProvince {
  pro_id: number;
  pro_name_en: string;
  pro_name_bn: string;
  pro_c_id: number;
}

export interface IGetAllCities {
  cit_id: number;
  cit_name_en: string;
  cit_name_bn: string;
}

export interface IGetAllSubCities {
  scit_id: number;
  scit_name_en: string;
  scit_name_bn: string;
}

export interface IGetAllArea {
  ar_id: number;
  ar_name_bn: string;
  ar_name_en: string;
}
