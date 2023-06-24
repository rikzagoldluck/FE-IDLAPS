"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
export default function InputInterval() {
  const [myinterval, setMyinterval] = useState("0");

  useEffect(() => {
    fetch("http://localhost:3001/utilities/interval")
      .then((res) => res.json())
      .then((data) => {
        setMyinterval(data.data.value);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSetInterval = () => {
    fetch("http://localhost:3001/utilities/interval", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: myinterval,
      }),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Interval has been set");
          return;
        }
        toast.error("Failed to set interval");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        fetch("http://localhost:3001/utilities/interval")
          .then((res) => res.json())
          .then((data) => {
            setTimeout(() => {
              setMyinterval(data.data.value);
            }, 1000);
          })
          .catch((err) => console.log(err));
      });
  };

  return (
    <div className="join">
      <input
        type="number"
        className="input input-bordered join-item input-md w-20"
        placeholder="Fetching ..."
        value={myinterval}
        onChange={(e) => setMyinterval(e.target.value)}
      />
      <button
        className="btn join-item rounded-btn btn-sm md:btn-md lg:btn-md"
        onClick={handleSetInterval}
      >
        SET
      </button>
    </div>
  );
}
