import React from "react";
import HankoAuth from "@/components/auth";
import "../hanko.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const LoginPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <div className="absolute top-4 right-4">
        <Link href="/">
          <Button
            variant="ghost"
            className="bg-red-600 text-white hover:bg-red-700 transition"
          >
            <Home size={20} className="mr-2" />
            Go Home
          </Button>
        </Link>
      </div>
      <HankoAuth />
    </div>
  );
};

export default LoginPage;
