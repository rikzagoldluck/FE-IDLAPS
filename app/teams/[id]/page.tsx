import Navbar from "@/components/Navbar";
import { Team } from "@/services/teams/data-type";
import Form from "./Form";

export const metadata = {
  title: "Team Edit",
};

export default async function TeamEdit({ params }: { params: { id: number } }) {
  const { id } = params;
  const res = await fetch(`http://localhost:3001/teams/${id}`, {
    cache: "no-store",
  });
  const resBody = await res.json();
  if (!res.ok) {
    alert(`Something went wrong : ${resBody.message}`);
    return;
  }
  const team: Team = resBody.data;
  // console.log(event);

  return (
    <>
      <Navbar title={"team"} />
      <Form team={team} />
    </>
  );
}
