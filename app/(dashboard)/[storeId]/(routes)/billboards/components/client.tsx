"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { BillboardColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface BillBoardClientProps {
  data: BillboardColumn[]
}

export const BillBoardClient: React.FC<BillBoardClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <section className="flex flex-col gap-y-4 md:flex-row items-center justify-between">
        <Heading 
          title={`Carteleras (${data.length})`}
          description="Administra la cartelera de tu tienda"
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar nuevo
        </Button>
      </section>
      <Separator />
      <DataTable 
        columns={columns} 
        data={data} 
        searchKey="label"
      />
      <Heading 
        title="API"
        description="Llamadas de Api para carteleras"
      />
      <Separator />
      <ApiList 
        entityName="billboards"
        entityIdName="billboardId"
      />
    </>
  )
}