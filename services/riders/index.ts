export async function getRiders() {
  const res = await fetch("http://localhost:3001/riders", {
    cache: "no-store",
  });
  return res.json();
}

export async function getRidersWithCaching() {
  const res = await fetch("http://localhost:3001/riders");

  return res.json();
}

export async function getRider(idRider: number) {
  const res = await fetch(`http://localhost:3001/riders/${idRider}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(res.statusText);

  return res.json();
}

export async function getRidersRunInCategory(id: number) {
  const res = await fetch(`http://localhost:3001/races/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export async function getRidersByCategory(id: string) {
  const res = await fetch(`http://localhost:3001/riders/category/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(res.statusText);

  return res.json();
}

export async function updateRiderNote(idRider: number, note: string) {
  const res = await fetch(
    `http://localhost:3001/riders/${idRider}/note/${note}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note }),
    }
  );
  if (!res.ok) throw new Error(res.statusText);

  return res.json();
}

export async function updateRidersNoteInParcel(note: string, body: any) {
  const res = await fetch(`http://localhost:3001/riders/parcel/${note}`, {
    cache: "no-store",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
export async function updateRidersAndClear(body: any) {
  const res = await fetch(`http://localhost:3001/riders/clear`, {
    cache: "no-store",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
