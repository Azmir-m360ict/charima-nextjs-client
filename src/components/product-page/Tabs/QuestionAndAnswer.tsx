import Loading from '@/components/common/Loading';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  useAksQuestionMutation,
  useGetQuestionForProductQuery,
} from '@/utils/api-call/QuestionApisEndpoints';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
dayjs.extend(relativeTime);

interface IProps {
  product_id: number;
  auth_data: Session | null;
}

const QuestionAndAnswer = ({ product_id, auth_data }: IProps) => {
  const [askQuestion, { isLoading, isSuccess }] = useAksQuestionMutation();

  const { data: questionList } = useGetQuestionForProductQuery(
    { product_id },
    { skip: !product_id }
  );

  const [value, setValue] = useState('');
  const is_login = auth_data?.user;

  const submit = () => {
    askQuestion({ product_id: product_id, question: value });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Success',
        description: 'Your question is submitted',
      });
      setValue('');
    }
  }, [isSuccess]);

  return (
    <section>
      <h3 className='text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6'>
        Questions about this product
      </h3>
      {!is_login ? (
        <div className='my-5'>
          <Link href={'/login'} className='underline text-blue-600'>
            Login
          </Link>{' '}
          or{' '}
          <Link href={'/signup'} className='underline text-blue-600'>
            Register
          </Link>{' '}
          to ask questions
        </div>
      ) : (
        <div className='flex gap-5 items-end my-5'>
          <Textarea
            placeholder='Ask your question in here'
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <Button onClick={submit} disabled={isLoading}>
            {isLoading ? <Loading /> : 'Submit'}
          </Button>
        </div>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
        {questionList?.data?.map((item) => (
          <Card key={item.id} className='w-full'>
            <CardHeader className='flex flex-row items-center gap-2 mb-0 py-3'>
              <Avatar>
                <AvatarFallback>
                  {item?.customer_name?.slice(0, 2)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <CardTitle className='text-sm'>{item.customer_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='font-semibold mb-2'>Q: {item.question}</p>
              {item.answer ? (
                <p className='text-muted-foreground'>A: {item.answer}</p>
              ) : (
                <Badge
                  variant='outline'
                  className='bg-yellow-100 text-yellow-800'
                >
                  Awaiting Answer
                </Badge>
              )}
            </CardContent>
            <CardFooter className='text-sm text-muted-foreground'>
              <p>Asked {dayjs(item.question_date).fromNow()}</p>
              {item.answer_date && (
                <p className='ml-4'>
                  Answered {dayjs(item.answer_date).fromNow()} ago
                </p>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default QuestionAndAnswer;
