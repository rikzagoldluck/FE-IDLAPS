"use client";
import { Category } from "@/services/categories/data-type";
import { convertDateTimeMillis } from "@/services/converter";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import DeleteCategory from "./deleteCategories";
import { getCategories } from "@/services/categories";
import useSWR from "swr";
import toast from "react-hot-toast";

const tableBody = () => {
  // const { categories } = props;

  const { data, error, isLoading, mutate } = useSWR("getCategroies", () =>
    getCategories()
  );

  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td className="text-center" colSpan={9}>
            Loading...
          </td>
        </tr>
      </tbody>
    );
  }
  if (
    (typeof data.status !== "undefined" && data.status === "Server Error") ||
    error
  ) {
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
    try {
      const res = await fetch(
        `http://localhost:3001/categories/race_today/${e.target.getAttribute(
          "data-id"
        )}/${e.target.checked}`,
        {
          method: "PATCH",
        }
      );
      mutate();

      toast.success("Race Today has Changed", { duration: 1000 });
    } catch (err) {
      toast.error("Race Today failed to Change : " + err, { duration: 1000 });
      return;
    }
  };

  return (
    <tbody>
      {categories.length > 0 ? (
        categories.map((category: Category, index: number) => (
          <tr key={category.id}>
            <td>{index + 1}</td>
            <td>{category.name + " - " + category.events.name}</td>
            <td>{category.description}</td>
            <td>{convertDateTimeMillis(category.start_sch)}</td>
            <td>{convertDateTimeMillis(category.end_sch)}</td>
            <td>{category.sex}</td>
            <td>{category.distance}</td>
            <td>{category.lap}</td>
            <td>
              <input
                data-id={category.id}
                type="checkbox"
                className="toggle toggle-success"
                defaultChecked={category.race_today}
                onChange={handleChangeCheckbox}
              />
            </td>
            <td className="flex gap-3">
              {/* <UpdateCategory {...category} /> */}
              <Link href={`/categories/${category.id}`}>
                <button className="btn btn-secondary btn-sm">Edit</button>
              </Link>
              <DeleteCategory {...category} />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td className="text-center" colSpan={9}>
            No any data, please create category instead{" "}
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default tableBody;
