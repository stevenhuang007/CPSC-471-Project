import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation } from "react-router-dom"; // Import useLocation
import logo from "./assets/images/logo-transparent-svg (1).svg";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Player Stats", href: "/playerstats" },
  { name: "Information", href: "/information" },
  { name: "Transaction Tracker", href: "/budgetTracker" },
  { name: "Test", href: "/test"}
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Layout() {
  const location = useLocation(); // Get current location
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar - using new color scheme */}
      <Disclosure as="nav" className="bg-[#1F1717]">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-[#FCF5ED] hover:bg-[#CE5A67] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F4BF96] sm:hidden">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  alt="Casyn Logo"
                  src={logo}
                  className="h-24 w-24 rounded-full"
                />
              </div>
              {/* Desktop Navigation Links */}
              <div className="hidden sm:ml-8 sm:block self-center">
                <div className="flex space-x-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        location.pathname === item.href
                          ? "bg-[#CE5A67] text-white"
                          : "text-[#FCF5ED] hover:bg-[#F4BF96] hover:text-[#1F1717]",
                        "rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-[#1F1717] p-1 text-[#FCF5ED] hover:bg-[#CE5A67] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#F4BF96] focus:ring-offset-2 focus:ring-offset-[#1F1717] transition-colors duration-200"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-[#1F1717] text-sm focus:outline-none focus:ring-2 focus:ring-[#F4BF96] focus:ring-offset-2 focus:ring-offset-[#1F1717]">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt="User"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-[#1F1717]/5 focus:outline-none">
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-[#1F1717] hover:bg-[#FCF5ED]"
                    >
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-[#1F1717] hover:bg-[#FCF5ED]"
                    >
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-[#1F1717] hover:bg-[#FCF5ED]"
                    >
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                className={classNames(
                  location.pathname === item.href
                    ? "bg-[#CE5A67] text-white"
                    : "text-[#FCF5ED] hover:bg-[#F4BF96] hover:text-[#1F1717]",
                  "block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

      {/* Main content */}
      <main className="flex-grow p-8 bg-[#FCF5ED]">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
