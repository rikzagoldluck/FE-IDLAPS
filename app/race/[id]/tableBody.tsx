"use client";

import SelectRiderNote from "@/components/SelectRiderNote";
import { convertDateTimeMillis, timeDifference } from "@/services/converter";
import {
  getRidersRunInCategory,
  updateRidersNoteInParcel,
} from "@/services/riders";
import { Rider } from "@/services/riders/data-type";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function TableBody({
  id,
  onCategoryNameChange,
  note,
}: {
  id: number;
  onCategoryNameChange: (name: string) => void;
  note: string;
}) {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [lap, setLap] = useState<number>(1);
  const [start_time, setStart_time] = useState<any>("0");
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({});

  const handleCheckboxChange = (checkboxName: string) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxName]: !prevCheckboxes[checkboxName],
    }));
  };

  useEffect(() => {
    getRidersRunInCategory(id)
      .then((res) => {
        if (res.status === "Server Error") {
          toast.error(res.message);
          return;
        }

        if (res.data.length === 0) {
          toast.error("No riders found");
          return;
        }
        setRiders(res.data);
        setStart_time(res.data[0].categories.start_time);
        setLap(res.data[0].categories.lap);
        onCategoryNameChange(res.data[0].categories.name);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [id]);

  useEffect(() => {
    if (riders.length === 0) return;
    if (riders[0].race_results.length > 1) {
      riders.sort((a, b) => {
        // Urutan berdasarkan jumlah lap terbanyak (descending)
        if (a.race_results.length !== b.race_results.length) {
          return b.race_results.length - a.race_results.length;
        }

        // Jika jumlah lap sama, urutan berdasarkan waktu tercepat (ascending)
        if (
          a.race_results[a.race_results.length - 1].finish_time !==
          b.race_results[b.race_results.length - 1].finish_time
        ) {
          return (
            Number(a.race_results[a.race_results.length - 1].finish_time) -
            Number(b.race_results[b.race_results.length - 1].finish_time)
          );
        }
      });

      riders.sort((a, b) => {
        const keteranganOrder = {
          FINISHER: 1,
          RUN: 2,
          DNF: 3,
          DSQ: 4,
          DNS: 5,
        };
        return keteranganOrder[a.note] - keteranganOrder[b.note];
      });

      setRiders(riders);
    }
  }, [riders]);

  useEffect(() => {
    if (note === "") return;
    const checkedRiders = Object.keys(checkboxes)
      .filter((key) => checkboxes[key])
      .map((key) => parseInt(key));

    if (checkedRiders.length === 0) {
      toast("Please select category first", {
        duration: 3000,
        icon: "ℹ️",
      });
      return;
    }

    const data = {
      riders_id: checkedRiders,
    };

    updateRidersNoteInParcel(note, data)
      .then((res) => {
        if (res.status === "Server Error") {
          toast.error(res.message);
          return;
        }

        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        getRidersRunInCategory(id)
          .then((res) => {
            if (res.status === "Server Error") {
              toast.error(res.message);
              return;
            }
            setRiders(res.data);
            setStart_time(res.data[0].categories.start_time);
            setLap(res.data[0].categories.lap);
            onCategoryNameChange(res.data[0].categories.name);
          })
          .catch((err) => {
            toast.error(err.message);
          });
        setCheckboxes({});
      });
  }, [note]);

  return (
    <table className="table table-zebra w-full text-center">
      <thead>
        <tr>
          <th>POS</th>
          <th>Rider</th>
          <th>Team</th>
          <th>BIB</th>
          <th>START</th>
          <th>TOTAL TIME</th>
          <th>GAP</th>
          {Array.from({ length: lap }).map((_, index) => (
            <th key={index}>Lap {index + 1}</th>
          ))}
          <th>RUN</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody className="font-bold">
        {riders.map((pembalap: Rider, index: number) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{pembalap.name}</td>
            <td>{pembalap.team_name}</td>
            <td>{pembalap.bib}</td>
            <td>{convertDateTimeMillis(start_time)}</td>
            {pembalap.total_waktu === "0" && <td>00:00:00.000</td>}
            {pembalap.total_waktu !== "0" && (
              <td>
                {timeDifference(start_time, Number(pembalap.total_waktu)) ===
                "NaN:NaN:NaN"
                  ? "00:00:00"
                  : timeDifference(start_time, Number(pembalap.total_waktu))}
              </td>
            )}

            {pembalap.total_waktu === "0" && index == 0 && <td>-</td>}
            {pembalap.total_waktu === "0" && index != 0 && (
              <td>+00:00:00.000</td>
            )}
            {pembalap.total_waktu !== "0" && (
              <td>
                {timeDifference(start_time, Number(pembalap.total_waktu)) ===
                "NaN:NaN:NaN"
                  ? "00:00:00.000"
                  : index != 0
                  ? "+" +
                    timeDifference(
                      Number(riders[index - 1].total_waktu),
                      Number(pembalap.total_waktu)
                    )
                  : "-"}
              </td>
            )}

            {pembalap.race_results.map((lap, lapIndex) => {
              return (
                <td key={lapIndex}>
                  {timeDifference(start_time, Number(lap.finish_time)) ===
                  "NaN:NaN:NaN"
                    ? "00:00:00.000"
                    : timeDifference(start_time, Number(lap.finish_time))}
                </td>
              );
            })}

            {Array.from({
              length: lap - pembalap.race_results.length,
            }).map((_, index) => (
              <td key={index}>00:00:00.000</td>
            ))}
            <td>
              <SelectRiderNote idRider={pembalap.id} note={pembalap.run} />
            </td>
            <td>
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={checkboxes[pembalap.id] || false}
                onChange={() => handleCheckboxChange(pembalap.id.toString())}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
