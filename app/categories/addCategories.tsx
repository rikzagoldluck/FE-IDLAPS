"use client";

import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Event, EventResponse } from "@/services/events/data-type";
import { getEvents, getEventsWithCaching } from "@/services/events";
import toast from "react-hot-toast";
import { dateTimeToUnix, unixToDDMMYYYY } from "@/services/converter";
export default function AddCategory({
  state,
  eventSelected,
  onAdded,
}: {
  state: boolean;
  eventSelected: string;
  onAdded: Function;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [sex, setSex] = useState("Men");
  const [distance, setDistance] = useState(0);
  const [lap, setLap] = useState(0);
  const [run, setRun] = useState(false);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const res = await fetch("http://localhost:3001/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        description,
        start_sch: dateTimeToUnix(start_time),
        end_sch: dateTimeToUnix(end_time),
        sex,
        distance,
        lap,
        run,
        event_id: eventSelected,
      }),
    });

    if (!res.ok) {
      setIsMutating(false);
      const resBody = await res.json();
      toast.error("Something went wrong" + resBody.message, { duration: 1000 });
      return;
    }

    toast.success("Category added", { duration: 1000 });
    setIsMutating(false);

    setName("");
    setDescription("");
    setStartTime("0");
    setEndTime("0");
    setSex("");
    setDistance(0);
    setLap(0);
    setRun(false);

    // router.refresh();
    onAdded();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  function handleRadioButton(value: string) {
    setSex(value);
  }

  return (
    <div className="flex justify-end">
      <button
        className="btn btn-primary btn-block md:w-1/2 "
        onClick={handleChange}
        disabled={state}
      >
        Add Category
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
        id="add-category-modal"
      />

      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <label
            htmlFor="add-category-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg">Add New Category</h3>
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="category-name" className="label-text">
                    Category Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="category-name"
                      className="input input-bordered w-full"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={true}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="category-sex" className="label-text">
                    Sex
                  </label>
                  {/* <div className="mt-2"> */}
                  <label className="label cursor-pointer ">
                    <span className="label-text">Man</span>
                    <input
                      required={true}
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-red"
                      checked={sex == "Man" && true}
                      onChange={() => handleRadioButton("Man")}
                    />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Woman</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-blue"
                      checked={sex == "Woman" && true}
                      onChange={() => handleRadioButton("Woman")}
                    />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Mix</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-blue"
                      checked={sex == "Mix" && true}
                      onChange={() => handleRadioButton("Mix")}
                    />
                  </label>
                  {/* </div> */}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="category-description" className="label-text">
                    Description{" "}
                  </label>
                  <div className="mt-2">
                    <textarea
                      name="description"
                      id="category-description"
                      className="textarea textarea-bordered w-full"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3 ">
                  <label htmlFor="event-distance" className="label-text">
                    Distance
                  </label>
                  <div className="mt-2">
                    <div className="input-group">
                      <input
                        type="number"
                        name="distance"
                        id="event-distance"
                        autoComplete="given-distance"
                        className="input input-bordered w-full"
                        value={distance}
                        min={1}
                        defaultValue={0}
                        max={10000}
                        onChange={(e) => setDistance(Number(e.target.value))}
                      />
                      <span>KM</span>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="event-start-date" className="label-text">
                    Start Race
                  </label>
                  <div className="mt-2">
                    <input
                      required={true}
                      type="datetime-local"
                      name="start"
                      id="event-start-date"
                      className="input input-bordered w-full"
                      value={start_time}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="event-end-date" className="label-text">
                    End Race
                  </label>
                  <div className="mt-2">
                    <input
                      required={true}
                      type="datetime-local"
                      name="end"
                      id="event-end-date"
                      className="input input-bordered w-full"
                      value={end_time}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="event-lap" className="label-text">
                    Race Lap
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="type"
                      id="event-lap"
                      className="input input-bordered w-full"
                      value={lap}
                      onChange={(e) => setLap(Number(e.target.value))}
                      min={1}
                      max={100}
                      defaultValue={0}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
