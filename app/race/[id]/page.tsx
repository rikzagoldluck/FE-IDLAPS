import Navbar from "@/components/Navbar";
import React from "react";
import { Toaster } from "react-hot-toast";
import Index from "./index";

export default function page({ params }: { params: { id: number } }) {
  const { id } = params;
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Navbar title={"race"} />
      <Index id={id} />
    </>
  );
}
