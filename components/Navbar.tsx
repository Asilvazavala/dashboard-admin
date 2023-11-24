import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/MainNav";
import StoreSwitcher from "@/components/Store-switcher";
import prismadb from '@/lib/prismadb';
import { ThemeToggle } from "./theme-toggle";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId: userId
    },
  });

  return (
    <section className="border-b">
      <nav className="flex h-16 items-center gap-x-4 px-8 w-full justify-between">
        <StoreSwitcher items={stores} className="order-first" />
        <MainNav />

        <article className="lg:ml-auto flex items-center space-x-4 oder-2">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </article>
      </nav>
    </section>
  )
};

export default Navbar;