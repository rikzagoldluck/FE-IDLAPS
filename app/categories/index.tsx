"use client";
import React, { useContext, useEffect, useState } from "react";
import TableBody from "./tableBody";
import SelectEvent from "@/components/SelectEvent";
import AddCategory from "./addCategories";
import { SelectBoxContext } from "../provider/SelectBox";

export default function index() {
  const selectBox = useContext(SelectBoxContext);
  const [eventSelected, setEventSeleceted] = useState(
    selectBox.selectedEvent != "" ? selectBox.selectedEvent : ""
  );

  const [added, setAdded] = useState("");
  const handleSelect = (id: string) => {
    selectBox.setSelectedEvent(id);
    setEventSeleceted(id);
  };

  return (
    <div className="py-10 px-10">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <SelectEvent onSelect={handleSelect} valSelected={eventSelected} />
        <AddCategory
          state={
            eventSelected === "choose-event" || eventSelected === ""
              ? true
              : false
          }
          eventSelected={eventSelected}
          onAdded={() => {
            setAdded("add-" + Date.now());
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
              <th>Participants</th>
              <th>Action</th>
            </tr>
          </thead>
          <TableBody eventSelected={eventSelected} added={added} />
        </table>
      </div>
    </div>
  );
}
