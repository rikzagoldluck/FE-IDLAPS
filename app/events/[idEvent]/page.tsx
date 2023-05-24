import Navbar from "@/components/Navbar";
import { Event } from "@/services/events/data-type";

export const metadata = {
  title: "Event Detail",
};

// export async function generateStaticParams() {
//   const events = await fetch("http://localhost:3001/events").then((res) =>
//     res.json()
//   );

// return events.data.map((event: Event) => ({
//   id: event.id,
// }));
// }

export default async function EventDetail({
  params,
}: {
  params: { idEvent: number };
}) {
  const { idEvent } = params;
  const res = await fetch(`http://localhost:3001/events/${idEvent}`);
  const resBody = await res.json();

  // console.log(res);
  console.log(resBody);

  if (!res.ok) {
    alert(`Something went wrong : ${resBody.message}`);
    return;
  }
  const event: Event = resBody.data;
  // console.log(event);

  return (
    <>
      <Navbar title={"event"} />
    </>
  );
}
