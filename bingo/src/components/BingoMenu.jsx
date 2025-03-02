"use client"; // Required for PrimeReact in Next.js App Router

import Image from "next/image";
import React from "react";
import { Menubar } from "primereact/menubar";
import Link from "next/link";

export default function bingoMenu() {
  const items = [
    { 
      label: (
        <span className="text-lg font-bold tracking-wide text-white m-5">
          <h3 className="hidden sm:block m-3">BINGO GAME RECOMMENDER</h3>
        </span>
      ), 
      icon: <Image src="/Bingo.webp" alt="Bingo Logo" width={70} height={70} />
    }
  ];

  const end = (
    <div>
      <button className="m-2 px-6 py-2 bg-white text-black font-bold uppercase rounded-sm hover:bg-red-700 transition-all">
        <Link href="/signup">Bing's List</Link>
      </button>
      <button className="px-6 py-2 bg-red-600 text-white font-bold uppercase rounded-sm hover:bg-white hover:text-black transition-all">
        <Link href="/signin">Sign In</Link>
      </button>
    </div>
  );

  return (
    <Menubar model={items} end={end} className="bg-black text-white border-b border-red-600 px-6 shadow-lg" />
  );
}
