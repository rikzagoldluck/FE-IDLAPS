"use client";
import { Category, CategoryResponse } from "@/services/categories/data-type";
import { convertDateTime, convertDateTimeMillis } from "@/services/converter";
import React, { SyntheticEvent, useEffect, useState } from "react";
import {
  getCategoriesByEvent,
  updateCategoriesByEvent,
} from "@/services/categories";
import toast from "react-hot-toast";
import Link from "next/link";
const TableBody = ({
  eventSelected,
  buttonState,
}: {
  eventSelected: string;
  buttonState: string;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({});

  const handleCheckboxChange = (checkboxName: string) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxName]: !prevCheckboxes[checkboxName],
    }));
  };

  useEffect(() => {
    if (buttonState === "") return;
    const checkedCategories = Object.keys(checkboxes)
      .filter((key) => checkboxes[key])
      .map((key) => parseInt(key));

    if (checkedCategories.length === 0) {
      toast("Please select category first", {
        duration: 3000,
        icon: "ℹ️",
      });
      return;
    }

    const data = {
      event_id: eventSelected,
      categories: checkedCategories,
    };

    updateCategoriesByEvent(buttonState.split("-")[0], data)
      .then((res) => {
        if (res.status === "Server Error") {
          toast.error(res.message);
          return;
        }

        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
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
          .catch((err) => {
            toast.error(err.message);
          });
        setCheckboxes({});
      });
  }, [buttonState]);

  useEffect(() => {
    if (eventSelected === "") return;
    if (eventSelected === "choose-event") {
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
      .catch((err) => {
        toast.error(err.message);
      });
  }, [eventSelected]);

  return (
    <tbody>
      {categories.length > 0 && eventSelected != "choose-event" ? (
        categories.map((category: Category, index: number) => (
          <tr key={category.id}>
            <td>{index + 1}</td>
            <td>
              {category.run ? (
                <Link href={`/race/${category.id}`} className="link link-hover">
                  <p>{category.name}</p>
                </Link>
              ) : (
                <p>{category.name}</p>
              )}
            </td>
            <td>{convertDateTimeMillis(category.start_sch)}</td>
            <td>{convertDateTimeMillis(category.end_sch)}</td>
            <td>
              {category.start_time === "0"
                ? "-"
                : convertDateTimeMillis(category.start_time)}
            </td>
            <td>
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
                readOnly
              />
            </td>
            <td>
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={checkboxes[category.id] || false}
                onChange={() => handleCheckboxChange(category.id.toString())}
              />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td className="text-center" colSpan={10}>
            No any data, please choose event or add event first
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
