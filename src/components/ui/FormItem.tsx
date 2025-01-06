import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext, UseFormReturn } from 'react-hook-form';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Eye, EyeOff, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './button';
import { Textarea } from './textarea';

interface FormFieldInputProps<T extends Record<string, any>> {
  form: UseFormReturn<any>;
  name: keyof T;
  label: string;
  placeholder?: string;
  type?: 'email' | 'text' | 'password' | 'number';
  description?: string;
}

export function FormFieldInput<T extends Record<string, any>>({
  form,
  name,
  label,
  placeholder,
  type = 'text',
}: FormFieldInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const formContext = useFormContext();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      control={form.control}
      name={name as string}
      render={({ field }) => (
        <FormItem className='w-full'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className='relative'>
              <Input
                type={
                  type === 'password'
                    ? showPassword
                      ? 'text'
                      : 'password'
                    : type
                }
                placeholder={placeholder}
                {...field}
                className='pr-10'
              />
              {type === 'password' && (
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4 text-gray-500' />
                  ) : (
                    <Eye className='h-4 w-4 text-gray-500' />
                  )}
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FormFieldInputTextArea<T extends Record<string, any>>({
  form,
  name,
  label,
  placeholder,
  description,
  rows = 6,
}: FormFieldInputProps<T> & { rows?: number }) {
  return (
    <FormField
      control={form.control}
      name={name as string}
      render={({ field }) => (
        <FormItem className='w-full'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} rows={rows} />
          </FormControl>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : undefined}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps<T extends Record<string, any>> {
  name: keyof T;
  label: string;
  placeholder?: string;
  options: SelectOption[];
}

export function FormSelect<T extends Record<string, any>>({
  name,
  label,
  placeholder = 'Select an option...',
  options,
  onSelect,
}: FormSelectProps<T> & {
  onSelect?: ((value: string) => void) | undefined;
}) {
  const { control } = useFormContext<T>();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Filter options based on search value
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <FormField
      control={control}
      name={name as any}
      render={({ field }) => (
        <FormItem className='w-full'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  className='w-full justify-between h-10'
                >
                  <span className='truncate'>
                    {field.value
                      ? options.find((option) => option.value === field.value)
                          ?.label
                      : placeholder}
                  </span>
                  {field.value ? (
                    <X
                      className='ml-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100'
                      onClick={(e) => {
                        e.stopPropagation();
                        field.onChange('');
                      }}
                    />
                  ) : (
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='p-0' align='start'>
                <Command>
                  <CommandInput
                    value={searchValue}
                    onValueChange={setSearchValue}
                    placeholder={`Search ${label.toLowerCase()}...`}
                  />
                  <CommandList>
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandGroup>
                      {filteredOptions.map((option) => (
                        <CommandItem
                          key={option.label}
                          value={option.label}
                          onSelect={(e) => {
                            field.onChange(option.value);
                            setOpen(false);
                            setSearchValue('');
                            onSelect && onSelect(e);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              option.value === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
