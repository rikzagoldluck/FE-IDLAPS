"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const dateTimeToUnix = (datetime: string) => {
  const date = new Date(datetime);

  return Math.floor(date.getTime() / 1000);
};
export default function AddEvent() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [desc_1, setDesc1] = useState("");
  const [desc_2, setDesc2] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [distance, setDistance] = useState("");
  const [type, setType] = useState("");
  const [registration_fee, setRegisFee] = useState("");
  const [commisioner, setComm] = useState("");
  const [race_director, setRD] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const res = await fetch("http://localhost:3001/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        location,
        desc_1,
        desc_2,
        start_datetime: dateTimeToUnix(start),
        end_datetime: dateTimeToUnix(end),
        commisioner,
        race_director,
        distance,
        type,
        registration_fee,
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
    setLocation("");
    setDesc1("");
    setDesc2("");
    setStart("");
    setEnd("");
    setDistance("");
    setType("");
    setRegisFee("");
    setComm("");
    setRD("");

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={handleChange}>
        Add Event
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
            <h3 className="font-bold text-lg">Add New Event</h3>
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="event-name" className="label-text">
                    Event Name
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
                  <label htmlFor="event-location" className="label-text">
                    Event Location
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="location"
                      id="event-location"
                      className="input input-bordered w-full"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="event-description1" className="label-text">
                    Description 1
                  </label>
                  <div className="mt-2">
                    <textarea
                      name="desc_1"
                      id="event-descriptin1"
                      className="w-full textarea textarea-bordered h-24"
                      placeholder="Description 1"
                      value={desc_1}
                      onChange={(e) => setDesc1(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="event-description2" className="label-text">
                    Description 2
                  </label>
                  <div className="mt-2">
                    <textarea
                      name="desc_2"
                      id="event-description2"
                      className="w-full textarea textarea-bordered h-24"
                      placeholder="Description 2"
                      value={desc_2}
                      onChange={(e) => setDesc2(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="event-commisioner" className="label-text">
                    Commisioner
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="commisioner"
                      id="event-commisioner"
                      className="input input-bordered w-full"
                      value={commisioner}
                      onChange={(e) => setComm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="event-race-director" className="label-text">
                    Race Director
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="race-director"
                      id="event-race-director"
                      className="input input-bordered w-full"
                      value={race_director}
                      onChange={(e) => setRD(e.target.value)}
                    />
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
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
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
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
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
                        onChange={(e) => setDistance(e.target.value)}
                      />
                      <span>KM</span>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="event-race-type" className="label-text">
                    Race Type
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="type"
                      id="event-race-type"
                      placeholder="Road Bike, Mountain Bike, etc..."
                      className="input input-bordered w-full"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="event-registration-fee"
                    className="label-text"
                  >
                    Registration Fee
                  </label>
                  <div className="mt-2">
                    <div className="input-group">
                      <span>Rp</span>
                      <input
                        type="number"
                        name="regis-fee"
                        id="event-registration-fee"
                        className="input input-bordered w-full"
                        min={1}
                        max={10000}
                        value={registration_fee}
                        onChange={(e) => setRegisFee(e.target.value)}
                      />
                      <span>K</span>
                    </div>
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
