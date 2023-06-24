import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Index from "./index";
export const metadata = {
  title: "Race Today List",
};

export default async function RaceTodayList() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Navbar title={"race"} />
      <Index />
    </>
  );
}
