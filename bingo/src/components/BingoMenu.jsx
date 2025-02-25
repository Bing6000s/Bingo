"use client"; // Required for PrimeReact in Next.js App Router

import Image from "next/image";
import React from "react";
import { Menubar } from "primereact/menubar";
import Link from "next/link";

export default function bingoMenu() {
  const items = [
    { 
      label: (
        <span className="text-lg font-bold tracking-wide text-red-500">
          <h1 className="text-white">Find your next video game with ease.</h1>
        </span>
      ), 
      icon: <Image src="/Bingo.webp" alt="Bingo Logo" width={70} height={70} />
    }
  ];

  const end = (
    <div>
      <button className="px-6 py-2 bg-white text-black font-bold uppercase rounded-lg hover:bg-red-700 transition-all">
        <Link href="/signup">Sign Up</Link>
      </button>
      <button className="px-6 py-2 bg-red-600 text-white font-bold uppercase rounded-lg hover:bg-white hover:text-black transition-all">
        <Link href="/signin">Sign In</Link>
      </button>
    </div>
  );

  return (
    <Menubar model={items} end={end} className="bg-black text-white border-b border-red-600 px-6 shadow-lg" />
  );
}
