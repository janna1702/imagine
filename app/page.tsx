"use client";
import Image from "next/image";
import Form from "./form/Form";
import { Header } from "./head/Header";

export default function Home() {
  return (
    <div className="w-full h-screen flex  flex-col gap-5 items-center justify-center bg-neutral-100">
      <Header />
      <div className="h-5/6 w-11/12 flex flex-row  bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 shadow-2xl">
        <Form />
      </div>
    </div>
  );
}
