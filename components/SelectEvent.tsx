"use client";

import { unixToDDMMYYYY } from "@/services/converter";
import { getEvents, getEventsWithCaching } from "@/services/events";
import { Event, EventResponse } from "@/services/events/data-type";
import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function SelectEvent({ onSelect, valSelected }: { onSelect: Function, valSelected : string }) {
  const [events, setEvents] = useState<Event[]>([]);

  const getEventList = useCallback(async () => {
    const res = await getEvents();
    if (res.status === "Server Error") {
      toast.error(res.message);
      return;
    }
    setEvents(res.data);
  }, [getEvents]);

  useEffect(() => {
    getEventList();
  }, []);

  function handleSelect(e: SyntheticEvent) {
    const { value } = e.currentTarget;
    if (value === "") return;
    onSelect(value);
  }
  return (
    <select
      className="select select-bordered w-full md:w-3/4"
      onChange={handleSelect}
      value={valSelected}
    >
      <option value={"choose-event"}>Choose Event</option>
      {events.length > 0 &&
        events.map((event) => (
          <option key={event.id} value={event.id}>
            {`${event.name} @ ${event.location} - ${unixToDDMMYYYY(
              event.start_datetime
            )}`}
          </option>
        ))}
    </select>
  );
}
