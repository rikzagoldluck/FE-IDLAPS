// "use client";
import Navbar from "@/components/Navbar";
import AddCategory from "./addCategories";
import TableBody from "./tableBody";

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

      <div className="py-10 px-10">
        <div className="py-2">
          <AddCategory />
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full font-bold">
            <thead>
              <tr>
                <th>#</th>
                <th>Name - Event</th>
                <th>Desc</th>
                <th>Start Schedule</th>
                <th>End Schedule</th>
                <th>Sex</th>
                <th>Distance</th>
                <th>Lap(s)</th>
                <th>Race Today</th>
                <th>Action</th>
              </tr>
            </thead>
            <TableBody />
          </table>
        </div>
      </div>
    </>
  );
}
