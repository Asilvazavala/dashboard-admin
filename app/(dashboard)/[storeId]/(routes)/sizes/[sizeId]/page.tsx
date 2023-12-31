import prismadb from "@/lib/prismadb";

import SizeForm from "./components/size-form";

const SizePage = async ({
  params
}: {
  params: { sizeId: string }
}) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId
    }
  });

  return (
    <section className="flex-col">
      <article className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </article>
    </section>
  )
};

export default SizePage;