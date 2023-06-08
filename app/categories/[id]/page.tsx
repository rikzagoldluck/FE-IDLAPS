import Navbar from "@/components/Navbar";
import { Category } from "@/services/categories/data-type";
import Form from "./Form";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "Category Edit",
};

export default async function CategoryEdit({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const res = await fetch(`http://localhost:3001/categories/${id}`, {
    cache: "no-store",
  });
  const resBody = await res.json();

  if (!res.ok) {
    alert(`Something went wrong : ${resBody.message}`);
    return;
  }
  const category: Category = resBody.data;

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Navbar title={"category"} />
      <Form category={category} />
    </>
  );
}
