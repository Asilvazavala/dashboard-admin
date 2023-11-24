"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from 'react';
import { MenuIcon, X } from 'lucide-react';

export function MainNav() {
  const pathname = usePathname();
  const params = useParams();

  const [openNavbarMobile, setOpenNavbarMobile] = useState(false);

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Panel',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Carteleras',
      active: pathname === `/${params.storeId}/billboard`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categorías',
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'Tamaños',
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/products`,
      label: 'Productos',
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: 'Órdenes',
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Configuración',
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <div>
      <article onClick={() => setOpenNavbarMobile(!openNavbarMobile)}>
        {openNavbarMobile
          ? <X className="lg:hidden block h-9 w-9"  />
          : <MenuIcon className="lg:hidden block h-9 w-9" />
        }
      </article>

      <nav
        className={`items-center space-x-4 mx-4 lg:mx-6 order-last lg:space-x-6 lg:flex lg:flex-row
        ${openNavbarMobile 
          ? 'flex flex-col dark:bg-blueDark bg-gray-100 gap-y-8 z-50 h-screen w-full absolute left-0 top-16' 
          : 'hidden'} `}  
      >
        {routes.map((route) => (
          <Link
            key={route.href}
            onClick={() => setOpenNavbarMobile(!openNavbarMobile)}
            href={route.href}
            className={cn(
              "lg:text-sm text-2xl font-medium transition-colors hover:text-primary",
              route.active ? "text-black dark:text-white" : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  )
};