"use client";

import LogoutBtn from "./logoutButton";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const Header: React.FC<{ type: string }> = ({ type }) => {
  return (
    <header className="bg-black py-3 px-8 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href={"/"} className="flex justify-center items-center gap-3 ">
          <Image
            src="/ninja-logo.png"
            alt="Language Ninja Logo"
            width={45}
            height={45}
            className="cursor-pointer"
          />
          <div className="font-bold text-white md:text-xl cursor-pointer">
            Language Ninja
          </div>
        </Link>
        <nav>
          {type === "logged" ? (
            <div className="flex flex-col items-center justify-center md:flex-row gap-4">
              <Button className="bg-red-600 text-white duration-300 hover:bg-red-700 ml-2">
                <Link href="/profile">Profile</Link>
              </Button>
              <LogoutBtn />
            </div>
          ) : type === "not-logged" ? (
            <Button className="bg-red-600 text-white duration-300 hover:bg-red-700 ml-2">
              <Link href="/login">Get Started</Link>
            </Button>
          ) : null}
        </nav>
      </div>
    </header>
  );
};

export default Header;
