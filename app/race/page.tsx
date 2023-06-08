// "use client";
import Navbar from "@/components/Navbar";
import TableBody from "./tableBody";
import { Toaster } from "react-hot-toast";

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

      <div className="py-10 px-10">
        <div className="flex gap-5 text-center">
          <div>
            <span className="countdown font-mono text-4xl">
              <span style={{ "--value": 15 }}></span>
            </span>
            days
          </div>
          <div>
            <span className="countdown font-mono text-4xl">
              <span style={{ "--value": 10 }}></span>
            </span>
            hours
          </div>
          <div>
            <span className="countdown font-mono text-4xl">
              <span style={{ "--value": 24 }}></span>
            </span>
            min
          </div>
          <div>
            <span className="countdown font-mono text-4xl">
              <span style={{ "--value": 21 }}></span>
            </span>
            sec
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full font-bold">
            <thead>
              <tr>
                <th>#</th>
                <th>Category - Event</th>
                <th>Start Schedule</th>
                <th>End Schedule</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Sex</th>
                <th>Distance</th>
                <th>Lap(s)</th>
                <th>Run</th>
              </tr>
            </thead>
            <TableBody />
          </table>
        </div>
      </div>
    </>
  );
}
