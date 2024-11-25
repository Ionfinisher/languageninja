import React from "react";
import HankoProfile from "@/components/profile";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import "../hanko.css";
import Link from "next/link";

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 z-40">
        <Link href="/dashboard">
          <Button className="bg-red-600 text-white hover:bg-red-700">
            <X size={20} />
          </Button>
        </Link>
      </div>
      <div className="min-h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <HankoProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
