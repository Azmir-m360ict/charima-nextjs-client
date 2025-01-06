'use client';

import { useCustomQueryParams } from '@/hooks/useCustomQueryParams';
import { cn } from '@/lib/utils';
import { ICategories } from '@/types/Category.type';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

interface Props {
  categories?: ICategories[];
}

const CategoriesSectionItem = ({ categories }: Props) => {
  const { handleCheckboxChange, queryParam } = useCustomQueryParams(
    null,
    'category'
  );

  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleClick = (slug: string) => {
    handleCheckboxChange(slug);
  };

  const renderCategory = (category: ICategories, depth: number = 0) => (
    <div key={category.id} style={{ marginLeft: `${depth * 20}px` }}>
      <div className='flex items-center justify-between py-2 cursor-pointer'>
        <div
          onClick={() => handleClick(category.cate_slug)}
          className={cn(
            'flex-grow text-black/60 hover:text-primary',
            queryParam === category.cate_slug && 'text-primary underline'
          )}
        >
          {category.cate_name_en}
        </div>
        {category.children && category.children.length > 0 && (
          <motion.button
            onClick={() => toggleCategory(category.id)}
            className='p-1 text-black/60 hover:text-black'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              initial={false}
              animate={{
                rotate: expandedCategories.includes(category.id) ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <MdKeyboardArrowRight size={20} />
            </motion.div>
          </motion.button>
        )}
      </div>
      <AnimatePresence>
        {expandedCategories.includes(category.id) && category.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='ml-4 overflow-hidden'
          >
            {category.children.map((child) => renderCategory(child, depth + 1))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className='flex flex-col space-y-0.5'>
      {categories?.map((category) => renderCategory(category))}
    </div>
  );
};

export default CategoriesSectionItem;
