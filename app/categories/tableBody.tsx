"use client";
import { Category } from "@/services/categories/data-type";
import { convertDateTimeMillis } from "@/services/converter";
import Link from "next/link";
import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import DeleteCategory from "./deleteCategories";
import { getCategories, getCategoriesByEvent } from "@/services/categories";
import toast from "react-hot-toast";

const tableBody = ({
  eventSelected,
  added,
}: {
  eventSelected: string;
  added: string;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [changed, setChanged] = useState(false);



  useEffect(() => {
    if (eventSelected === "choose-event" || eventSelected === "") {
      toast("Please select event first", { duration: 3000, icon: "ℹ️" });
      return;
    }

    getCategoriesByEvent(eventSelected)
      .then((res) => {
        if (res.status === "Server Error") {
          toast.error(res.message);
          return;
        }
        setCategories(res.data);
      })
      .catch((err) =>
        toast.error("Failed to fetch categories by event :   " + err)
      );
  }, [eventSelected, changed,  added]);
  return (
    <tbody>
      {categories.length > 0 && eventSelected != "choose-event" ? (
        categories.map((category: Category, index: number) => (
          <tr key={category.id}>
            <td>{index + 1}</td>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td>{convertDateTimeMillis(category.start_sch)}</td>
            <td>{convertDateTimeMillis(category.end_sch)}</td>
            <td>{category.sex}</td>
            <td>{category.distance}</td>
            <td>{category.lap}</td>
            <td className="flex gap-3">
              {/* <UpdateCategory {...category} /> */}
              <Link href={`/categories/${category.id}`}>
                <button className="btn btn-secondary btn-sm">Edit</button>
              </Link>
              <DeleteCategory
                category={category}
                onDeleted={() => setChanged(!changed)}
              />
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
