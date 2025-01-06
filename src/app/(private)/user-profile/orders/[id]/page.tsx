'use client';
import { useGetSingleOrderDetailsQuery } from '@/utils/api-call/OrderApisEndpoints';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, MapPin, Package } from 'lucide-react';
import AddReview from '../../reviews/_component/AddReview';
import ViewReviewDetails from '../../reviews/_component/ViewReviewDetails';

const page = () => {
  const { id } = useParams();

  const { data: res } = useGetSingleOrderDetailsQuery(
    { id: id as string },
    { skip: !id }
  );

  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'completed':
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getPaymentStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return 'bg-red-500/10 text-red-500';
      case 1:
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const data = res?.data;

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      {/* Order Summary Card */}
      <Card>
        <CardHeader className='pb-4'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-sm text-muted-foreground'>Order #{id}</p>
              <CardTitle className='text-2xl font-bold mt-1'>
                Order Details
              </CardTitle>
            </div>
            <div className='space-y-1 text-right'>
              <Badge className={getStatusColor('pending')}>
                Order: {data?.order_status}
              </Badge>
              <div>
                <Badge className={getPaymentStatusColor(data?.payment_status!)}>
                  Payment: {data?.payment_status === 0 ? 'Unpaid' : 'Paid'}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex items-center space-x-4 text-sm text-muted-foreground'>
            <Clock className='w-4 h-4' />
            <span>{formatDate(data?.order_create_date)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Product Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className='text-xl'>
            <Package className='w-5 h-5 inline-block mr-2' />
            Products
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          {data?.productDetails?.map((product) => (
            <Card key={product.id} className='space-y-4 pt-5 border p-5 '>
              <div className='flex justify-between items-start'>
                <div className='w-full'>
                  <h3 className='font-medium'>{product.name}</h3>

                  <div className='text-sm text-muted-foreground mt-1'>
                    {product?.attributes?.map((attr) => (
                      <span key={attr.av_id} className='mr-4'>
                        {attr.a_name}: {attr.av_value}
                      </span>
                    ))}
                  </div>

                  {product?.review?.length ? (
                    <ViewReviewDetails data={product.review} />
                  ) : (
                    <AddReview
                      order_id={data.id}
                      product_id={product.ep_id}
                      name={product.name}
                    />
                  )}
                </div>
                <div className='text-right'>
                  <p className='font-medium'>
                    ৳{product.price.toLocaleString()}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    Quantity: {product.quantity}
                  </p>
                </div>
              </div>
            </Card>
          ))}

          <Separator className='my-6' />

          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span>Subtotal</span>
              <span>৳{data?.sub_total.toLocaleString()}</span>
            </div>
            <div className='flex justify-between text-sm'>
              <span>Delivery Charge</span>
              <span>৳{data?.delivery_charge.toLocaleString()}</span>
            </div>
            <div className='flex justify-between text-sm'>
              <span>Discount</span>
              <span>৳{data?.discount.toLocaleString()}</span>
            </div>
            <Separator className='my-2' />
            <div className='flex justify-between font-medium'>
              <span>Total</span>
              <span>৳{data?.grand_total.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Address Card */}
      <Card>
        <CardHeader>
          <CardTitle className='text-xl'>
            <MapPin className='w-5 h-5 inline-block mr-2' />
            Delivery Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-1'>
            <div className='flex justify-between'>
              <h3 className='font-medium'>{data?.address.name}</h3>
              <Badge variant='outline'>{data?.address.label}</Badge>
            </div>
            <p className='text-sm text-muted-foreground'>
              Phone: {data?.address.phone}
            </p>
            <p className='text-sm text-muted-foreground'>
              {data?.address.address}
            </p>
            <p className='text-sm text-muted-foreground'>
              {data?.address.area_name}, {data?.address.sub_city_name}
            </p>
            <p className='text-sm text-muted-foreground'>
              {data?.address.city_name}, {data?.address.province_name}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
