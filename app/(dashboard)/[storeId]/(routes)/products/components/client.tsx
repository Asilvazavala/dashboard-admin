"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface ProductdClientProps {
  data: ProductColumn[]
}

export const ProductClient: React.FC<ProductdClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <section className="flex items-center justify-between">
        <Heading 
          title={`Productos (${data.length})`}
          description="Administra los productos de tu tienda"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar nuevo
        </Button>
      </section>
      <Separator />
      <DataTable 
        columns={columns} 
        data={data} 
        searchKey="name"
      />
      <Heading 
        title="API"
        description="Llamadas de Api para productos"
      />
      <Separator />
      <ApiList 
        entityName="products"
        entityIdName="productId"
      />
    </>
  )
}