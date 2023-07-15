import Navbar from "@/components/Navbar";
import React from "react";
import { Toaster } from "react-hot-toast";
import TableBody from "./TableBody";

export default function page({ params }: { params: { id: number } }) {
  const { id } = params;
  return (
    <>
      <Navbar title={"Category Championship"} />
      <div>
        <Toaster />
      </div>
      <div className="py-10 px-10">
        {/* <h1 className="text-center text-4xl mb-5">{categoryName}</h1> */}
        <div className="overflow-x-auto">
          <TableBody id={id} />
        </div>
      </div>
    </>
  );
}
