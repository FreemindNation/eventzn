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
import { Link } from "@heroui/link";
import NextLink from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      {/* Navbar Start */}
      <NavbarContent className="basis-1/3" justify="start">
        <NavbarBrand>
          <NextLink href="/" className="flex items-center gap-2">
            <Image
              alt="EventZn logo"
              height={38}
              src="/assets/images/logo.png"
              width={128}
            />
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-6 ml-6">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  "text-lg font-medium hover:text-primary transition-colors",
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
        <ThemeSwitch />
        {session?.user ? (
          // Show Sign Out Button if user is logged in
          <Button
            onClick={() => signOut()}
            className="bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 px-4 py-2"
            color="danger"
            variant="flat"
          >
            Sign Out
          </Button>
        ) : (
          // Show Sign In and Sign Up Buttons if user is not logged in
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
      <NavbarContent className="lg:hidden basis-1/3" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Navbar Menu */}
      <NavbarMenu>
        <div className="flex flex-col gap-4 mt-2 px-4">
          <NavbarMenuItem>
            <ThemeSwitch />
          </NavbarMenuItem>
          {session?.user ? (
            <NavbarMenuItem>
              {/* Sign Out Button for Mobile */}
              <Button
                onPress={() => signOut()}
                className="bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 px-4 py-2"
                color="danger"
                variant="flat"
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
          {siteConfig.navItems.map((item) => (
            <NavbarMenuItem key={item.href}>
              <NextLink
                className={clsx(
                  "text-lg font-medium hover:text-primary transition-colors",
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
