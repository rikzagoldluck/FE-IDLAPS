import Navbar from "@/components/Navbar";
import React from "react";
import { Toaster } from "react-hot-toast";
import TableBody from "./TableBody";

export default function page({ params }: { params: { id: number } }) {
  const { id } = params;
<<<<<<< HEAD
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

  

=======
>>>>>>> 61d69e16d17bde94ffb686b4f8f8bc06713865ae
  return (
    <>
      <Navbar title={"Category Championship"} />
      <div>
        <Toaster />
      </div>
      <div className="py-10 px-10">
        {/* <h1 className="text-center text-4xl mb-5">{categoryName}</h1> */}
        <div className="overflow-x-auto">
          <TableBody id={id} />
        </div>
      </div>
    </>
  );
}
