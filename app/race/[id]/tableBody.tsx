"use client";

import SelectRiderNote from "@/components/SelectRiderNote";
import {
  calculateTimeGap,
  convertDateTimeMillis,
  timeDifference,
} from "@/services/converter";
import {
  getRidersRunInCategory,
  updateRidersAndClear,
  updateRidersNoteInParcel,
} from "@/services/riders";
import { Rider } from "@/services/riders/data-type";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function TableBody({
  id,
  onCategoryNameChange,
  note,
  buttonState,
  tableRef,
}: {
  id: number;
  onCategoryNameChange: (name: string) => void;
  note: string;
  buttonState: string;
  tableRef: any;
}) {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [ridersRes, setRidersRes] = useState<Rider[]>([]);
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
    riders.sort((a, b) => {
      // First, sort by run_status (RUN > DSQ > DNF > DNS)
      const runStatusOrder = ["FINISHER", "RUN", "DNF", "DNS", "DSQ", "STOP"];
      const runStatusComparison =
        runStatusOrder.indexOf(a.run) - runStatusOrder.indexOf(b.run);

      if (runStatusComparison !== 0) {
        return runStatusComparison;
      }

      // Then, sort by lap_count in ascending order
      if (a.lap_count !== b.lap_count) {
        return b.lap_count - a.lap_count;
      }

      const aTotalTime = parseInt(a.total_waktu, 10);
      const bTotalTime = parseInt(b.total_waktu, 10);

      return aTotalTime - bTotalTime;
    });

    setRidersRes(riders);
  }, [riders]);

  useEffect(() => {
    if (note === "") return;
    const checkedRiders = Object.keys(checkboxes)
      .filter((key) => checkboxes[key])
      .map((key) => parseInt(key));

    if (checkedRiders.length === 0) {
      toast("Please select rider first", {
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

  useEffect(() => {
    if (buttonState === "") return;
    const checkedRiders = Object.keys(checkboxes)
      .filter((key) => checkboxes[key])
      .map((key) => parseInt(key));

    if (checkedRiders.length === 0) {
      toast("Please check rider first", {
        duration: 3000,
        icon: "ℹ️",
      });
      return;
    }
    const data = {
      riders: checkedRiders,
    };

    updateRidersAndClear(data)
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
  }, [buttonState]);

  return (
    <table className="table table-zebra w-full text-center" ref={tableRef}>
      <thead>
        <tr>
          <th>POS</th>
          <th>Rider</th>
          <th>Team</th>
          <th>BIB</th>
          <th>START</th>
          {/* {ridersRes[0].categories.independent_start && <th>ACC TIME</th>} */}
          <th>GAP</th>
          {Array.from({ length: lap }).map((_, index) => (
            <th key={index}>Lap {index + 1}</th>
          ))}
          <th style={{ display: "none" }}>STATUS</th>
          <th>RUN</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody className="font-bold">
        {ridersRes.map((pembalap: Rider, index: number) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{pembalap.name}</td>
            <td>{pembalap.team_name}</td>
            <td>{pembalap.bib}</td>
            {/* START TIME */}
            {pembalap.categories.independent_start && (
              <td>
                {pembalap.start_waktu == "0"
                  ? "NOT RUN"
                  : convertDateTimeMillis(pembalap.start_waktu)}
              </td>
            )}
            {!pembalap.categories.independent_start && (
              <td>
                {start_time == "0"
                  ? "NOT RUN"
                  : convertDateTimeMillis(start_time)}
              </td>
            )}

            {/* TOTAL TIME */}
            {/* {pembalap.total_waktu === "0" && <td>00:00:00.000</td>}
            {pembalap.total_waktu !== "0" &&
              !pembalap.categories.independent_start && (
                <td>
                  {timeDifference(start_time, Number(pembalap.total_waktu)) ===
                  "NaN:NaN:NaN"
                    ? "00:00:00"
                    : timeDifference(start_time, Number(pembalap.total_waktu))}
                </td>
              )}

            {pembalap.total_waktu !== "0" &&
              pembalap.categories.independent_start && (
                <td>
                  {timeDifference(
                    Number(pembalap.start_waktu),
                    Number(pembalap.total_waktu)
                  ) === "NaN:NaN:NaN"
                    ? "00:00:00"
                    : timeDifference(
                        Number(pembalap.start_waktu),
                        Number(pembalap.total_waktu)
                      )}
                </td>
              )} */}

            {/* GAP */}
            {pembalap.total_waktu === "0" && index == 0 && <td>-</td>}
            {pembalap.total_waktu === "0" && index != 0 && (
              <td>+00:00:00.000</td>
            )}

            {pembalap.total_waktu !== "0" &&
              !pembalap.categories.independent_start && (
                <td>
                  {timeDifference(start_time, Number(pembalap.total_waktu)) ===
                  "NaN:NaN:NaN"
                    ? "00:00:00.000"
                    : index != 0 &&
                      ridersRes[index - 1].lap_count === pembalap.lap_count
                    ? "+" +
                      timeDifference(
                        Number(ridersRes[index - 1].total_waktu),
                        Number(pembalap.total_waktu)
                      )
                    : "-"}
                </td>
              )}

            {pembalap.total_waktu !== "0" &&
              pembalap.categories.independent_start && (
                <td>
                  {timeDifference(
                    Number(pembalap.start_waktu),
                    Number(pembalap.total_waktu)
                  ) === "NaN:NaN:NaN"
                    ? "00:00:00.000"
                    : index != 0 &&
                      ridersRes[index - 1].lap_count === pembalap.lap_count
                    ? "+" +
                      calculateTimeGap(
                        timeDifference(
                          Number(ridersRes[index - 1].start_waktu),
                          Number(ridersRes[index - 1].total_waktu)
                        ),
                        timeDifference(
                          Number(pembalap.start_waktu),
                          Number(pembalap.total_waktu)
                        )
                      )
                    : "-"}
                </td>
              )}

            {/* LAP TIME */}
            {!pembalap.categories.independent_start &&
              pembalap.race_results.map((lap, lapIndex) => {
                return (
                  <td key={lapIndex}>
                    {timeDifference(start_time, Number(lap.finish_time)) ===
                    "NaN:NaN:NaN"
                      ? "00:00:00.000"
                      : timeDifference(start_time, Number(lap.finish_time))}
                  </td>
                );
              })}

            {pembalap.categories.independent_start &&
              pembalap.race_results.map((lap, lapIndex) => {
                return (
                  <td key={lapIndex}>
                    {timeDifference(
                      Number(pembalap.start_waktu),
                      Number(lap.finish_time)
                    ) === "NaN:NaN:NaN"
                      ? "00:00:00.000"
                      : timeDifference(
                          Number(pembalap.start_waktu),
                          Number(lap.finish_time)
                        )}
                  </td>
                );
              })}

            {Array.from({
              length: lap - pembalap.race_results.length,
            }).map((_, index) => (
              <td key={index}>00:00:00.000</td>
            ))}
            <td style={{ display: "none" }}> {pembalap.run}</td>

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
