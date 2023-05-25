export async function getTeams() {
  const res = await fetch("http://localhost:3001/teams", {
    cache: "no-store",
  });

  return res.json();
}

export async function getTeamsWithCaching() {
  const res = await fetch("http://localhost:3001/teams");

  return res.json();
}

export async function getTeam(idTeam: number) {
  const res = await fetch(`http://localhost:3001/teams/${idTeam}`, {
    cache: "no-store",
  });

  return res.json();
}
