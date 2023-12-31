import prismadb from "@/lib/prismadb";

import CategoryForm from "./components/category-form";

const CategoryPage = async ({
  params
}: {
  params: { categoryId: string, storeId: string }
}) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId
    }
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    }
  });

  return (
    <section className="flex-col">
      <article className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm 
          billboards={billboards} 
          initialData={category} 
        />
      </article>
    </section>
  )
};

export default CategoryPage;