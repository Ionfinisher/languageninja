import Header from "@/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Cover } from "@/components/ui/cover";
import Link from "next/link";
import { Brain, Target, Zap } from "lucide-react";

import React from "react";
import { features } from "@/featuresData";

export default function LandingPage() {
  return (
    <>
      <Header type="not-logged" />
      <div className="container h-full pt-24">
        <div className="flex flex-col gap-8  my-20 items-center md:flex-row md:align-middle w-full">
          <div className="flex flex-col m-3 gap-3 md:basis-[60%]">
            <h2 className="text-2xl md:text-4xl font-bold">
              Master Languages Like a{" "}
              <span className="text-red-600"> Ninja</span>{" "}
              <Cover>faster than ever</Cover> with{" "}
              <span className="font-bold">Langugage Ninja</span>
            </h2>
            <p className="text-xl md:text-2xl mb-5">
              Harness the power of AI to learn any language with precision and
              speed. Your personalized sensei awaits.
            </p>
            <div className="flex flex-col gap-8 mt-5 items-center md:flex-row md:align-middle w-full">
              <Link href="/login">
                <Button className="bg-red-600 text-white duration-300 hover:bg-red-700">
                  Get Started
                </Button>
              </Link>
              <Link href="/">
                <Button className="bg-transparent text-black border-black border-solid border-2 hover:bg-black hover:text-white duration-30">
                  Check out how it's built
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:basis-[40%] md:my-3 flex justify-center items-center">
            <Avatar className="w-64 h-64">
              <AvatarImage src="/ninja-logo.png" className="spin" />
              <AvatarFallback>Language Ninja</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="flex flex-col gap-8 my-20 items-center justify-center md:flex-row md:align-middle w-full">
          <HoverEffect items={features} />
        </div>
      </div>
    </>
  );
}
