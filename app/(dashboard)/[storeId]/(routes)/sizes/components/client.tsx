"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { SizeColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface SizeClientProps {
  data: SizeColumn[]
}

export const SizeClient: React.FC<SizeClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <section className="flex md:flex-row flex-col gap-y-4 items-center justify-between">
        <Heading 
          title={`Tamaños (${data.length})`}
          description="Administra los tamaños de tu tienda"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
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
        description="Llamdas de Api para tamaños"
      />
      <Separator />
      <ApiList 
        entityName="sizes"
        entityIdName="sizeId"
      />
    </>
  )
}