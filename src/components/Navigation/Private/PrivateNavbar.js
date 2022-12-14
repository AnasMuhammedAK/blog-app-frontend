/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import Logo from '../../../images/logo-app.png'
import {
  BellIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import { PlusIcon, LogoutIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../../../redux/slices/users/usersSlice";



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PrivateNavbar = ({ isLogin }) => {
  const dispatch = useDispatch()
  const { userAuth } = useSelector(state => state?.users)
  const userNavigation = [
    { name: "Your Profile", href: `/profile/${userAuth?._id}` },
    { name: "Change your password", href: "/update-password" },
  ]
  const navigation = [
    { name: "Home", href: "/home", current: true },
    { name: "Create", href: "/create-post", current: false },
    { name: "Posts", href: "/posts", current: false },
    { name: "Saved", href: "/saved-posts", current: false },
    { name: "Profile", href: `/profile/${userAuth?._id}`, current: false },
  ];
  return (
    <Disclosure as="nav" className="fixed top-0 right-0 left-0 z-10 bg-black py-3">
      {({ open }) => (
        <>
          <div className="max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8">
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
                  <img alt="logo" className="h-20 w-25 " src={Logo} />
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
                <div className=" flex-shrink-0 ">
                  <Link
                    to="/create-post"
                    className="hidden  relative lg:inline-flex items-center mx-3 px-4 py-2 border shadow-sm text-sm font-medium rounded-md text-white bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2   focus:ring-green-400"
                  >
                    <PlusIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span className="text-xl">New Post</span>
                  </Link>

                  <button
                    onClick={() => dispatch(logoutUserAction())}
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md text-white bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2   focus:ring-green-400"
                  >
                    <LogoutIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span className="text-xl">Logout</span>
                  </button>
                </div>
                <div className="hidden md:ml- md:flex-shrink-0 md:flex md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative z-10">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-gray-800 ml-3 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className=" h-10 w-10 rounded-full"
                               src={userAuth?.profilePhoto}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {userNavigation.map(item => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
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
            {/* Mobile */}
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5 sm:px-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    // src={isLogin.profilePhoto}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {/* {user.name} */}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {/* {user.email} */}
                  </div>
                </div>
                <button className="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1 sm:px-3">
                {userNavigation.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default PrivateNavbar;
