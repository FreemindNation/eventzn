"use client";

import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Select, SelectItem } from "@heroui/select";

const categories = ["All", "Music", "Sports", "Technology", "Comedy"];

export default function EventSearchFilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    
    params.set("page", "1");
    term ? params.set("query", term) : params.delete("query");
    replace(`?${params.toString()}`);
  }, 300);

  const handleFilterChange = (selectedKeys: Set<string>) => {
    const category = Array.from(selectedKeys)[0] || "All";
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");
    category !== "All" ? params.set("category", category) : params.delete("category");
    replace(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="relative flex-1 min-w-[250px]">
        <input
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 pr-3 text-sm outline-none placeholder:text-gray-500"
          defaultValue={searchParams.get("query")?.toString()}
          placeholder="Search events..."
          onChange={(e) => handleSearch(e.target.value)}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div className="flex items-center gap-2">
        <FunnelIcon className="w-5 h-5 text-gray-500" />
        <Select
          className="w-40"
          defaultSelectedKeys={new Set([searchParams.get("category") || "All"])}
          label=" Select Category" labelPlacement="inside"
          onSelectionChange={(keys) => handleFilterChange(keys as Set<string>)}
        >
          {categories.map((category) => (
            <SelectItem key={category} textValue={category}>
              {category}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
