"use client";

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import type { Team } from "@/services/teams/data-type";

export default function Form({ team }: { team: Team }) {
  const [name, setName] = useState(team.name);
  const [nationality, setNationality] = useState(team.nationality);
  const [province, setProvince] = useState(team.province);

  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();
  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const res = await fetch(`http://localhost:3001/teams/${team.id}`, {
      method: "PATCH",
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
      alert(`Something went wrong : ${resBody.message}`);
      return;
    }

    setIsMutating(false);
    router.push("/teams");
    router.refresh();
  }

  return (
    <div className="container mx-auto py-4 px-4">
      <form onSubmit={handleUpdate}>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Edit {team.name}</h3>
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
                Province
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
      </form>
    </div>
  );
}
