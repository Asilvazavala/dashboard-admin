import { format } from 'date-fns';

import prismadb from "@/lib/prismadb";
import { formatter } from '@/lib/utils';

import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";

const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      category: true,
      size: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <section className="flex-col">
      <article className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </article>
    </section>
  )
};

export default ProductsPage;