"use client";
import React, { useState } from "react";
import TableBody from "./tableBody";
import SelectEvent from "@/components/SelectEvent";
import AddCategory from "./addCategories";

export default function index() {
  const [eventSelected, setEventSeleceted] = useState("");
  const [added, setAdded] = useState(false);
  const handleSelect = (id: string) => {
    setEventSeleceted(id);
  };
  return (
    <div className="py-10 px-10">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <SelectEvent onSelect={handleSelect} />
        <AddCategory
          state={
            eventSelected === "choose-event" || eventSelected === ""
              ? true
              : false
          }
          eventSelected={eventSelected}
          onAdded={() => {
            setAdded(!added);
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full font-bold">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Desc</th>
              <th>Start Schedule</th>
              <th>End Schedule</th>
              <th>Sex</th>
              <th>Distance</th>
              <th>Lap(s)</th>
              <th>Action</th>
            </tr>
          </thead>
          <TableBody eventSelected={eventSelected} added={added} />
        </table>
      </div>
    </div>
  );
}
