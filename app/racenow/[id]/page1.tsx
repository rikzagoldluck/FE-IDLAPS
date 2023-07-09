"use client";
import Navbar from "@/components/Navbar";
// import TableBody from "./tableBody";
import { Rider } from "@/services/riders/data-type";
import { getRidersRunInCategory } from "@/services/riders";
import { Suspense } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
// export const metadata = {
//   title: "Category Championship",
// };

// interface IProps {
//   params: {
//     listId: string;
//   };
//   searchParams: {};
// }
export default function Page() {
  // const router = useRouter();
  // const { id } = router.query;
  // const { id } = params;
  // const pathname = usePathname();
  // console.log(pathname);

  // const ridersInCategory: Promise<Rider[]> = getRidersRunInCategory(id);
  // const riders: Rider[] = await getRidersRunInCategory(id);
  // console.log(riders);
  // const lap = riders[0].categories.lap;
  const { data, error, isLoading } = useSWR("getRidersRunInCategory", () =>
    getRidersRunInCategory("5")
  );
  if (isLoading) {
    return;
  }
  if (error) {
    return;
  }
  if (!data) {
    return;
  }

  console.log(data);
  return (
    <div>
      <h2>Home Page</h2>
    </div>
  );

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
