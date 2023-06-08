"use client";

import Navbar from "@/components/Navbar";
import { timeDifference } from "@/services/converter";
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
    return;
  }
  if (error) {
    return;
  }
  if (!data) return;
  const riders: Rider[] = data;
  const lap = riders[0].categories.lap;
  const start_time = riders[0].categories.start_time;

  return (
    <>
      <Navbar title={"Category Championship"} />
      <div className="py-10 px-10">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full font-bold">
            <thead>
              <tr>
                <th>#</th>
                <th>Rider</th>
                <th>BIB</th>
                <th>Total Time</th>

                {Array.from({ length: lap }).map((_, index) => (
                  <th key={index}>Lap {index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {riders.map((pembalap: Rider, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{pembalap.name}</td>
                  <td>{pembalap.bib}</td>
                  <td>{timeDifference(start_time, pembalap.total_waktu)}</td>
                  {pembalap.race_results.map((lap, lapIndex) => {
                    return <td key={lapIndex}>{lap.finish_time}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
