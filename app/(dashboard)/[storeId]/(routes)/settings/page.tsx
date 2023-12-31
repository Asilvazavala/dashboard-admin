import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import SettingsForm from "./components/settings-form";

interface SettingsPageProps {
  params: {
    storeId: string;
  }
};

const SettingsPage: React.FC<SettingsPageProps> = async ({
  params
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  });

  if(!store) {
    redirect("/");
  }

  return (
    <section className="flex-col">
      <article className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <SettingsForm initialData={store} />
      </article>
    </section>
  )
};

export default SettingsPage;