"use client";

import * as z from 'zod'
import axios from 'axios';
import { useState } from 'react';
import { Category, Image, Product, Size } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertModal } from '@/components/modals/alert-modal';
import ImageUpload from '@/components/ui/image-upload';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  cantidad: z.coerce.number().min(1),
  description: z.string().min(1),
  categoryId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: Product & {
    images: Image[]
  } | null;
  categories: Category[];
  sizes: Size[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  sizes
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar producto" : "Crear producto";
  const desc = initialData ? "Editar un producto" : "Crear un producto";
  const toastMessage = initialData ? "Producto actualizado" : "Producto creado";
  const action = initialData ? "Guardar cambios" : "Crear producto";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData,
      price: parseFloat(String(initialData?.price)),
      cantidad: parseFloat(String(initialData?.cantidad)),
    } : {
      name: '',
      images: [],
      price: 0,
      cantidad: 1,
      description: '',
      categoryId: '',
      sizeId: '',
      isFeatured: false,
      isArchived: false,
    }
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/products`);
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
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success("Producto eliminado 😄");

    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal 😓")
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
          description={desc}
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
        <FormField 
          control={form.control}
          name='images'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imágenes</FormLabel>
              <FormControl>
                <ImageUpload 
                  value={field.value.map((image) => image.url)}
                  disabled={loading}
                  onChange={(url) => field.onChange([...field.value, { url }])}
                  onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          <main className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <FormField 
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del producto</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading} 
                      placeholder='Nombre del producto'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción del producto</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={loading} 
                      placeholder='Descripción del producto'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input 
                      type='number'
                      disabled={loading} 
                      placeholder='9.99'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name='cantidad'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Existencias</FormLabel>
                  <FormControl>
                    <Input 
                      type='number'
                      disabled={loading} 
                      placeholder='1'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select 
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Seleccionar una categoría'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name='sizeId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamaño</FormLabel>
                  <Select 
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Seleccionar un tamaño'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem
                          key={size.id}
                          value={size.id}
                        >
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name='isFeatured'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>
                      Agregar a inicio
                    </FormLabel>
                    <FormDescription>
                      Este producto aparacerá en la página de inicio
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name='isArchived'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>
                      Archivar
                    </FormLabel>
                    <FormDescription>
                      Este producto no aparacerá en la tienda
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

          </main>
          <Button 
            disabled={loading} 
            className='ml-auto w-full md:w-auto' 
            type='submit'
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
};

export default ProductForm;