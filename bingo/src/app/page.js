"use client"; // Required for PrimeReact in Next.js App Router

import Image from "next/image";
import React from "react";
import { Menubar } from "primereact/menubar";
import Head from "next/head"
export default function HelloPage() {
  const items = [
    { label: "bingo", icon: "/bingo/public/console.png" },
    { label: "About", icon: "pi pi-info" },
    { label: "Services", icon: "pi pi-cog" },
    { label: "Contact", icon: "pi pi-envelope" },
  ];

  const start = <Image src="/joystick.png" alt="joystick" width={50} height={50} />;
  const end = <button className="p-button">Login</button>;

  return (
    <div className="flex flex-col h-screen bg-black text-white">
        <title>
            Bingo - Home
        </title>
      {/* Navbar */}
      <Menubar model={items} start={start} end={end} className="bg-black text-white border-b border-red-600"/>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-r from-black to-red-950">
        <h1 className="text-4xl font-bold text-white">
          Find your next game using Bingo! We will analyze baased on 
          your input on your past experience, 
          Start here:</h1>
        <button className="px-6 py-3 ">Login</button>
      </div>
      <div>


      </div>
    </div>
  );
}