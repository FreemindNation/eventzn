import { Link } from "@nextui-org/link";
import Image from "next/image";

import { GithubIcon } from "./icons";

import { siteConfig } from "@/config/site";

export const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-between py-3 px-6 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <Image
          alt="logo image"
          height={28}
          src="/assets/images/logo.png"
          width={100}
        />
      </div>

      <div className="flex items-center space-x-2">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          &#169; EventZn {new Date().getFullYear()}
        </p>
        <Link
          isExternal
          aria-label="Github"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          href={siteConfig.links.github}
        >
          <GithubIcon className="w-5 h-5" />
        </Link>
      </div>

      <div className="flex items-center" />
    </footer>
  );
};
