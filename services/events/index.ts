export async function getEvents() {
  const res = await fetch("http://localhost:3001/events", {
    cache: "no-store",
  });

  return res.json();
}

export async function getEventsWithCaching() {
  const res = await fetch("http://localhost:3001/events");

  return res.json();
}

export async function getEvent(idEvent: number) {
  const res = await fetch(`http://localhost:3001/events/${idEvent}`, {
    cache: "no-store",
  });

  return res.json();
}
