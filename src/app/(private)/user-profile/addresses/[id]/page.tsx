import EditAddress from './_components/EditAddress';

type Props = {
  params: Promise<{ id: string }>;
};

const EditExistingAddress = async ({ params }: Props) => {
  const query = await params;

  return <EditAddress id={query.id} />;
};

export default EditExistingAddress;
