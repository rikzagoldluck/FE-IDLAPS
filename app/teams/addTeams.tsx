"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function AddTeam() {
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [province, setProvince] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const [modal, setModal] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const res = await fetch("http://localhost:3001/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        nationality,
        province,
      }),
    });

    if (!res.ok) {
      setIsMutating(false);
      const resBody = await res.json();
      toast.error(`Something went wrong : ${resBody.message}`, {
        duration: 1000,
      });
      return;
    }

    toast.success("Team added", { duration: 1000 });
    setIsMutating(false);

    setName("");
    setNationality("");
    setProvince("");

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={handleChange}>
        Add Team
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
        id="add-team-modal"
      />

      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <label
            htmlFor="add-team-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg">Add New Team</h3>
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="team-name" className="label-text">
                    Team Name
                  </label>
                  <div className="mt-2">
                    <input
                      required={true}
                      type="text"
                      name="name"
                      id="team-name"
                      className="input input-bordered w-full"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="team-nationality" className="label-text">
                    Team Nationality
                  </label>
                  <div className="mt-2">
                    <input
                      required={true}
                      type="text"
                      name="nationality"
                      id="team-nationality"
                      className="input input-bordered w-full"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="team-province" className="label-text">
                    Team Province
                  </label>
                  <div className="mt-2">
                    <input
                      name="province"
                      id="team-province"
                      className="w-full input input-bordered"
                      placeholder="Province"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
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
