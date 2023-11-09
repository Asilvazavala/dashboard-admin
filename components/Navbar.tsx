import { UserButton } from "@clerk/nextjs";
import { MainNav } from "@/components/MainNav";

const Navbar: React.FC = () => {
  return (
    <section className="border-b">
      <nav className="flex h-16 items-center px-4">
        <article>
          Store switcher
        </article>
        
        <MainNav className="mx-6" />

        <small className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </small>

      </nav>
    </section>
  )
};

export default Navbar;