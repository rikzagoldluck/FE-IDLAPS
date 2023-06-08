"use client";
import { Category } from "@/services/categories/data-type";
import { convertDateTime, convertDateTimeMillis } from "@/services/converter";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import { getCategoryInRace } from "@/services/categories";
import useSWR from "swr";
import toast from "react-hot-toast";
const tableBody = () => {
  // const { categories } = props;

  const { data, error, isLoading, mutate } = useSWR("getCategroiesInRace", () =>
    getCategoryInRace()
  );
  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td className="text-center" colSpan={10}>
            Loading...
          </td>
        </tr>
      </tbody>
    );
  }

  if (error) {
    return (
      <tbody>
        <tr>
          <td className="text-center" colSpan={10}>
            {error}
          </td>
        </tr>
      </tbody>
    );
  }
  if (typeof data.status !== "undefined" && data.status === "Server Error") {
    alert("Something went wrong, please try again later");
    return (
      <tbody>
        <tr>
          <td className="text-center">{data.message}</td>
        </tr>
      </tbody>
    );
  }
  const categories: Category[] = data ? data.data : [];

  const handleChangeCheckbox = async (e: SyntheticEvent) => {
    const id = e.target.getAttribute("data-id");

    try {
      const res = await fetch(
        `http://localhost:3001/categories/run/${id}/${e.target.checked}`,
        {
          method: "PATCH",
        }
      );

      const resStartTime = await fetch(
        `http://localhost:3001/categories/start_time/${id}`,
        {
          method: "PATCH",
        }
      );
      mutate();

      toast.success("There you Go!!!, Running has Changed", { duration: 1000 });
    } catch (error) {
      toast.error("Something went wrong in toggle : " + error, {
        duration: 1000,
      });
    }
  };

  return (
    <tbody>
      {categories.length > 0 ? (
        categories.map((category: Category, index: number) => (
          <tr key={category.id}>
            <td>{index + 1}</td>
            <td>
              {category.run ? (
                <Link href={`/race/${category.id}`} className="link link-hover">
                  {category.name + " - " + category.events.name}
                </Link>
              ) : (
                category.name + " - " + category.events.name
              )}
            </td>
            <td>{convertDateTimeMillis(category.start_sch)}</td>
            <td>{convertDateTimeMillis(category.end_sch)}</td>
            <td className="text-center">
              {category.start_time === "0"
                ? "-"
                : convertDateTimeMillis(category.start_time)}
            </td>
            <td className="text-center">
              {category.end_time === "0"
                ? "-"
                : convertDateTimeMillis(category.end_time)}
            </td>
            <td>{category.sex}</td>
            <td>{category.distance}</td>
            <td>{category.lap}</td>
            <td>
              <input
                data-id={category.id}
                type="checkbox"
                className="toggle toggle-success"
                checked={category.run}
                onChange={handleChangeCheckbox}
              />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td className="text-center" colSpan={10}>
            No any data, please add category to race today instead{" "}
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default tableBody;
