"use client";

import { getRidersRunInCategory } from "@/services/riders";
import { Rider } from "@/services/riders/data-type";
import { useAnimate } from "framer-motion";
import useSWR from "swr";

import { motion, AnimatePresence } from "framer-motion";
import Table from "./Table";
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

  const categoryName = riders[0].categories.name;
  return (
    <>
      <h1 className="text-3xl text-center font-bold mb-3">{categoryName}</h1>
      <Table riders={riders} />
    </>
  );
}
