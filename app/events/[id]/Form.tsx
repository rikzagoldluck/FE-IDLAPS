"use client";

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import type { Event } from "@/services/events/data-type";
const dateTimeToUnix = (datetime: string) => {
  const date = new Date(datetime);

  return Math.floor(date.getTime() / 1000);
};

const unixToInput = (unix: number) => {
  // Membuat objek Date dari UNIX timestamp (dalam milidetik)
  const date = new Date(unix * 1000);

  // Mendapatkan tanggal dan waktu dalam format "YYYY-MM-DDTHH:mm"
  return date.toISOString().slice(0, 16);
};

export default function Form({ event }: { event: Event }) {
  const [name, setName] = useState(event.name);
  const [location, setLocation] = useState(event.location);
  const [desc_1, setDesc1] = useState(event.desc_1);
  const [desc_2, setDesc2] = useState(event.desc_2);
  const [start, setStart] = useState(unixToInput(event.start_datetime));
  const [end, setEnd] = useState(unixToInput(event.end_datetime));
  const [distance, setDistance] = useState(event.distance);
  const [type, setType] = useState(event.type);
  const [registration_fee, setRegisFee] = useState(event.registration_fee);
  const [commisioner, setComm] = useState(event.commisioner);
  const [race_director, setRD] = useState(event.race_director);

  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();
  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const res = await fetch(`http://localhost:3001/events/${event.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        location,
        desc_1,
        desc_2,
        commisioner,
        race_director,
        distance,
        type,
        registration_fee,
        start_datetime:
          typeof start === "number" ? start : dateTimeToUnix(start),
        end_datetime: typeof end === "number" ? end : dateTimeToUnix(end),
      }),
    });

    if (!res.ok) {
      setIsMutating(false);
      const resBody = await res.json();
      alert(`Something went wrong : ${resBody.message}`);
      return;
    }

    setIsMutating(false);
    router.push("/events");
    router.refresh();
  }

  return (
    <div className="container mx-auto py-4 px-4">
      <form onSubmit={handleUpdate}>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Edit {event.name}</h3>
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
              <label htmlFor="event-name" className="label-text">
                Event Name
              </label>
              <div className="mt-2">
                <input
                  required={true}
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
                  required={true}
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
                  required={true}
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
                    onChange={(e) => setDistance(Number(e.target.value))}
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
              <label htmlFor="event-registration-fee" className="label-text">
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
                    onChange={(e) => setRegisFee(Number(e.target.value))}
                  />
                  <span>K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
