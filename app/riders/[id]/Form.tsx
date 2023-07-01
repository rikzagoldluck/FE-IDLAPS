"use client";

import { useRouter } from "next/navigation";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import type { Event, EventResponse } from "@/services/events/data-type";
import { dateTimeToUnix, unixToInput } from "@/services/converter";
import { Rider } from "@/services/riders/data-type";
import { Category, CategoryResponse } from "@/services/categories/data-type";
import { TeamResponse } from "@/services/teams/data-type";
import { getEventsWithCaching } from "@/services/events";
import { getTeamsWithCaching } from "@/services/teams";
import { getCategoriesByEvent } from "@/services/categories";
import toast from "react-hot-toast";
import { BeaconResponse } from "@/services/beacons/data-type";
import {
  getAvailBeaconsAndChoosenInEvents,
  getAvailBeaconsInEvents,
} from "@/services/beacons";
export default function Form({ rider }: { rider: Rider }) {
  const [name, setName] = useState(rider.name);
  const [age, setAge] = useState(rider.age);
  const [nationality, setNationality] = useState(rider.nationality);
  const [bib, setBIB] = useState(rider.bib);
  const [vci_num, setVciNum] = useState(rider.vci_num);
  const [id_beacon, setidBeacon] = useState(rider.id_beacon);
  const [mac_no, setMacNo] = useState(rider.mac_no);
  const [note_1, setNote1] = useState(rider.note_1);
  const [eventSelected, setEventSeleceted] = useState(
    rider.categories.events.id
  );
  const [teamSelected, setTeamSeleceted] = useState(rider.team_id);
  const [categorySelected, setCategorySeleceted] = useState(
    rider.categories.id
  );
  const [events, setEvents] = useState<EventResponse>({
    message: "",
    data: [],
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [teams, setTeams] = useState<TeamResponse>({
    message: "",
    data: [],
  });

  const [beacons, setBeacons] = useState<BeaconResponse>({
    message: "",
    data: [],
  });

  const [isMutating, setIsMutating] = useState(false);

  const getEventAndTeamList = useCallback(async () => {
    const eventsData = await getEventsWithCaching();
    const teamsData = await getTeamsWithCaching();
    setEvents(eventsData);
    setTeams(teamsData);
  }, [getEventsWithCaching, getTeamsWithCaching]);

  useEffect(() => {
    getEventAndTeamList();
  }, []);

  useEffect(() => {
    getCategoriesByEvent(
      typeof eventSelected === "number"
        ? eventSelected.toString()
        : eventSelected
    )
      .then((res) => {
        if (res.status === "Server Error") {
          toast.error(res.message);
          return;
        }
        setCategories(res.data);
      })
      .catch((err) =>
        toast.error("Failed to fetch categories by event : " + err)
      );
  }, [eventSelected]);

  useEffect(() => {
    getAvailBeaconsAndChoosenInEvents(categorySelected, id_beacon.toString())
      .then((res) => {
        setBeacons(res);
      })
      .catch((res) => {
        if (res.message === "Failed to fetch : 404 Not Found") {
          toast.error(
            "There is no category at this event, Please add category first",
            { duration: 3000 }
          );
          return;
        }
        toast.error(res.message, { duration: 3000 });
      });
  }, [categorySelected]);

  const router = useRouter();
  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const res = await fetch(`http://localhost:3001/riders/${rider.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        age,
        nationality,
        team_id: teamSelected,
        bib,
        vci_num,
        id_beacon,
        mac_no,
        note_1,
        category_id: categorySelected,
      }),
    });

    if (!res.ok) {
      setIsMutating(false);
      const resBody = await res.json();
      toast.error(`Something went wrong : ${resBody.message}`);
      return;
    }
    toast.success("Rider updated", { duration: 1000 });

    setIsMutating(false);
    router.back();
  }

  return (
    <div className="container mx-auto py-4 px-4">
      <form onSubmit={handleUpdate}>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Edit Rider : {rider.name}</h3>
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
              <label htmlFor="rider-name" className="label-text">
                Rider Name
              </label>
              <div className="mt-2">
                <input
                  required={true}
                  type="text"
                  name="name"
                  id="rider-name"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="rider-note-2" className="label-text">
                Note 2
              </label>
              <div className="mt-2">
                <textarea
                  name="note_2"
                  id="rider-note-2"
                  className="input input-bordered w-full"
                  value={note_1}
                  onChange={(e) => setNote1(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="rider-age" className="label-text">
                Age
              </label>
              <div className="mt-2">
                <input
                  required={true}
                  type="number"
                  name="age"
                  id="rider-age"
                  min={0}
                  max={200}
                  className="input input-bordered w-full"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="rider-nationality" className="label-text">
                Nationality
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  required={true}
                  name="nationality"
                  id="rider-nationality"
                  className="w-full input input-bordered"
                  placeholder="INA"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="rider-bib" className="label-text">
                BIB
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  required={true}
                  name="bib"
                  id="rider-bib"
                  className="w-full input input-bordered"
                  placeholder="001"
                  value={bib}
                  minLength={3}
                  onChange={(e) => setBIB(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="rider-vcinum" className="label-text">
                VCI Num
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  required={true}
                  name="vcinum"
                  id="rider-vcinum"
                  className="input input-bordered w-full"
                  value={vci_num}
                  onChange={(e) => setVciNum(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="rider-beacon" className="label-text">
                ID Beacon
              </label>
              <div className="mt-2">
                <div className="input-group">
                  <select
                    required={true}
                    className="select select-bordered w-full"
                    onChange={(e) => setidBeacon(parseInt(e.target.value))}
                    value={id_beacon}
                  >
                    {beacons.data.length > 0 &&
                      beacons.data.map((beacon) => (
                        <option key={beacon.id} value={beacon.id}>
                          {beacon.id}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="rider-mac-no" className="label-text">
                No Mac
              </label>
              <div className="mt-2">
                <input
                  required={true}
                  type="text"
                  name="mac_no"
                  id="rider-mac-no"
                  className="input input-bordered w-full"
                  value={mac_no}
                  onChange={(e) => setMacNo(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="event-team" className="label-text">
                Team
              </label>
              <div className="mt-2">
                <div className="input-group">
                  <select
                    required={true}
                    className="select select-bordered w-full"
                    onChange={(e) => setTeamSeleceted(parseInt(e.target.value))}
                    value={teamSelected}
                  >
                    {teams.data.length > 0 &&
                      teams.data.map((team) => (
                        <option key={team.id} value={team.id}>
                          {`${team.name} - ${team.nationality}`}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="event-select" className="label-text">
                Event
              </label>
              <div className="mt-2">
                <div className="input-group">
                  <select
                    required={true}
                    className="select select-bordered w-full"
                    onChange={(e) =>
                      setEventSeleceted(parseInt(e.target.value))
                    }
                    value={eventSelected}
                  >
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
              <label htmlFor="categories-select" className="label-text">
                Category
              </label>
              <div className="mt-2">
                <div className="input-group">
                  <select
                    required={true}
                    className="select select-bordered w-full"
                    onChange={(e) =>
                      setCategorySeleceted(parseInt(e.target.value))
                    }
                    disabled={categories.length === 0}
                    value={categorySelected}
                  >
                    {categories.length > 0 &&
                      categories.map((category: Category) => (
                        <option key={category.id} value={category.id}>
                          {`${category.name}`}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
