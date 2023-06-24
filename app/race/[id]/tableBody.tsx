"use client";
import { Category } from "@/services/categories/data-type";
import { convertDateTime } from "@/services/converter";
import { getRidersRunInCategory } from "@/services/riders";
import { Rider } from "@/services/riders/data-type";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import useSWR from "swr";

type Props = {
  id: number;
};

export default async function tableBody({ id }: Props) {
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

  //   const content = <></>;

  // const content = riders.map((pembalap: Rider, index: number) => {
  //   return (
  //     <tr key={index}>
  //       <td>{index + 1}</td>
  //       <td>{pembalap.name}</td>

  //       {pembalap.race_results.map((lap, lapIndex) => {
  //         return <td key={lapIndex}>{lap.finish_time}</td>;
  //       })}
  //     </tr>
  //   );
  // });

  //   const { data, error } = useSWR("getRidersRunInCategory", () =>
  //     getRidersRunInCategory(categoryId)
  //   );
  //   if (!data) {
  //     return (
  //       <tbody>
  //         <tr>
  //           <td className="text-center" colSpan={10}>
  //             Loading...
  //           </td>
  //         </tr>
  //       </tbody>
  //     );
  //   }

  //   if (typeof data.status !== "undefined" && data.status === "Server Error") {
  //     alert("Something went wrong, please try again later");
  //     return (
  //       <tbody>
  //         <tr>
  //           <td className="text-center">{data.message}</td>
  //         </tr>
  //       </tbody>
  //     );
  //   }

  return (
    <tr>
      <td colSpan={4}>Loading ...</td>
    </tr>
  );
}
