import Navbar from "@/components/Navbar";
import Link from "next/link";
import AddRider from "./addRiders";
import DeleteRider from "./deleteRiders";
import { getRiders } from "@/services/riders";
import { Rider, RiderResponse } from "@/services/riders/data-type";

export const metadata = {
  title: "Rider List",
};

export default async function RiderList() {
  const RiderResponse: RiderResponse = await getRiders();
  const riders: Rider[] = RiderResponse.data ? RiderResponse.data : [];

  return (
    <>
      <Navbar title={"rider"} />

      <div className="py-10 px-10">
        <div className="py-2">{/* <AddRider /> */}</div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full font-bold">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>Nation</th>
                <th>Team</th>
                <th>BIB</th>
                <th>Lap Running</th>
                <th>Lap No</th>
                <th>Running</th>
                <th>Category - Event</th>
                <th>Notes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {riders.length > 0 ? (
                riders.map((rider: Rider, index: number) => (
                  <tr key={rider.id}>
                    <td>{index + 1}</td>
                    <td>{rider.name}</td>
                    <td>{rider.age}</td>
                    <td>{rider.nationality}</td>
                    <td>{rider.teams.name}</td>
                    <td>{rider.bib}</td>
                    <td>{rider.run_lap}</td>
                    <td>{rider.lap_no}</td>
                    <td>{rider.run ? "RUN" : "STOP"}</td>
                    <td>{rider.categories.name + "-" + rider.events.name}</td>
                    <td>{rider.note}</td>
                    <td className="flex gap-3">
                      {/* <UpdateRider {...rider} /> */}
                      <Link href={`/riders/${rider.id}`}>
                        <button className="btn btn-secondary btn-sm">
                          Edit
                        </button>
                      </Link>
                      <DeleteRider {...rider} />
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
