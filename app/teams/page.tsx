import Navbar from "@/components/Navbar";
import Link from "next/link";
import AddTeam from "./addTeams";
import DeleteTeam from "./deleteTeams";
import { getTeams } from "@/services/teams";
import { Team, TeamResponse } from "@/services/teams/data-type";

export const metadata = {
  title: "Team List",
};

export default async function TeamList() {
  const TeamResponse: TeamResponse = await getTeams();
  const teams: Team[] = TeamResponse.data ? TeamResponse.data : [];

  return (
    <>
      <Navbar title={"team"} />

      <div className="py-10 px-10">
        <div className="py-2">
          <AddTeam />
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full font-bold">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Nationality</th>
                <th>Province</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teams.length > 0 ? (
                teams.map((team: Team, index: number) => (
                  <tr key={team.id}>
                    <td>{index + 1}</td>
                    <td>{team.name}</td>
                    <td>{team.nationality}</td>
                    <td>{team.province}</td>

                    <td className="flex gap-3">
                      {/* <UpdateTeam {...team} /> */}
                      <Link href={`/teams/${team.id}`}>
                        <button className="btn btn-secondary btn-sm">
                          Edit
                        </button>
                      </Link>
                      <DeleteTeam {...team} />
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
