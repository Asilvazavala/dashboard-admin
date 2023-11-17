import prismadb from '@/lib/prismadb';

interface DashboardPageProps {
  params: { storeId: string }
};

const DahsboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  });

  return (
    <div className='px-4 py-2'>
      Tienda activa: {store?.name}
    </div>
  )
};

export default DahsboardPage;