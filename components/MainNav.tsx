"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { NavbarMobile } from "./NavbarMobile";
import { IoHomeOutline } from "react-icons/io5";
import { ReactNode } from "react";
import { FaRegImage } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { RiFontSize } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdBorderColor } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

interface Route {
  href: string;
  label: string;
  active: boolean;
  icon: ReactNode;
}

export type Routes = Route[];

export function MainNav() {
  const pathname = usePathname();
  const params = useParams();

  const routes: Routes = [
    {
      href: `/${params.storeId}`,
      label: 'Panel',
      active: pathname === `/${params.storeId}`,
      icon: <IoHomeOutline />
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Carteleras',
      active: pathname === `/${params.storeId}/billboard`,
      icon: <FaRegImage />
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categorías',
      active: pathname === `/${params.storeId}/categories`,
      icon: <BiSolidCategoryAlt />
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'Tamaños',
      active: pathname === `/${params.storeId}/sizes`,
      icon: <RiFontSize />
    },
    {
      href: `/${params.storeId}/products`,
      label: 'Productos',
      active: pathname === `/${params.storeId}/products`,
      icon: <IoFastFoodOutline />
    },
    {
      href: `/${params.storeId}/orders`,
      label: 'Órdenes',
      active: pathname === `/${params.storeId}/orders`,
      icon: <MdBorderColor />
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Configuración',
      active: pathname === `/${params.storeId}/settings`,
      icon: <IoMdSettings />
    },
  ];

  return (
    <section>
      <nav className='items-center space-x-4 lg:mx-6 order-last lg:space-x-6 lg:flex lg:flex-row hidden'>
        {routes.map((route) => (
          <Link
            key={route.href}
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

      <NavbarMobile routes={routes} />
    </section>
  )
};