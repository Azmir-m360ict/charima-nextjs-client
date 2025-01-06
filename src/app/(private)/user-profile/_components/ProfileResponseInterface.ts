// ADDRESS

export interface IAddress {
  label: string;
  name: string;
  phone: string;
  address: string;
  landmark: string;
  ar_id: number;

  id?: number;
  ecsa_landmark?: string;
  city_name?: string;
  sub_city_name?: string;
  area_name?: string;
  provinance?: string;

  city_id?: number;
  sub_city_id?: number;
  area_id?: number;
  provinance_id?: number;
}

export interface IUpdateAddress {
  ecsa_label: string;
  ecsa_name: string;
  ecsa_phone: string;
  ecsa_address: string;
  ecsa_landmark: string;
  ecsa_ar_id: number;
}

export interface IProfileData {
  ec_id: number;
  ec_name: string;
  ec_phone: string;
  ec_image?: string;
  ec_email: string;
  ec_is_deleted: number;
}
