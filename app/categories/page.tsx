// "use client";
import Navbar from "@/components/Navbar";
import Index from "./index";

import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Category List",
};

export default async function CategoryList() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Navbar title={"category"} />
      <Index />
    </>
  );
}
