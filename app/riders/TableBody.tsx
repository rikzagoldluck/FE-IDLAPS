"use client";

import { getRidersByCategory } from "@/services/riders";
import { Rider } from "@/services/riders/data-type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DeleteRider from "./deleteRiders";

export default function TableBody({
  categorySelected,
  added,
  onDeleted,
}: {
  onDeleted: Function;
  categorySelected: string;
  added: string;
}) {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [changed, setChanged] = useState(false);
  const [selected, setSelected] = useState(categorySelected);

  useEffect(() => {
    setSelected(categorySelected);
    if (categorySelected == "" || categorySelected == "choose-category") return;
    getRidersByCategory(categorySelected)
      .then((res) => {
        if (res.status === "Server Error") {
          toast.error(res.message);
          return;
        }
        setRiders(res.data);
      })
      .catch((err) =>
        toast.error("Failed to fetch riders by category :   " + err)
      );
  }, []);

  useEffect(() => {
    onDeleted();
  }, [changed]);

  useEffect(() => {
    setSelected(categorySelected);
  }, [categorySelected]);

  useEffect(() => {
    if (selected === "choose-category" || selected === "") {
      toast("Please select event and category first", {
        duration: 2000,
        icon: "ℹ️",
      });
      return;
    }
    getRidersByCategory(selected)
      .then((res) => {
        if (res.status === "Server Error") {
          toast.error(res.message);
          return;
        }
        setRiders(res.data);
        console.log(res.data);
      })
      .catch((err) =>
        toast.error("Failed to fetch riders by category :   " + err)
      );
  }, [selected, changed, added]);

  return (
    <tbody>
      {riders.length > 0 && categorySelected != "choose-category" ? (
        riders.map((rider: Rider, index: number) => (
          <tr key={rider.id}>
            <td>{index + 1}</td>
            <td>{rider.name}</td>
            <td>{rider.age}</td>
            <td>{rider.nationality == "" ? "-" : rider.nationality}</td>
            <td>
              {rider.team_name == "" || rider.team_name == "null"
                ? "Not Set"
                : rider.team_name}
            </td>
            <td>{rider.bib}</td>
            <td>
              {" "}
              <input
                type="checkbox"
                className="toggle toggle-success"
                checked={rider.run}
                readOnly
              />
            </td>
            <td>{rider.note_1 == "" ? "-" : rider.note_1}</td>
            <td className="flex gap-3">
              {/* <UpdateRider {...rider} /> */}
              <Link href={`/riders/${rider.id}`}>
                <button className="btn btn-secondary btn-sm">Edit</button>
              </Link>
              <DeleteRider
                rider={rider}
                onDeleted={() => setChanged(!changed)}
              />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td className="text-center" colSpan={5}>
            No any rider found, please add rider instead
          </td>
        </tr>
      )}
    </tbody>
  );
}
