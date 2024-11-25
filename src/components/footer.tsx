import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black  text-white py-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-sm text-center">
          <p className="flex justify-center gap-2">
            Language Ninja built with{" "}
            <Image
              src="/bread.png"
              alt="Bread ios icon"
              width={18}
              height={18}
            />{" "}
            by Teddy.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
