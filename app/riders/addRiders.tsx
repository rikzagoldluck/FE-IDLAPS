"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EventResponse } from "@/services/events/data-type";
import { CategoryResponse } from "@/services/categories/data-type";
import { TeamResponse } from "@/services/teams/data-type";

const dateTimeToUnix = (datetime: string) => {
  const date = new Date(datetime);

  return Math.floor(date.getTime() / 1000);
};
export default function AddRider() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");
  const [team_id, setTeamId] = useState(0);
  const [bib, setBIB] = useState("");
  const [vci_num, setVciNum] = useState("");
  const [id_b, setidBeacon] = useState(0);
  const [mac_no, setMacNo] = useState("");
  const [note, setNote] = useState("");
  const [note_1, setNote1] = useState("");
  const [run_lap, setRunLap] = useState(0);
  const [lap_no, setLapNo] = useState(0);
  const [event_id, setEventId] = useState(0);
  const [category_id, setCategoryId] = useState(0);
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

  const router = useRouter();

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
        team_id,
        bib,
        vci_num,
        id_b,
        mac_no,
        note,
        note_1,
        run_lap,
        lap_no,
        event_id,
        category_id,
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
    setAge(0);
    setNationality("");
    setTeamId(0);
    setBIB("");
    setVciNum("");
    setidBeacon(0);
    setMacNo("");
    setNote("");
    setNote1("");
    setRunLap(0);
    setLapNo(0);
    setEventId(0);
    setCategoryId(0);

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

                <div className="sm:col-span-3">
                  <label htmlFor="rider-nationality" className="label-text">
                    Nationality
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      required={true}
                      name="nationality"
                      id="rider-nationality"
                      className="w-full textarea textarea-bordered h-24"
                      placeholder="INA"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="rider-bib" className="label-text">
                    BIB
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      required={true}
                      name="bib"
                      id="rider-bib"
                      className="w-full textarea textarea-bordered h-24"
                      placeholder="001"
                      value={bib}
                      minLength={3}
                      onChange={(e) => setBIB(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="rider-vcinum" className="label-text">
                    Commisioner
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
                      value={id_b}
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
                  <label htmlFor="rider-note-1" className="label-text">
                    Note 1
                  </label>
                  <div className="mt-2">
                    <input
                      required={true}
                      type="text"
                      name="note_1"
                      id="rider-note-1"
                      className="input input-bordered w-full"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
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
                  <label htmlFor="rider-distance" className="label-text">
                    Distance
                  </label>
                  <div className="mt-2">
                    <div className="input-group">
                      <input
                        type="number"
                        name="distance"
                        id="rider-distance"
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
                  <label htmlFor="rider-race-type" className="label-text">
                    Race Type
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="type"
                      id="rider-race-type"
                      placeholder="Road Bike, Mountain Bike, etc..."
                      className="input input-bordered w-full"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="rider-registration-fee"
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
                        id="rider-registration-fee"
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
