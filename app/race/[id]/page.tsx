"use client";

import { SelectBoxContext } from "@/app/provider/SelectBox";
import Navbar from "@/components/Navbar";
import SelectRiderNote from "@/components/SelectRiderNote";
import { convertDateTimeMillis, timeDifference } from "@/services/converter";
import { getRidersRunInCategory } from "@/services/riders";
import { Rider } from "@/services/riders/data-type";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import useSWR from "swr";

export default function Page({ params }: { params: { id: number } }) {
  const selectBox = useContext(SelectBoxContext)
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
  if (data.length === 0) {
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
  const riders: Rider[] = data;
  const lap = riders[0].categories.lap;
  const start_time = riders[0].categories.start_time;
  const categoryName = riders[0].categories.name;

  if(riders[0].race_results.length != 0){
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
  }

  

  return (
    <>
      <Navbar title={"Category Championship"} />
      <div>
        <Toaster />
      </div>
      <div className="py-10 px-10">
        <h1 className="text-center text-4xl mb-5">{categoryName}</h1>
        <div className="overflow-x-auto">
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
                <th>Note</th>
              </tr>
            </thead>
            <tbody className="font-bold">
              {riders.map((pembalap: Rider, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{pembalap.name}</td>
                  <td>{pembalap.teams.name}</td>
                  <td>{pembalap.bib}</td>
                  <td>{convertDateTimeMillis(start_time)}</td>
                  {pembalap.total_waktu === "0" && <td>00:00:00.000</td>}
                  {pembalap.total_waktu !== "0" && (
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
                  )}

                  {pembalap.total_waktu === "0" && index == 0 && <td>-</td>}
                  {pembalap.total_waktu === "0" && index != 0 && (
                    <td>+00:00:00.000</td>
                  )}
                  {pembalap.total_waktu !== "0" && (
                    <td>
                      {timeDifference(
                        start_time,
                        Number(pembalap.total_waktu)
                      ) === "NaN:NaN:NaN"
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
                    <SelectRiderNote
                      idRider={pembalap.id}
                      note={pembalap.note}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
