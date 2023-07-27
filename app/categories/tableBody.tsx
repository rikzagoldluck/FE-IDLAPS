"use client";
import { Category } from "@/services/categories/data-type";
import { convertDateTimeMillis } from "@/services/converter";
import Link from "next/link";
import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import DeleteCategory from "./deleteCategories";
import { getCategoriesByEvent } from "@/services/categories";
import toast from "react-hot-toast";
import Image from "next/image";

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
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) =>
        toast.error("Failed to fetch categories by event : " + err)
      );
  }, [eventSelected, changed, added]);
  return (
    <tbody>
      {categories.length > 0 && eventSelected != "choose-event" ? (
        categories.map((category: Category, index: number) => (
          <tr key={category.id}>
            <td>{index + 1}</td>
            <td>{category.name}</td>
            <td>{category.description == "" ? "-" : category.description}</td>
            <td>
              {convertDateTimeMillis(category.start_sch)}{" "}
              {category.independent_start && "🚵"}
            </td>
            <td>
              {convertDateTimeMillis(category.end_sch) === "Invalid date" ||
              convertDateTimeMillis(category.end_sch) === "01/01/1970 07:00:00"
                ? "Not Set"
                : convertDateTimeMillis(category.end_sch)}
            </td>
            <td>
              <Image
                src={"/img/" + category.sex + ".png"}
                alt={category.sex}
                width={48}
                height={48}
              />
            </td>
            <td className="text-center">{category.distance}</td>
            <td className="text-center">{category.lap}</td>
            <td className="text-center">{category.riderCount}</td>
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
