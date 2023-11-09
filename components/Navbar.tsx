import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/MainNav";
import StoreSwitcher from "@/components/Store-switcher";
import prismadb from '@/lib/prismadb';

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
      <nav className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />

        <small className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </small>
      </nav>
    </section>
  )
};

export default Navbar;