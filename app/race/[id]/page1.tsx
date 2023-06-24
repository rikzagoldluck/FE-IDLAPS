"use client";
import Navbar from "@/components/Navbar";
import TableBody from "./tableBody";
import { Rider } from "@/services/riders/data-type";
import { getRidersRunInCategory } from "@/services/riders";
import { Suspense } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
export const metadata = {
  title: "Category Championship",
};

export default async function CategoryChampionship() {
  const router = useRouter();
  const { id } = router.query;
  // const { id } = params;

  // const ridersInCategory: Promise<Rider[]> = getRidersRunInCategory(id);
  const riders: Rider[] = await getRidersRunInCategory(id?.toString());
  const lap = riders[0].categories.lap;
  const { data, error, isLoading } = useSWR("getRidersRunInCategory", () =>
    getRidersRunInCategory(id)
  );
  if (isLoading) {
    return (
      <tr>
        <td colSpan={4}>Loading ...</td>
      </tr>
    );
  }
  if (error) {
    return (
      <tr>
        <td colSpan={4}>Error ...</td>
      </tr>
    );
  }
  if (!data) {
    return (
      <tr>
        <td colSpan={4}>Loading ...</td>
      </tr>
    );
  }

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
                {Array.from({ length: lap }).map((_, index) => (
                  <th key={index}>Lap {index + 1}</th>
                ))}
                <th>Total Time</th>
              </tr>
            </thead>
            <tbody>
              {/* <Suspense
                fallback={
                  <tr>
                    <td colSpan={4}>Loading ...</td>
                  </tr>
                }
              > */}
              {/* <SWRConfig> */}
              {/* @ts-expect-error Server Component */}
              {/* <TableBody id={id} /> */}
              {/* </SWRConfig> */}
              {/* </Suspense> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
