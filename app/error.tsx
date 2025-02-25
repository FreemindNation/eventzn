"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Link } from "@heroui/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
 
  return (
    <main className="flex h-screen w-full items-center justify-center p-4 text-center">
      <Card className="max-w-md w-full text-center">
        <CardBody className="text-center">
          <FaceFrownIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Oops! Something went wrong.</h2>
          <p className="text-gray-500">
            Try reloading the page or return to the home page.
          </p>
        </CardBody>
        <CardFooter className="flex flex-wrap justify-center gap-4">
          <Button color="primary" onPress={reset}>
            Try Again
          </Button>
          <Button as={Link} color="secondary" href="/">
            Go Home
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
