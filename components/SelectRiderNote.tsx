"use client";

import { updateRiderNote } from "@/services/riders";
import { RunType, RunTypeConst } from "@/services/riders/data-type";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function SelectRiderNote({
  idRider,
  note,
}: {
  idRider: number;
  note: string;
}) {
  const [noteInternal, setNote] = useState(note ? note : "RUN");

  useEffect(() => {
    setNote(note);
  }, [note]);
  function handleSelect(e: SyntheticEvent) {
    const { value } = e.currentTarget;
    updateRiderNote(idRider, value)
      .then((res) => {
        if (res.status === "Server Error") {
          toast.error(res.message);

          return;
        }
        toast.success("Rider note updated");
        setNote(value);
      })
      .catch((err) => toast.error("Failed to update rider note : " + err));
  }
  return (
    <select
      className={
        "select w-32 text-white " +
        (noteInternal === "STOP"
          ? "bg-red-500"
          : noteInternal === "RUN"
          ? "bg-green-500"
          : noteInternal === "DNS"
          ? "bg-yellow-500"
          : noteInternal === "DNF"
          ? "bg-blue-500"
          : noteInternal === "DSQ"
          ? "bg-purple-500"
          : "bg-gray-500")
      }
      onChange={handleSelect}
      value={noteInternal}
    >
      {Object.keys(RunTypeConst).map((key) => {
        const value = RunTypeConst[key as keyof typeof RunTypeConst];
        return (
          <option key={value} value={value}>
            {RunType[value]}
          </option>
        );
      })}
    </select>
  );
}
