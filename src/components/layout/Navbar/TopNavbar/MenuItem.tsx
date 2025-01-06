import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { ICategories } from '@/types/Category.type';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

type MenuItemProps = {
  categories: ICategories[] | undefined;
};

export function MenuItem({ categories }: MenuItemProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <NavigationMenuLink
          className={cn([
            navigationMenuTriggerStyle(),
            'font-normal px-3 cursor-pointer',
          ])}
        >
          Categories
          <ChevronDown className='ml-2 h-4 w-4' />
        </NavigationMenuLink>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-screen max-w-3xl p-4'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {categories?.map((category) => (
            <CategoryMenuItem key={category.id} category={category} />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CategoryMenuItem({
  category,
  child,
}: {
  category: ICategories;
  child?: boolean;
}) {
  return (
    <div className='space-y-2'>
      <Link
        href={`/shop?category=${category.cate_slug}`}
        className={cn(
          'font-semibold text-sm hover:text-primary duration-100',
          child && 'font-normal text-muted-foreground '
        )}
      >
        {category.cate_name_en}
      </Link>
      {category.children.length > 0 && (
        <ul className='space-y-1'>
          {category?.children?.map((child, index) => (
            <CategoryMenuItem category={child} child key={index} />
          ))}
        </ul>
      )}
    </div>
  );
}
