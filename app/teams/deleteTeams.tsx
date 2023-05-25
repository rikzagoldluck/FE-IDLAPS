"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Team = {
  id: number;
  name: string;
};

export default function DeleteTeam(team: Team) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(teamId: number) {
    setIsMutating(true);

    const res = await fetch(`http://localhost:3001/teams/${teamId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      setIsMutating(false);
      const resBody = await res.json();
      alert(`Something went wrong : ${resBody.message}`);
      return;
    }

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-accent btn-sm" onClick={handleChange}>
        Delete
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are sure to delete {team.name} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(team.id)}
                className="btn btn-primary"
              >
                Delete
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
