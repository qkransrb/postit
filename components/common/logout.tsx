"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

const Logout = () => {
  return (
    <Button type="button" onClick={() => signOut({ callbackUrl: "/sign-in" })}>
      Logout
    </Button>
  );
};

export default Logout;
