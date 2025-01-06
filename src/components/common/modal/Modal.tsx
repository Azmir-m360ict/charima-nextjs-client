import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import { ReactNode } from 'react';

type CustomDialogProps = {
  trigger: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  onSubmit: () => void;
  submitLabel?: string;
  hideFooter?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: ClassValue;
};

export function Modal({
  trigger,
  title,
  description,
  children,
  onSubmit,
  submitLabel = 'Save changes',
  hideFooter = false,
  open,
  onOpenChange,
  className,
}: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn(
          'max-h-screen overflow-y-auto overflow-x-hidden w-full',
          className
        )}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        {hideFooter && (
          <DialogFooter>
            <Button type='submit' onClick={onSubmit}>
              {submitLabel}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
