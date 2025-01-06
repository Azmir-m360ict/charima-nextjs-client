import { IAtributeType } from '@/types/common.type';
import { IProductAttribute } from '@/types/Product.type';
import { imgHostLink } from '@/utils/request';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const compareArrays = (a: any[], b: any[]) => {
  const stringifyA = JSON.stringify(a);
  const stringifyB = JSON.stringify(b);
  return stringifyA.toString() === stringifyB.toString();
};

export const getImageLink = (src?: string) => {
  return imgHostLink + src;
};

export function formatQueryParams(params: any) {
  const searchParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null && params[key]) {
      searchParams.append(key, params[key]);
    }
  });

  return searchParams.toString();
}

export function separateAttribute(
  attribute: IProductAttribute[] = [],
  name: IAtributeType
) {
  if (!attribute) return [];

  return attribute?.filter((attr) => attr.a_name === name);
}

//  Create FormData
export const createFormData = <T>(data: T, formData: FormData): FormData => {
  Object.entries(data as keyof T).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0 && value[0]?.originFileObj) {
      formData.append(key, value[0].originFileObj);
    } else if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value as string | Blob);
    }
  });

  return formData;
};

export function getFirst100WordsFromHTML(html: any, size: number = 100) {
  const plainText = html?.replace(/<[^>]*>/g, '');

  if (plainText?.length > size) {
    return plainText.slice(0, size) + '....';
  }

  return plainText;
}
