import Navbar from "@/components/Navbar";
import Link from "next/link";
import AddRider from "./addRiders";
import DeleteRider from "./deleteRiders";
import { getRiders } from "@/services/riders";
import { Rider, RiderResponse } from "@/services/riders/data-type";
import { Toaster } from "react-hot-toast";
import Index from "./index";
export const metadata = {
  title: "Rider List",
};

export default async function RiderList() {
  return (
    <>
      <div>
        <Toaster />
      </div>

      <Navbar title={"rider"} />
      <Index />
    </>
  );
}
