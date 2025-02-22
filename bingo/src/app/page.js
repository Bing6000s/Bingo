"use client"; // Required for PrimeReact in Next.js App Router

import Image from "next/image";
import React from "react";
import { Menubar } from "primereact/menubar";
import Head from "next/head";

export default function HelloPage() {
  const items = [
    { label: "bingo", icon: "/bingo/public/console.png" },
    { label: "About", icon: "pi pi-info" },
    { label: "Services", icon: "pi pi-cog" },
    { label: "Contact", icon: "pi pi-envelope" },
  ];

  const start = (
    <Image src="/joystick.png" alt="joystick" width={50} height={50} />
  );
  const end = (
    <button className="px-6 py-2 bg-red-600 text-white font-bold uppercase rounded-lg hover:bg-red-700 transition-all">
      Login
    </button>
  );

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Head>
        <title>Bingo - Home</title>
      </Head>

      {/* Navbar */}
      <Menubar
        model={items}
        start={start}
        end={end}
        className="bg-black text-white border-b border-red-600 px-6 shadow-lg"
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-r from-black via-red-700 to-[#d40000] text-center p-6">
        <h1 className="text-5xl font-extrabold uppercase tracking-wider text-white drop-shadow-lg">
          Find Your Next Game Using Bingo!
        </h1>
        <p className="text-lg mt-4 max-w-2xl text-gray-300">
          We analyze your gaming experience and preferences to give you the
          perfect recommendation. Start here:
        </p>
        <button className="mt-6 px-8 py-3 bg-red-600 text-white font-bold uppercase rounded-full shadow-lg hover:bg-red-700 hover:scale-105 transition-all">
          Get Started
        </button>
      </div>
    </div>
  );
}
HelloPage()