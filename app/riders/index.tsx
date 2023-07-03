"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import AddRider from "./addRiders";
import TableBody from "./TableBody";
import SelectEvent from "@/components/SelectEvent";
import SelectCategory from "@/components/SelectCategory";
import { toast } from "react-hot-toast";
import { getAvailBeaconsInEvents } from "@/services/beacons";
import { BeaconResponse } from "@/services/beacons/data-type";
import { SelectBoxContext } from "../provider/SelectBox";

export default function index() {
  const selectBox = useContext(SelectBoxContext)
  const [eventSelected, setEventSeleceted] = useState(selectBox.selectedEvent != "" ? selectBox.selectedEvent : "");
  const [categorySelected, setCategorySeleceted] = useState(selectBox.selectedCategory != "" ? selectBox.selectedCategory : "");
  const [added, setAdded] = useState(false);
  const [beacons, setBeacons] = useState<BeaconResponse>({
    message: "",
    data: [],
  });
  

  const [changed, setChanged] = useState(false);

  const handleSelect = (id: string) => {
    setEventSeleceted(id);
    selectBox.setSelectedEvent(id);
  };
  const handleSelectCategory = (id: string) => {
    setCategorySeleceted(id);
    selectBox.setSelectedCategory(id);
  };

  useEffect(() => {setEventSeleceted(selectBox.selectedEvent.toString())
    setCategorySeleceted(selectBox.selectedCategory.toString())}, [])
 

  useEffect(() => {
    
    if (categorySelected === "" || categorySelected === "choose-category") return;
    getAvailBeaconsInEvents(categorySelected)
      .then((res) => {
        setBeacons(res);
      })
      .catch((res) => {
        if (res.message === "Failed to fetch : 404 Not Found") {
          toast.error(
            "There is no rider at this event, Please add category first or add rider",
            { duration: 3000 }
          );
          return;
        }
        toast.error(res.message, { duration: 3000 });
      });
  }, [categorySelected, changed]);

  return (
    <div className="py-10 px-10">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-4 place-content-between">
        <SelectEvent onSelect={handleSelect} valSelected={eventSelected} />
        <SelectCategory
          onSelect={handleSelectCategory}
          eventSelected={eventSelected}

          valSelected={categorySelected}
        />

        <AddRider
          categorySelected={categorySelected}
          eventSelected={eventSelected}
          onAdded={() => {
            setChanged(!changed);
          }}
          beacons={beacons}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full font-bold">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Nation</th>
              <th>Team</th>
              <th>BIB</th>
              <th>Running</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>
          <TableBody
            categorySelected={categorySelected}
            changed={changed}
            onDeleted={() => {
              setChanged(!changed);
            }}
          />
        </table>
      </div>
    </div>
  );
}
