"use client";

import { getCategoriesByEvent } from "@/services/categories";
import { Category } from "@/services/categories/data-type";
import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function SelectCategory({
  onSelect,
  eventSelected,
}: {
  onSelect: Function;
  eventSelected: string;
}) {
  const [categories, setCategory] = useState<Category[]>([]);
  const [category, setCategorySelected] = useState("");

  useEffect(() => {
    if (eventSelected == "" || eventSelected === "choose-event") return;

    getCategoriesByEvent(eventSelected)
      .then((res) => {
        if (res.status === "Server Error") {
          toast.error(res.message);
          return;
        }
        setCategory(res.data);
        if (res.data.length == 0)
          toast("No category found for this event, Please add category first", {
            duration: 3000,
            icon: "ℹ️",
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
    onSelect("choose-category");
  }, [eventSelected]);

  function handleSelect(e: SyntheticEvent) {
    const { value } = e.currentTarget;
    if (value == "") return;
    setCategorySelected(value);
    onSelect(value);
  }
  return (
    <select
      className="select select-bordered w-full md:w-3/4"
      onChange={handleSelect}
      // defaultValue={"choose-category"}
      value={eventSelected === "choose-event" ? "choose-category" : category}
      disabled={
        eventSelected === "" ||
        eventSelected === "choose-event" ||
        categories.length == 0
          ? true
          : false
      }
    >
      <option value={"choose-category"}>Choose Category</option>
      {categories.length > 0 &&
        categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
    </select>
  );
}
