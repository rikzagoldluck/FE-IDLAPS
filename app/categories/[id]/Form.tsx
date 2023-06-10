"use client";

import { useRouter } from "next/navigation";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import type { EventResponse } from "@/services/events/data-type";
import { Category } from "@/services/categories/data-type";
import { getEvents, getEventsWithCaching } from "@/services/events";
import { dateTimeToUnix, unixToInput } from "@/services/converter";
import toast from "react-hot-toast";

export default function Form({ category }: { category: Category }) {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [start_time, setStartTime] = useState(unixToInput(category.start_sch));
  const [end_time, setEndTime] = useState(unixToInput(category.end_sch));
  const [sex, setSex] = useState(category.sex);
  const [distance, setDistance] = useState(category.distance);
  const [lap, setLap] = useState(category.lap);
  const [run, setRun] = useState(category.run);
  const [event_id, setEventId] = useState(category.event_id);
  const [events, setEvents] = useState<EventResponse>({
    message: "",
    data: [],
  });

  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  const getEventList = useCallback(async () => {
    const data = await getEventsWithCaching();
    setEvents(data);
  }, [getEvents]);

  useEffect(() => {
    getEventList();
  }, []);

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const res = await fetch(`http://localhost:3001/categories/${category.id}`, {
      method: "PATCH",
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
        event_id,
      }),
    });

    if (!res.ok) {
      setIsMutating(false);
      const resBody = await res.json();
      toast.error("Something went wrong" + resBody.message, { duration: 1000 });
      return;
    }

    toast.success("Category updated", { duration: 1000 });
    setIsMutating(false);
    router.push("/categories");
    router.refresh();
  }

  function handleRadioButton(value: string) {
    setSex(value);
  }

  function handleSelect(e: SyntheticEvent) {
    setEventId(e.currentTarget.value);
  }

  return (
    <div className="container mx-auto py-4 px-4">
      <form onSubmit={handleUpdate}>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Edit Category : {category.name}</h3>
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
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="category-name" className="label-text">
                Category Name
              </label>
              <div className="mt-2">
                <input
                  required={true}
                  type="text"
                  name="name"
                  id="category-name"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                  className="radio checked:bg-blue"
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
              <label htmlFor="events" className="label-text">
                Event
              </label>
              <div className="mt-2">
                <div className="input-group">
                  <select
                    required={true}
                    id="events"
                    className="select select-bordered w-full"
                    onChange={handleSelect}
                    value={event_id}
                  >
                    <option value={"pickone"}>Pick one</option>
                    {events.data.length > 0 &&
                      events.data.map((event) => (
                        <option key={event.id} value={event.id}>
                          {`${event.name} - ${event.location}`}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="category-start-time" className="label-text">
                Start Race
              </label>
              <div className="mt-2">
                <input
                  required={true}
                  type="datetime-local"
                  name="start"
                  id="category-start-time"
                  className="input input-bordered w-full"
                  value={start_time}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="cateogry-end-date" className="label-text">
                End Race
              </label>
              <div className="mt-2">
                <input
                  required={true}
                  type="datetime-local"
                  name="end"
                  id="cateogry-end-date"
                  className="input input-bordered w-full"
                  value={end_time}
                  onChange={(e) => setEndTime(e.target.value)}
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
                    max={10000}
                    onChange={(e) => setDistance(Number(e.target.value))}
                  />
                  <span>KM</span>
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="event-race-type" className="label-text">
                Race Lap
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="type"
                  id="event-race-type"
                  placeholder="Road Bike, Mountain Bike, etc..."
                  className="input input-bordered w-full"
                  value={lap}
                  onChange={(e) => setLap(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
