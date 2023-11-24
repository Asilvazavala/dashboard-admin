import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Routes } from "./MainNav";

interface NavbarMobileProps {
  routes: Routes;
}

export const NavbarMobile: React.FC<NavbarMobileProps> = ({
  routes
}) => {  
  const location = window.location.pathname;

  return (
    <nav className="lg:hidden ml-8 h-screen">
      <label htmlFor="menuMobile">
        <input type='checkbox' id='menuMobile' className='hidden peer' />
        <GiHamburgerMenu className='h-8 w-8 peer-checked:scale-0 absolute top-4 right-4 z-50
        transition duration-700 delay-150 peer-checked:delay-0' />
        <IoClose className='h-8 w-8 scale-0 dark:text-white text-black peer-checked:block z-50 
        peer-checked:scale-100 absolute top-4 right-4 transition duration-700 delay-0 peer-checked:delay-150' />
        
        <ul className='z-40 translate-x-[-150%] w-full absolute right-0 top-0 transition duration-700 
        pt-20 flex flex-col gap-y-8 bg-gradient-to-r from-slate-400 to-slate-600 dark:from-slate-800 dark:to-slate-950 peer-checked:translate-x-0'>
          {routes.map(item => (
            <li key={item.label} className="flex justify-between w-full text-3xl py-2
            border-gray-300 border-b px-8">
              <a href={item.href} className={`${location === item.href ? 'font-bold' : ''}
                w-full dark:text-white text-black flex justify-between items-center`}
              >
                {item.label}
                <span className="dark:text-white text-black">{item.icon}</span>
              </a>
            </li>
          ))}
        </ul>
      </label>
    </nav>
  )
}