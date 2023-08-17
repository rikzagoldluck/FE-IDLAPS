import React from "react";
import {
  calculateTimeGap,
  timeDifference,
  unixToHHMM,
} from "@/services/converter";
import { motion, AnimatePresence } from "framer-motion";
import { Rider } from "@/services/riders/data-type";
export default function Table({ riders }: { riders: Rider[] }) {
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
    <AnimatePresence>
      <table className="table table-zebra w-full text-center">
        <thead>
          <motion.tr
            initial={{ opacity: 1, x: 0 }}
            // animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
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
          </motion.tr>
        </thead>
        <tbody className="font-bold">
          {riders.map((pembalap: Rider, index: number) => (
            <motion.tr
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              key={index}
            >
              <motion.td>{index + 1}</motion.td>
              <motion.td>{pembalap.name}</motion.td>
              <motion.td>{pembalap.team_name}</motion.td>
              <motion.td>{pembalap.bib}</motion.td>
              <motion.td>
                {pembalap.categories.independent_start
                  ? unixToHHMM(pembalap.start_waktu)
                  : unixToHHMM(start_time)}
                :00
              </motion.td>
              {/* {pembalap.total_waktu === "0" && <motion.td>00:00:00.000</motion.td>}
              {pembalap.total_waktu !== "0" && (
                <motion.td>
                  {timeDifference(start_time, Number(pembalap.total_waktu)) ===
                  "NaN:NaN:NaN"
                    ? "00:00:00"
                    : timeDifference(start_time, Number(pembalap.total_waktu))}
                </motion.td>
              )} */}

              {pembalap.total_waktu === "0" && index == 0 && (
                <motion.td>-</motion.td>
              )}
              {pembalap.total_waktu === "0" && index != 0 && (
                <motion.td>+00:00:00.000</motion.td>
              )}

              {pembalap.total_waktu !== "0" &&
                !pembalap.categories.independent_start && (
                  <motion.td>
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
                  </motion.td>
                )}

              {pembalap.total_waktu !== "0" &&
                pembalap.categories.independent_start && (
                  <motion.td>
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
                  </motion.td>
                )}

              {/* LAP TIME */}
              {!pembalap.categories.independent_start &&
                pembalap.race_results.map((lap, lapIndex) => {
                  return (
                    <motion.td key={lapIndex}>
                      {timeDifference(start_time, Number(lap.finish_time)) ===
                      "NaN:NaN:NaN"
                        ? "00:00:00.000"
                        : timeDifference(start_time, Number(lap.finish_time))}
                    </motion.td>
                  );
                })}

              {pembalap.categories.independent_start &&
                pembalap.race_results.map((lap, lapIndex) => {
                  return (
                    <motion.td key={lapIndex}>
                      {timeDifference(
                        Number(pembalap.start_waktu),
                        Number(lap.finish_time)
                      ) === "NaN:NaN:NaN"
                        ? "00:00:00.000"
                        : timeDifference(
                            Number(pembalap.start_waktu),
                            Number(lap.finish_time)
                          )}
                    </motion.td>
                  );
                })}

              {Array.from({
                length: lap - pembalap.race_results.length,
              }).map((_, index) => (
                <motion.td key={index}>00:00:00.000</motion.td>
              ))}
              <motion.td
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
              </motion.td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </AnimatePresence>
  );
}
