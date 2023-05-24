"use client";

import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EventResponse } from "@/services/events/data-type";
import { getEvents } from "@/services/events";

const dateTimeToUnix = (datetime: string) => {
  const date = new Date(datetime);

  return Math.floor(date.getTime() / 1000);
};
export default function AddEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [sex, setSex] = useState("Men");
  const [distance, setDistance] = useState(0);
  const [lap, setLap] = useState(0);
  const [run, setRun] = useState(false);
  const [event_id, setEventId] = useState(0);
  const [events, setEvents] = useState<EventResponse>({
    message: "",
    data: [],
  });
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  const getEventList = useCallback(async () => {
    const data = await getEvents();
    setEvents(data);
  }, [getEvents]);

  useEffect(() => {
    getEventList();
  }, []);

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
        start_time: dateTimeToUnix(start_time),
        end_time: dateTimeToUnix(start_time),
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
      alert(`Something went wrong : ${resBody.message}`);
      return;
    }

    setIsMutating(false);

    setName("");
    setDescription("");
    setStartTime("");
    setEndTime("");
    setSex("");
    setDistance(0);
    setLap(0);
    setRun(false);
    setEventId(0);

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  function handleRadioButton(value: string) {
    setSex(value);
  }

  function handleSelect(e: SyntheticEvent) {
    setEventId(e.currentTarget.value);
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={handleChange}>
        Add Category
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
        id="my-modal-3"
      />

      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg">Add New Category</h3>
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="event-name" className="label-text">
                    Category Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="event-name"
                      className="input input-bordered w-full"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="event-description" className="label-text">
                    Description{" "}
                  </label>
                  <div className="mt-2">
                    <textarea
                      name="description"
                      id="event-description"
                      className="textarea textarea-bordered w-full"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="event-commisioner" className="label-text">
                    Sex
                  </label>
                  {/* <div className="mt-2"> */}
                  <label className="label cursor-pointer ">
                    <span className="label-text">Man</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-red-500"
                      checked={sex == "Men" && true}
                      onChange={() => handleRadioButton("Men")}
                    />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Woman</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-blue-500"
                      checked={sex == "Woman" && true}
                      onChange={() => handleRadioButton("Woman")}
                    />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text">Mix</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-blue-500"
                      checked={sex == "Mix" && true}
                      onChange={() => handleRadioButton("Mix")}
                    />
                  </label>
                  {/* </div> */}
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="event-registration-fee"
                    className="label-text"
                  >
                    Event
                  </label>
                  <div className="mt-2">
                    <div className="input-group">
                      <select
                        className="select select-bordered w-full"
                        onChange={handleSelect}
                        defaultValue={"pickone"}
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
                  <label htmlFor="event-start-date" className="label-text">
                    Start Race
                  </label>
                  <div className="mt-2">
                    <input
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
                      type="datetime-local"
                      name="end"
                      id="event-end-date"
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
