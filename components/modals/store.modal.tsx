"use client";

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { useStoreModal } from '@/hooks/use-store-modal';
import { Modal } from '@/components/ui/modal';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  }

  return (
    <Modal
      title='Crear tienda'
      description='Añadir nueva tienda para administrar productos y categorías'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <main className='space-y-4 pt-2 pb-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading} 
                      placeholder='E-Commerce' 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <article className='pt-6 space-x-2 flex items-center justify-end w-full'>
              <Button 
                disabled={loading}
                variant="outline" 
                onClick={storeModal.onClose}>
                  Cancelar
              </Button>
              <Button 
                disabled={loading}
                type='submit'>
                  Continuar
              </Button>
            </article>
          </form>
        </Form>
      </main>
    </Modal>
  );
};