import { ICategories } from '@/types/Category.type';
import { API_ENDPOINTS } from '@/utils/api-call/api-endpoints';
import { fetchRequest } from '@/utils/fetchApis';
import CategoriesSectionItem from './CategoriesSectionItem';

const CategoriesSection = async () => {
  const response = await fetchRequest<ICategories[]>(
    API_ENDPOINTS.PRODUCT_CATEGORIES
  );

  const categories = response.data;

  return <CategoriesSectionItem categories={categories} />;
};

export default CategoriesSection;
