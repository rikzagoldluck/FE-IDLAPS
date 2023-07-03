"use client";
import React, { useContext, useEffect, useState } from "react";
import SelectEvent from "@/components/SelectEvent";
import { toast } from "react-hot-toast";
import TableBody from "./tableBody";
import { SelectBoxContext } from "../provider/SelectBox";

export default function index() {
  const selectBox = useContext(SelectBoxContext)
  const [eventSelected, setEventSeleceted] = useState(selectBox.selectedEvent != "" ? selectBox.selectedEvent : "");
  const [buttonState, setButtonState] = useState("");

  const handleSelect = (id: string) => {
    selectBox.setSelectedEvent(id);
    setEventSeleceted(id);  
  };

  const handleClick = (button: string) => {
    setButtonState(button + "-" + Date.now());
  };

  return (
    <div className="py-10 px-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 text-center justify-between mb-6">
        <SelectEvent onSelect={handleSelect} valSelected={eventSelected} />
        <div className="flex gap-5 mx-auto" id="clock">
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

        <div
          className="flex gap-3 md:justify-end mx-auto md:mx-0"
          id="button-container"
        >
          <button
            className="btn btn-outline btn-success"
            onClick={() => handleClick("start")}
          >
            START
          </button>
          <button
            className="btn btn-outline btn-error"
            onClick={() => handleClick("stop")}
          >
            STOP
          </button>
          <button
            className="btn btn-outline btn-warning"
            onClick={() => handleClick("clear")}
          >
            CLEAR
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full font-bold text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Category</th>
              <th>Start Schedule</th>
              <th>End Schedule</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Sex</th>
              <th>Distance(KM)</th>
              <th>Lap(s)</th>
              <th>Run</th>
              <th>#</th>
            </tr>
          </thead>
          <TableBody eventSelected={eventSelected} buttonState={buttonState} />
        </table>
      </div>
    </div>
  );
}
