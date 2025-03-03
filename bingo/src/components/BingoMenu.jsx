"use client"; // Required for PrimeReact in Next.js App Router

import Image from "next/image";
import React from "react";
import { Menubar } from "primereact/menubar";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function bingoMenu() {
  const router = useRouter();
  const items = [
    { 
      label: (
        <span className="text-lg font-bold tracking-wide text-white m-3">
          <h3 className="hidden sm:block m-3">BINGO GAME RECOMMENDER</h3>
        </span>
      ), 
      icon: <Image src="/Bingo.webp" alt="Bingo Logo" width={70} height={70} />,
      command: () => router.push("/")
    }
  ];

  const end = (
    <div>
      <button className="m-2 px-6 py-2 bg-white text-black font-bold uppercase rounded-sm hover:bg-red-700 transition-all">
        <Link href="/signup">Online Games</Link>
      </button>
      <button className="px-6 py-2 bg-red-600 text-white font-bold uppercase rounded-sm hover:bg-white hover:text-black transition-all">
        <Link href="/signin">Sign in</Link>
      </button>
    </div>
  );

  return (
    <Menubar model={items} end={end} className="bg-black text-white border-b border-red-600 shadow-lg" />
  );
}
