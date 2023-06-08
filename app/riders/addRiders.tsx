"use client";

import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EventResponse } from "@/services/events/data-type";
import { Category, CategoryResponse } from "@/services/categories/data-type";
import { TeamResponse } from "@/services/teams/data-type";
import { getEventsWithCaching } from "@/services/events";
import { getCategoriesByEvent, getCategory } from "@/services/categories";
import { getTeam, getTeamsWithCaching } from "@/services/teams";

import toast from "react-hot-toast";

export default function AddRider() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");
  const [bib, setBIB] = useState("");
  const [vci_num, setVciNum] = useState("");
  const [id_beacon, setidBeacon] = useState(0);
  const [mac_no, setMacNo] = useState("");
  const [note_1, setNote1] = useState("");
  const [events, setEvents] = useState<EventResponse>({
    message: "",
    data: [],
  });
  const [categories, setCategories] = useState<CategoryResponse>({
    message: "",
    data: [],
  });
  const [teams, setTeams] = useState<TeamResponse>({
    message: "",
    data: [],
  });

  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [eventSelected, setEventSeleceted] = useState("");
  const [teamSelected, setTeamSeleceted] = useState("");
  const [categorySelected, setCategorySeleceted] = useState("");

  const router = useRouter();

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
    if (eventSelected == "") return;
    getCategoriesByEvent(eventSelected)
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => alert("Failed to fetch categories by event :   " + err));
  }, [eventSelected]);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const res = await fetch("http://localhost:3001/riders", {
      method: "POST",
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
        event_id: eventSelected,
        category_id: categorySelected,
      }),
    });

    if (!res.ok) {
      setIsMutating(false);
      const resBody = await res.json();
      toast.error("Something went wrong" + resBody.message, { duration: 1000 });
      alert(`Something went wrong : ${resBody.message}`);
      return;
    }
    toast.success("Rider added", { duration: 1000 });
    setIsMutating(false);

    setName("");
    setAge(0);
    setNationality("");
    setTeamSeleceted("");
    setBIB("");
    setVciNum("");
    setidBeacon(0);
    setMacNo("");
    setNote1("");
    setEventSeleceted("");
    setCategorySeleceted("");

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={handleChange}>
        Add Rider
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
        id="add-rider-modal"
      />

      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <label
            htmlFor="add-rider-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg">Add New Rider</h3>
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
                    <input
                      type="number"
                      name="beacon"
                      id="rider-beacon"
                      className="input input-bordered w-full"
                      value={id_beacon}
                      min={0}
                      minLength={5}
                      onChange={(e) => setidBeacon(Number(e.target.value))}
                    />
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
                        onChange={(e) => setTeamSeleceted(e.target.value)}
                        defaultValue={"pickone"}
                      >
                        <option value={"pickone"}>Pick one</option>
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
                        onChange={(e) => setEventSeleceted(e.target.value)}
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
                  <label htmlFor="categories-select" className="label-text">
                    Category
                  </label>
                  <div className="mt-2">
                    <div className="input-group">
                      <select
                        required={true}
                        className="select select-bordered w-full"
                        onChange={(e) => setCategorySeleceted(e.target.value)}
                        defaultValue={"pickone"}
                        disabled={categories.data.length === 0}
                      >
                        <option value={"pickone"}>Pick one</option>
                        {categories.data.length > 0 &&
                          categories.data.map((category: Category) => (
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
