import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
        <p className="mt-2 text-gray-600">
          Start building your app with NextUI and Tailwind CSS.
        </p>
      </div>
    </div>
  );
}
