"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Hanko } from "@teamhanko/hanko-elements";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { removeLocalStorage } from "@/lib/localStorage";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL;

export default function LogoutBtn() {
  const router = useRouter();
  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => setHanko(new Hanko(hankoApi ?? "")), []);

  const logout = async () => {
    try {
      await hanko?.user.logout();
      removeLocalStorage("userid");
      router.push("/login");
      router.refresh();
      return;
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Button
      onClick={logout}
      className="bg-red-600 text-white duration-300 hover:bg-red-700"
    >
      <LogOut className="mr-2" size={20} />
      Logout
    </Button>
  );
}
