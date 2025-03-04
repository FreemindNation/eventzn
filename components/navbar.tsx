"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import NextLink from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Avatar, Tooltip } from "@heroui/react";


import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();


  //Filter "Dashboard" if user is not an Admin
  const filteredNavItems = siteConfig.navItems.filter(
    (item) => !(item.href === "/dashboard" && session?.user?.role !== "ADMIN")
  );

  const filteredNavMenuItems = siteConfig.navMenuItems.filter(
    (item) => !(item.href === "/dashboard" && session?.user?.role !== "ADMIN")
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      {/* Navbar Start */}
      <NavbarContent className="basis-1/3" justify="start">
        <NavbarBrand>
          <NextLink className="flex items-center gap-2" href="/">
            <Image
              alt="EventZn logo"
              height={38}
              src="/assets/images/logo.png"
              width={128}
            />
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-6 ml-6">
          {filteredNavItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  "text-lg font-medium hover:text-primary hover:underline transition-colors",
                  pathname === item.href && "text-primary font-semibold"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Navbar Right Side */}
      <NavbarContent className="hidden lg:flex basis-1/3" justify="end">
        {session?.user && (
          <Tooltip content={<span>Logged in as {session?.user.name}</span>}>
            <Avatar
              isBordered
              showFallback
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
              src={session.user.image}
            />
          </Tooltip>
        )}
        <ThemeSwitch />
        {session?.user ? (
          <Button
            className="bg-purple-700 text-white dark:text-white font-semibold rounded-md hover:underline focus:outline-none focus:ring-2  px-4 py-2"
            variant="flat"
            onPress={() => signOut()}
          >
            Sign Out
          </Button>
        ) : (
          <>
            <Button
              as={NextLink}
              color="primary"
              href="/sign-in"
              variant="flat"
            >
              Sign In
            </Button>
            <Button
              as={NextLink}
              color="primary"
              href="/sign-up"
              variant="solid"
            >
              Sign Up
            </Button>
          </>
        )}
      </NavbarContent>

      {/* Navbar Menu Toggle for Mobile */}
      <NavbarContent className="lg:hidden basis-1/3 flex items-center gap-6" justify="end">
        {session?.user && (
          <Tooltip content={<span>Logged in as {session?.user.name}</span>}>
            <Avatar
              isBordered
              showFallback
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
              src={session.user.image}
            />
          </Tooltip>
        )}
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Navbar Menu */}
      <NavbarMenu >
        <div className="flex flex-col gap-4 mt-2 px-4">
          <NavbarMenuItem>
            <ThemeSwitch />
          </NavbarMenuItem>
          {session?.user ? (
            <NavbarMenuItem>
              {/* Sign Out Button for Mobile */}
              <Button
                className="bg-purple-700 text-white dark:text-white font-semibold rounded-md hover:underline focus:outline-none focus:ring-2  px-4 py-2"
                // color="danger"
                variant="flat"
                onPress={() => 
                  signOut() 
                   }
              >
                Sign Out
              </Button>
            </NavbarMenuItem>
          ) : (
            <>
              <NavbarMenuItem>
                {/* Sign In Button for Mobile */}
                <Button
                  as={NextLink}
                  color="primary"
                  href="/sign-in"
                  variant="flat"
                >
                  Sign In
                </Button>
              </NavbarMenuItem>
              <NavbarMenuItem>
                {/* Sign Up Button for Mobile */}
                <Button
                  as={NextLink}
                  color="primary"
                  href="/sign-up"
                  variant="solid"
                >
                  Sign Up
                </Button>
              </NavbarMenuItem>
            </>
          )}
          {filteredNavMenuItems.map((item) => (
            <NavbarMenuItem key={item.href}>
              <NextLink
                className={clsx(
                  "text-lg font-medium hover:text-primary hover:underline transition-colors",
                  pathname === item.href && "text-primary font-semibold"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
