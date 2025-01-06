import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export type MenuListProps = {
  label: string;
  href: string | undefined;
};

export function MenuList({ label, href }: MenuListProps) {
  return (
    <NavigationMenuItem>
      <Link href={href!} legacyBehavior passHref>
        <NavigationMenuLink
          className={cn([navigationMenuTriggerStyle(), 'font-normal px-3'])}
        >
          {label}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}
