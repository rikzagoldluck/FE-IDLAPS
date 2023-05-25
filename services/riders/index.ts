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

  return res.json();
}
