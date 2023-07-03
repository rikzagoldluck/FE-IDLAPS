"use client";

import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TeamResponse } from "@/services/teams/data-type";
import { getTeamsWithCaching } from "@/services/teams";

import toast from "react-hot-toast";
import { Beacon, BeaconResponse } from "@/services/beacons/data-type";
import { getAvailBeaconsInEvents } from "@/services/beacons";

export default function AddRider({
  eventSelected,
  categorySelected,
  onAdded,
  beacons,
}: {
  eventSelected: string;
  categorySelected: string;
  onAdded: Function;
  beacons: BeaconResponse;
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");
  const [bib, setBIB] = useState("");
  const [vci_num, setVciNum] = useState("");
  const [note_1, setNote1] = useState("");

  const [teams, setTeams] = useState<TeamResponse>({
    message: "",
    data: [],
  });

  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [teamSelected, setTeamSeleceted] = useState("");
  const [beaconSelected, setBeaconSeleceted] = useState("");
  const [disable, setDisable] = useState(true);

  const getTeamsAndBeaconList = useCallback(async () => {
    try {
      const teamsData = await getTeamsWithCaching();
      setTeams(teamsData);
    } catch (error: any) {
      toast.error(error.message, { duration: 3000 });
    }
  }, [getTeamsWithCaching]);

  useEffect(() => {
    getTeamsAndBeaconList();
  }, []);

  useEffect(() => {
    if (
      eventSelected === "" ||
      categorySelected === "" ||
      eventSelected === "choose-event" ||
      categorySelected === "choose-category"
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [eventSelected, categorySelected]);

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
        id_beacon: beaconSelected,
        note_1,
        category_id: categorySelected,
      }),
    });

    if (!res.ok) {
      setIsMutating(false);
      const resBody = await res.json();
      toast.error("Something went wrong" + resBody.message, { duration: 1000 });
      return;
    }
    onAdded();

    toast.success("Rider added", { duration: 1000 });
    setIsMutating(false);

    setName("");
    setAge(0);
    setNationality("");
    setTeamSeleceted("");
    setBIB("");
    setVciNum("");
    setNote1("");

    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div className="flex justify-end">
      <button
        className="btn btn-primary btn-block md:w-1/2"
        onClick={handleChange}
        disabled={disable}
      >
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
                      min={1}
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
                    UCI Num
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
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
                    Beacon
                  </label>
                  <div className="mt-2">
                    <div className="input-group">
                      <select
                        required={true}
                        className="select select-bordered w-full"
                        onChange={(e) => setBeaconSeleceted(e.target.value)}
                        defaultValue={"pickone"}
                      >
                        <option value={"pickone"}>Pick one</option>
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
