import { BillBoardClient } from "./components/client";

const BillboardsPage: React.FC = () => {
  return (
    <section className="flex-col">
      <article className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient />
      </article>
    </section>
  )
};

export default BillboardsPage;