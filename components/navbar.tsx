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

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
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

      <NavbarContent className="hidden lg:flex basis-1/3" justify="end">
        <ThemeSwitch />
        <Button as={NextLink} color="primary" href="/sign-in" variant="flat">
          Sign In
        </Button>
        <Button as={NextLink} color="primary" href="/sign-up" variant="solid">
          Sign Up
        </Button>
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1/3" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="flex flex-col gap-4 mt-2 px-4">
          <NavbarMenuItem>
            <ThemeSwitch />
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Button as={NextLink} color="primary" href="/sign-in" variant="flat">
              Sign In
            </Button>
          </NavbarMenuItem>
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
          <NavbarMenuItem>
            <Button
              color="danger"
              variant="flat"
              onPress={() => {
                // Add sign-out logic here
                console.log("User signed out");
              }}
            >
              Sign Out
            </Button>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
