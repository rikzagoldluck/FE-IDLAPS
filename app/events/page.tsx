import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import AddEvent from "./addEvents";
import DeleteEvent from "./deleteEvents";
import { getEvents } from "@/services/events";
import { Event, EventResponse } from "@/services/events/data-type";
import { convertDateTime } from "@/services/converter";

export const metadata = {
  title: "Event List",
};

export default async function EventList() {
  const EventResponse: EventResponse = await getEvents();
  const events: Event[] = EventResponse.data ? EventResponse.data : [];

  return (
    <>
      <Navbar title={"event"} />

      <div className="py-10 px-10">
        <div className="py-2">
          <AddEvent />
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full font-bold">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Location</th>
                <th>Desc 1</th>
                <th>Desc 2</th>
                <th>Start</th>
                <th>End</th>
                <th>Distance</th>
                <th>Type</th>
                <th>Regis Fee</th>
                <th>Commisioner</th>
                <th>Race Director</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.length > 0 ? (
                events.map((event: Event, index: number) => (
                  <tr key={event.id}>
                    <td>{index + 1}</td>
                    <td>{event.name}</td>
                    <td>{event.location}</td>
                    <td>{event.desc_1}</td>
                    <td>{event.desc_2}</td>
                    <td>{convertDateTime(event.start_datetime)}</td>
                    <td>{convertDateTime(event.end_datetime)}</td>
                    <td>{event.distance}</td>
                    <td>{event.type}</td>
                    <td>{event.registration_fee}</td>
                    <td>{event.commisioner}</td>
                    <td>{event.race_director}</td>
                    <td className="flex gap-3">
                      {/* <UpdateEvent {...event} /> */}
                      <Link href={`/events/${event.id}`}>
                        <button className="btn btn-secondary btn-sm">
                          Edit
                        </button>
                      </Link>
                      <DeleteEvent {...event} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center" colSpan={5}>
                    Loading ...{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
