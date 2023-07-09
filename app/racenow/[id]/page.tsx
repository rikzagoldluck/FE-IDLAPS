import NavbarHome from "@/components/NavbarHome";
import React from "react";
import { Toaster } from "react-hot-toast";
import TableBody from "./TableBody";

export default function page({ params }: { params: { id: number } }) {
  const { id } = params;
  return (
    <>
      <NavbarHome />
      <div>
        <Toaster />
      </div>
      <div className="py-10 px-10">
        <div className="overflow-x-auto">
          <TableBody id={id} />
        </div>
      </div>
    </>
  );
}
