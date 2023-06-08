import Navbar from "@/components/Navbar";
import Form from "./Form";
import { Rider } from "@/services/riders/data-type";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "Rider Edit",
};

// export async function generateStaticParams() {
//   const events = await fetch("http://localhost:3001/events").then((res) =>
//     res.json()
//   );

// return events.data.map((event: Event) => ({
//   id: event.id,
// }));
// }

export default async function RiderEdit({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const res = await fetch(`http://localhost:3001/riders/${id}`, {
    cache: "no-store",
  });
  const resBody = await res.json();
  if (!res.ok) {
    alert(`Something went wrong : ${resBody.message}`);
    return;
  }
  const rider: Rider = resBody.data;
  // console.log(event);

  return (
    <>
      <div>
        <Toaster />
      </div>

      <Navbar title={"rider"} />
      <Form rider={rider} />
    </>
  );
}
