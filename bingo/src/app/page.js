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
    <div className="flex flex-col h-screen">
        <title>
            Bingo - Home
        </title>
      {/* Navbar */}
      <Menubar model={items} start={start} end={end} />

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <h1 className="text-4xl font-bold text-white">Hello, World!</h1>
      </div>
    </div>
  );
}

