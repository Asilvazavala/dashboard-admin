"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export const BillBoardClient = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <section className="flex items-center justify-between">
        <Heading 
          title="Cartelera {0}"
          description="Administra la cartelera de tu tienda"
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar nuevo
        </Button>
      </section>
      <Separator />
    </>
  )
}