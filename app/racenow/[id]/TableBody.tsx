"use client";

import {
  calculateTimeGap,
  timeDifference,
  unixToHHMM,
} from "@/services/converter";
import { getRidersRunInCategory } from "@/services/riders";
import { Rider } from "@/services/riders/data-type";
import useSWR from "swr";

export default function TableBody({ id }: { id: number }) {
  //   const router = useRouter();
  const { data, error, isLoading } = useSWR("getRidersRunInCategory", () =>
    getRidersRunInCategory(id)
  );

  if (isLoading) {
    return <></>;
  }
  if (error) {
    return <></>;
  }
  if (!data) return <></>;

  if (data.data.length === 0) {
    return (
      <table className="table table-zebra w-full font-bold text-center">
        <thead>
          <tr>
            <th>POS</th>
            <th>Rider</th>
            <th>Team</th>
            <th>BIB</th>
            <th>START</th>
            <th>TOTAL TIME</th>
            <th>GAP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={6}>No Data</td>
          </tr>
        </tbody>
      </table>
    );
  }
  const riders: Rider[] = data.data;
  const lap = riders[0].categories.lap;
  const start_time = riders[0].categories.start_time;
  const categoryName = riders[0].categories.name;

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

  return (
    <>
      <h1 className="text-3xl text-center font-bold mb-3">{categoryName}</h1>
      <table className="table table-zebra w-full text-center">
        <thead>
          <tr>
            <th>POS</th>
            <th>Rider</th>
            <th>Team</th>
            <th>BIB</th>
            <th>START</th>
            {/* <th>TOTAL TIME</th> */}
            <th>GAP</th>
            {Array.from({ length: lap }).map((_, index) => (
              <th key={index}>Lap {index + 1}</th>
            ))}
            <th>Note</th>
          </tr>
        </thead>
        <tbody className="font-bold">
          {riders.map((pembalap: Rider, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{pembalap.name}</td>
              <td>{pembalap.team_name}</td>
              <td>{pembalap.bib}</td>
              <td>
                {pembalap.categories.independent_start
                  ? unixToHHMM(pembalap.start_waktu)
                  : unixToHHMM(start_time)}
                :00
              </td>
              {/* {pembalap.total_waktu === "0" && <td>00:00:00.000</td>}
              {pembalap.total_waktu !== "0" && (
                <td>
                  {timeDifference(start_time, Number(pembalap.total_waktu)) ===
                  "NaN:NaN:NaN"
                    ? "00:00:00"
                    : timeDifference(start_time, Number(pembalap.total_waktu))}
                </td>
              )} */}

              {pembalap.total_waktu === "0" && index == 0 && <td>-</td>}
              {pembalap.total_waktu === "0" && index != 0 && (
                <td>+00:00:00.000</td>
              )}

              {pembalap.total_waktu !== "0" &&
                !pembalap.categories.independent_start && (
                  <td>
                    {timeDifference(
                      start_time,
                      Number(pembalap.total_waktu)
                    ) === "NaN:NaN:NaN"
                      ? "00:00:00.000"
                      : index != 0 &&
                        riders[index - 1].lap_count === pembalap.lap_count
                      ? "+" +
                        timeDifference(
                          Number(riders[index - 1].total_waktu),
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
                        riders[index - 1].lap_count === pembalap.lap_count
                      ? "+" +
                        calculateTimeGap(
                          timeDifference(
                            Number(riders[index - 1].start_waktu),
                            Number(riders[index - 1].total_waktu)
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
              <td
                className={
                  pembalap.run === "STOP"
                    ? "text-red-500"
                    : pembalap.run === "RUN"
                    ? "text-green-500"
                    : pembalap.run === "DNS"
                    ? "text-yellow-500"
                    : pembalap.run === "DNF"
                    ? "text-blue-500"
                    : pembalap.run === "DSQ"
                    ? "text-purple-500"
                    : "text-gray-500"
                }
              >
                {pembalap.run}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
