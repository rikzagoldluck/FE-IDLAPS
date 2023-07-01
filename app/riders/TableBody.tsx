"use client";

import { getRidersByCategory } from "@/services/riders";
import { Rider } from "@/services/riders/data-type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DeleteRider from "./deleteRiders";

export default function TableBody({
  changed,
  categorySelected,
  onDeleted,
}: {
  changed: boolean;
  categorySelected: string;
  onDeleted: Function;
}) {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [tableChanged, setTableChanged] = useState(changed);

  useEffect(() => {
    onDeleted();
  }, [tableChanged]);

  useEffect(() => {
    if (categorySelected === "choose-category" || categorySelected === "") {
      toast("Please select event and category first", {
        duration: 3000,
        icon: "ℹ️",
      });
      return;
    }
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
  }, [categorySelected, changed, tableChanged]);
  return (
    <tbody>
      {riders.length > 0 && categorySelected != "choose-category" ? (
        riders.map((rider: Rider, index: number) => (
          <tr key={rider.id}>
            <td>{index + 1}</td>
            <td>{rider.name}</td>
            <td>{rider.age}</td>
            <td>{rider.nationality}</td>
            <td>{rider.teams.name}</td>
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
            <td>{rider.note_1}</td>
            <td className="flex gap-3">
              {/* <UpdateRider {...rider} /> */}
              <Link href={`/riders/${rider.id}`}>
                <button className="btn btn-secondary btn-sm">Edit</button>
              </Link>
              <DeleteRider
                rider={rider}
                onDeleted={() => setTableChanged(!tableChanged)}
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
