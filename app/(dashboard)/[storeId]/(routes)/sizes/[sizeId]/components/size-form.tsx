"use client";

import * as z from 'zod'
import axios from 'axios';
import { useState } from 'react';
import { Size } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertModal } from '@/components/modals/alert-modal';
import ImageUpload from '@/components/ui/image-upload';

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type SizeFormValues = z.infer<typeof formSchema>;

interface SizeFormProps {
  initialData: Size | null;
}

const SizeForm: React.FC<SizeFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar tamaño" : "Crear tamaño";
  const description = initialData ? "Editar un tamaño" : "Crear un tamaño";
  const toastMessage = initialData ? "Tamaño actualizado" : "Tamaño creado";
  const action = initialData ? "Guardar cambios" : "Crear tamaño";

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: ''
    }
  });

  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success(toastMessage);

    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal 😓")
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success("Tamaño eliminado 😄");

    } catch (error) {
      console.log(error);
      toast.error("Debes remover todos los productos primero de este tamaño 😓")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal 
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <section className="flex items-center justify-between">
        <Heading 
          title={title}
          description={description}
        />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </section>
      <Separator />
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'  
        >
          <main className='grid grid-cols-3 gap-8'>
            <FormField 
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading} 
                      placeholder='Nombre del tamaño'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading} 
                      placeholder='Valor del tamaño'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </main>
          <Button 
            disabled={loading} 
            className='ml-auto' 
            type='submit'
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
};

export default SizeForm;