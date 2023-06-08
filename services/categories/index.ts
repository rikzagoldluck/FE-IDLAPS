export async function getCategories() {
  const res = await fetch("http://localhost:3001/categories", {
    cache: "no-store",
  });

  return res.json();
}

export async function getCategory(idCategory: number) {
  const res = await fetch(`http://localhost:3001/categories/${idCategory}`, {
    cache: "no-store",
  });

  return res.json();
}

export async function getCategoryInRace() {
  const res = await fetch(`http://localhost:3001/races`, {
    cache: "no-store",
  });

  return res.json();
}

export async function getCategoriesByEvent(id: string) {
  const res = await fetch(`http://localhost:3001/categories/events/${id}`, {
    cache: "no-store",
  });

  return res.json();
}
