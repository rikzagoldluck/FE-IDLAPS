"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Event = {
  id: number;
  name: string;
  location: string;
  desc_1: string;
  desc_2: string;
  start_dateime: string;
  end_datetime: string;
  distance: number;
  type: string;
  registration_fee: number;
  commisioner: string;
  race_director: string;
};

export default function UpdateProduct(event: Event) {
  const [name, setName] = useState(event.name);
  const [location, setLocation] = useState(event.location);
  const [desc1, setDesc1] = useState(event.desc_1);
  const [desc2, setDesc2] = useState(event.desc_2);
  const [start, setStart] = useState(event.start_dateime);
  const [end, setEnd] = useState(event.end_datetime);
  const [distance, setDistance] = useState(event.distance);
  const [type, setType] = useState(event.type);
  const [regisFee, setRegisFee] = useState(event.registration_fee);
  const [comm, setComm] = useState(event.commisioner);
  const [rd, setRD] = useState(event.race_director);

  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function convertInputDateTime(input: string) {
    const dateParts = input.split("T");
    const date = dateParts[0];
    const time = dateParts[1] + ":00";
    const formattedDateTime = date + " " + time;
    return formattedDateTime;
  }
  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`http://localhost:3001/events/${event.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        location,
        desc_1: desc1,
        desc_2: desc2,
        start: convertInputDateTime(start),
        end: convertInputDateTime(end),
        commisioner: comm,
        race_director: rd,
        distance,
        type,
        registration_fee: regisFee,
      }),
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }
  useEffect(() => {
    // console.log(convertInputDateTime(start));
    // console.log(convertInputDateTime(end));
  }, [start, end]);

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-secondary btn-sm" onClick={handleChange}>
        Edit
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl"></div>

        <div className="modal-action">
          <button type="button" className="btn" onClick={handleChange}>
            Close
          </button>
          {!isMutating ? (
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          ) : (
            <button type="button" className="btn loading">
              Updating...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
