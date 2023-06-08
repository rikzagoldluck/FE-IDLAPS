import Navbar from "@/components/Navbar";
import { Event } from "@/services/events/data-type";
import Form from "./Form";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "Event Edit",
};

// export async function generateStaticParams() {
//   const events = await fetch("http://localhost:3001/events").then((res) =>
//     res.json()
//   );

// return events.data.map((event: Event) => ({
//   id: event.id,
// }));
// }

export default async function EventEdit({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const res = await fetch(`http://localhost:3001/events/${id}`, {
    cache: "no-store",
  });
  const resBody = await res.json();
  if (!res.ok) {
    alert(`Something went wrong : ${resBody.message}`);
    return;
  }
  const event: Event = resBody.data;
  // console.log(event);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Navbar title={"event"} />
      <Form event={event} />
    </>
  );
}
