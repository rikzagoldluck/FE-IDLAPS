export async function getCategories() {
  const res = await fetch("http://localhost:3001/categories", {
    cache: "no-store",
  });

  return res.json();
}

export async function getCategory(idCategory: number) {
  const res = await fetch(`http://localhost:3001/events/${idCategory}`, {
    cache: "no-store",
  });

  return res.json();
}
