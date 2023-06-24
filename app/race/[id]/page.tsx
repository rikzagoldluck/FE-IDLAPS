"use client";

import Navbar from "@/components/Navbar";
import { convertDateTimeMillis, timeDifference } from "@/services/converter";
import { getRidersRunInCategory } from "@/services/riders";
import { Rider } from "@/services/riders/data-type";
import useSWR from "swr";

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;
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
  const riders: Rider[] = data;

  if (riders.length === 0) {
    return (
      <>
        <Navbar title={"Category Championship"} />
        <div className="py-10 px-10">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full font-bold text-center">
              <thead>
                <tr>
                  <th>POS</th>
                  <th>Rider</th>
                  <th>Team</th>
                  <th>BIB</th>
                  <th>TIME</th>
                  <th>GAP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6}>No Data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  const lap = riders[0].categories.lap;
  const start_time = riders[0].categories.start_time;

  return (
    <>
      <Navbar title={"Category Championship"} />
      <div className="py-10 px-10">
        <div className="overflow-x-auto">
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
                {Array.from({ length: lap }).map((_, index) => (
                  <th key={index}>Lap {index + 1}</th>
                ))}
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((pembalap: Rider, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{pembalap.name}</td>
                  <td>{pembalap.teams.name}</td>
                  <td>{pembalap.bib}</td>
                  <td>{convertDateTimeMillis(start_time)}</td>
                  <td>
                    {timeDifference(
                      start_time,
                      Number(pembalap.total_waktu)
                    ) === "NaN:NaN:NaN"
                      ? "00:00:00"
                      : timeDifference(
                          start_time,
                          Number(pembalap.total_waktu)
                        )}
                  </td>
                  <td>
                    {timeDifference(
                      start_time,
                      Number(pembalap.total_waktu)
                    ) === "NaN:NaN:NaN"
                      ? "00:00:00"
                      : index != 0
                      ? "+" +
                        timeDifference(
                          riders[index - 1].total_waktu,
                          Number(pembalap.total_waktu)
                        )
                      : "-"}
                  </td>
                  {pembalap.race_results.map((lap, lapIndex) => {
                    return (
                      <td key={lapIndex}>
                        {timeDifference(start_time, Number(lap.finish_time)) ===
                        "NaN:NaN:NaN"
                          ? "00:00:00"
                          : timeDifference(start_time, Number(lap.finish_time))}
                      </td>
                    );
                  })}

                  {Array.from({
                    length: lap - pembalap.race_results.length,
                  }).map((_, index) => (
                    <td key={index}>00:00:00</td>
                  ))}
                  <td>{pembalap.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
