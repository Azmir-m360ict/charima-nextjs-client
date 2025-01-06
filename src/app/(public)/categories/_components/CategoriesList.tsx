'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getImageLink } from '@/lib/utils';
import { ICategories } from '@/types/Category.type';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  categories: ICategories[] | undefined;
};

const CategoriesList = ({ categories }: Props) => {
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = (categoryId: any) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className='max-w-frame mx-auto px-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {categories?.map((category) => (
          <Card
            key={category.id}
            className='relative group overflow-visible border-none shadow-md hover:shadow-xl transition-all duration-300'
            onClick={() => router.push(`/shop?category=${category.cate_slug}`)}
          >
            <CardContent className='p-0'>
              <div className='relative cursor-pointer'>
                {/* Image container with overlay */}
                <div className='relative h-72 w-full overflow-hidden rounded-lg'>
                  <Image
                    src={getImageLink(category?.cate_image)}
                    alt={category.cate_name_en}
                    className='h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500'
                    width={295}
                    height={298}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent transition-opacity group-hover:opacity-90' />
                </div>

                {/* Category name and subcategory indicator */}
                <div
                  className='absolute bottom-0 left-0 right-0 p-6 text-white'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(category.id);
                  }}
                >
                  <div className='flex items-center justify-between'>
                    <h3 className='text-xl font-semibold tracking-wide group-hover:transform group-hover:translate-x-2 transition-transform duration-300'>
                      {category.cate_name_en}
                    </h3>
                    {category.children?.length > 0 && (
                      <ChevronDown
                        className={`transition-transform duration-300 ${
                          expandedCategory === category.id ? 'rotate-180' : ''
                        }`}
                        size={24}
                      />
                    )}
                  </div>
                  {category.children?.length > 0 && (
                    <Badge
                      variant='secondary'
                      className='mt-2 bg-white/20 hover:bg-white/30 text-white'
                    >
                      {category.children.length} Subcategories
                    </Badge>
                  )}
                </div>
              </div>

              {/* Subcategories dropdown */}
              <div
                className={`
                  absolute 
                  z-20 
                  left-0 
                  right-0 
                  mt-0
                  rounded-b-lg 
                  bg-white 
                  shadow-xl 
                  overflow-hidden 
                  transition-all 
                  duration-300
                  ${
                    expandedCategory === category.id
                      ? 'max-h-[400px] opacity-100'
                      : 'max-h-0 opacity-0'
                  }
                `}
              >
                <div className='p-2'>
                  {category.children?.map((subcategory, index) => (
                    <Link
                      href={`/shop?category=${subcategory.cate_slug}`}
                      key={subcategory.id}
                      className='block rounded-md px-4 py-3 hover:bg-gray-100 transition-colors duration-200'
                    >
                      <span className='text-gray-800 font-medium'>
                        {subcategory.cate_name_en}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
