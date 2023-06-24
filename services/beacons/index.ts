export async function getBeaconsWithCaching() {
  const res = await fetch("http://localhost:3001/beacons");

  return res.json();
}

export async function getAvailBeaconsInEvents(id: string) {
  const res = await fetch("http://localhost:3001/beacons/events/" + id);

  if (!res.ok) {
    throw new Error("Failed to fetch : " + res.status + " " + res.statusText);
  }
  return res.json();
}

export async function getAvailBeaconsAndChoosenInEvents(
  id: string,
  id2: string
) {
  const res = await fetch(
    "http://localhost:3001/beacons/events/" + id + "/" + id2
  );

  if (!res.ok) {
    throw new Error("Failed to fetch : " + res.status + " " + res.statusText);
  }
  return res.json();
}
