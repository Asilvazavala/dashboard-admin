"use client";

import * as z from 'zod'
import axios from 'axios';
import { useState } from 'react';
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOrigin } from '@/hooks/use-origin';
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
import { ApiAlert } from '@/components/ui/apiAlert';

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success("Tienda actualizada 😄");

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
      await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh();
      router.push("/");
      toast.success("Tienda eliminada 😄");

    } catch (error) {
      console.log(error);
      toast.error("Debes remover todos los productos y categorías primero 😓")
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
      <section className="flex md:flex-row flex-col gap-y-4 items-center justify-between">
        <Heading 
          title="Configuración"
          description="Administrar preferiencias de la tienda"
        />
        <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
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
                <FormItem className='w-60 md:w-auto'>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading} 
                      placeholder='Nombre de la tienda'
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
            Guardar cambios
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert 
        title='NEXT_PUBLIC_API_URL'
        description={`${origin}/api/${params.storeId}`}
        variant='public'
      />
    </>
  )
};

export default SettingsForm;