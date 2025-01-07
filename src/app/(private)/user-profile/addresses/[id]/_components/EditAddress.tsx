'use client';
import {
  useGetAddressForEditQuery,
  useUpdateAddressMutation,
} from '@/app/(private)/user-profile/_components/ProfileApiEndpoints';
import Loading from '@/components/common/Loading';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  FormFieldInput,
  FormFieldInputTextArea,
  FormSelect,
} from '@/components/ui/FormItem';
import { toast } from '@/hooks/use-toast';
import {
  useGetAllAreaQuery,
  useGetAllCitiesQuery,
  useGetAllDistrictQuery,
  useGetAllSubCitiesQuery,
} from '@/utils/api-call/commonApisEndpoint';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type Props = {
  id: string;
};

const formSchema = z.object({
  full_name: z.string().min(1, {
    message: 'Please enter a name.',
  }),
  phone_no: z.string().min(11, {
    message: 'Mobile number is required',
  }),

  district: z.string({
    message: 'District is required',
  }),

  city: z.string({
    message: 'City is required',
  }),

  sub_city: z.string({
    message: 'Sub city is required',
  }),

  area: z.string({
    message: 'Area is required',
  }),

  label_type: z.string(),
  shipping_landmark: z.string(),

  shipping_address: z.string({
    message: 'Address details is required',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const EditAddress = ({ id }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useGetAddressForEditQuery({ id: id });
  const {
    name,
    phone,
    label,
    landmark,
    provinance_id,
    city_id: prev_city_id,
    sub_city_id: prev_sub_city_id,
    area_id,
    address,
  } = data?.data || {};

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        full_name: name,
        phone_no: phone,
        label_type: label,
        shipping_landmark: landmark,
        district: String(provinance_id),
        city: String(prev_city_id),
        sub_city: String(prev_sub_city_id),
        area: String(area_id),
        shipping_address: address,
      });
    }
  }, [data]);

  const district_id = form.watch('district');
  const city_id = form.watch('city');
  const sub_city_id = form.watch('sub_city');

  // GET DISTRICT
  const { data: district } = useGetAllDistrictQuery();

  // GET CITES
  const { data: cites } = useGetAllCitiesQuery(
    { district_id },
    { skip: !district_id }
  );

  // GET SUB CITES
  const { data: sub_city } = useGetAllSubCitiesQuery(
    { city_id },
    { skip: !city_id }
  );

  // GET AREA
  const { data: area } = useGetAllAreaQuery(
    { sub_city_id },
    { skip: !sub_city_id }
  );

  // UPDATE ADDRESS

  const [updateAddress, { isSuccess, isError }] = useUpdateAddressMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateAddress({
      body: {
        ecsa_name: values.full_name,
        ecsa_address: values.shipping_address,
        ecsa_phone: values.phone_no,
        ecsa_landmark: values.shipping_landmark,
        ecsa_ar_id: Number(values.area),
        ecsa_label: values.label_type,
      },
      id: id,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Success',
        description: 'Address has been updated',
      });
      router.push('/user-profile/addresses');
    }
  }, [isSuccess]);
  return (
    <div>
      <h3 className='text-2xl font-medium mt-3'>Update Delivery Address</h3>

      {isLoading ? <Loading /> : ''}

      <div className='mt-5'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-2 gap-5'>
              <FormFieldInput<FormValues>
                form={form}
                name='full_name'
                label='Full Name'
                placeholder='Jhon Doe'
                type='text'
              />

              <FormFieldInput<FormValues>
                form={form}
                name='phone_no'
                label='Phone No'
                placeholder='01512345678'
                type='number'
              />

              <FormFieldInput<FormValues>
                form={form}
                name='label_type'
                label='Label type'
                placeholder='Home Address'
                type='text'
              />

              <FormFieldInput<FormValues>
                form={form}
                name='shipping_landmark'
                label='Shipping landmark'
                placeholder='What exact place name to find your location'
                type='text'
              />
              <FormSelect<FormValues>
                options={
                  district?.data?.map((item) => ({
                    label: item.pro_name_en,
                    value: String(item.pro_id),
                  })) || []
                }
                label='Select District'
                name='district'
                placeholder='Select your district'
                onSelect={(e) => {
                  form.resetField('city');
                  form.resetField('sub_city');
                  form.resetField('area');
                }}
              />

              <FormSelect<FormValues>
                options={
                  cites?.data?.map((item) => ({
                    label: item.cit_name_en,
                    value: String(item.cit_id),
                  })) || []
                }
                label='Select City'
                name='city'
                placeholder='Select your city'
              />

              <FormSelect<FormValues>
                options={
                  sub_city?.data?.map((item) => ({
                    label: item.scit_name_en,
                    value: String(item.scit_id),
                  })) || []
                }
                label='Select Sub City'
                name='sub_city'
                placeholder='Select your sub city'
              />

              <FormSelect<FormValues>
                options={
                  area?.data?.map((item) => ({
                    label: item.ar_name_en,
                    value: String(item.ar_id),
                  })) || []
                }
                label='Select Area'
                name='area'
                placeholder='Select your area'
              />
            </div>

            <FormFieldInputTextArea<FormValues>
              form={form}
              name='shipping_address'
              label='Shipping address details'
              placeholder='What your are shipping address details'
            />

            <Button type='submit' className='w-full'>
              Update Address
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditAddress;
