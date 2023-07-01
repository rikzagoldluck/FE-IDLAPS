"use client";

import { updateRiderNote } from "@/services/riders";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { toast } from "react-hot-toast";

export default function SelectRiderNote({
  idRider,
  note,
}: {
  idRider: number;
  note: string;
}) {
  // const [riderNote, setRiderNote] = useState([
  //   { id: 2, note: "FINISHER" },
  //   { id: 3, note: "DNF" },
  //   { id: 4, note: "DNS" },
  //   { id: 5, note: "DSQ" },
  // { id: 6, note: "OTL" },
  // { id: 7, note: "LAP" },
  // ]);

  const [noteInternal, setNote] = useState(note);
  function handleSelect(e: SyntheticEvent) {
    const { value } = e.currentTarget;
    prompt("Type Password") === "admin" &&
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
      className="select w-32"
      onChange={handleSelect}
      value={noteInternal}
    >
      <option value={"RUN"}>RUN</option>
      <option value={"FINISHER"}>FINISHER</option>
      <option value={"DNF"}>DNF</option>
      <option value={"DNS"}>DNS</option>
      <option value={"DSQ"}>DSQ</option>
    </select>
  );
}
