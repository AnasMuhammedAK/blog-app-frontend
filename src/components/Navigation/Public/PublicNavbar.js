import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  MenuIcon,
  XIcon,
  LoginIcon,
} from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import Logo from '../../../images/logo-app.png'

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Create", href: "/create-post", current: false },
  { name: "Posts", href: "/posts", current: false },
  { name: "Register", href: "/register", current: false },
  { name: "Login", href: "/login", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const PublicNavbar = () => {
  return (
    <Disclosure as="nav" className="fixed top-0 right-0 left-0 z-10 bg-black py-3 ">
      {({ open }) => (
        <>
          <div className="max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  {/* Logo */}
                  <img className="h-20 w-25 "  src={Logo}/>
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map(item => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-800 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "px-3 py-2 rounded-md text-xl font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link
                    to="/login"
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md text-white bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2   focus:ring-green-400"
                  >
                    <LoginIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span className="text-xl">Login</span>
                  </Link>
                </div>
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  <Link
                    to="/create-post"
                    className="relative inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md text-white bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2   focus:ring-green-400"
                  >
                    <PlusIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span className="text-xl">New Post</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-xl font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default PublicNavbar;
