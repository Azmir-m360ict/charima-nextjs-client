export const API_ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  FORGET_PASSWORD: '/forget-password',

  // PRODUCT
  PRODUCT_LIST: '/ecomm/product',
  PRODUCT_REVIEW: '/ecomm/review/product',
  PRODUCT_ORDER: '/ecomm/order',
  PRODUCT_CATEGORIES: '/ecomm/categories',

  USERS_REGISTER: '/ecomm/auth/signup',
  USERS_LOGIN: '/ecomm/auth/login',
  USERS_ME: '/ecomm/customer/profile',

  IS_REVIEW_ELIGIBLE: '/ecomm/review/eligible',

  ADDRESS_LIST: 'ecomm/customer/shipping-address',
  GET_ALL_PROVINCE: '/ecomm/address/province',
  GET_ALL_CITIES: '/ecomm/address/cities?province=',
  GET_ALL_SUB_CITIES: '/ecomm/address/sub-cities?city=',
  GET_ALL_AREA: '/ecomm/address/area?sub_city=',

  PRODUCT_REVIEW_OF_CUSTOMER: '/ecomm/review',

  CUSTOMER_QUESTION: '/ecomm/qna',
  CHANGE_PASSWORD: '/ecomm/customer/change-password',
  PRODUCT_QUESTION: '/ecomm/qna/product',

  CREATE_QUESTION: '/ecomm/qna',
};
