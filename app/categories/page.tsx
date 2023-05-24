import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import AddCategory from "./addCategories";
import DeleteCategory from "./deleteCategories";
import { getCategories } from "@/services/categories";
import { Category, CategoryResponse } from "@/services/categories/data-type";
import { convertDateTime } from "@/services/converter";

export const metadata = {
  title: "Category List",
};

export default async function CategoryList() {
  const CategoryResponse: CategoryResponse = await getCategories();
  const categories: Category[] = CategoryResponse.data
    ? CategoryResponse.data
    : [];
  return (
    <>
      <Navbar title={"category"} />

      <div className="py-10 px-10">
        <div className="py-2">
          <AddCategory />
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full font-bold">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Desc</th>
                <th>Start</th>
                <th>End</th>
                <th>Sex</th>
                <th>Distance</th>
                <th>Lap(s)</th>
                <th>Status</th>
                <th>Event</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category: Category, index: number) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>{convertDateTime(category.start_time)}</td>
                    <td>{convertDateTime(category.end_time)}</td>
                    <td>{category.sex}</td>
                    <td>{category.distance}</td>
                    <td>{category.lap}</td>
                    <td>{category.run ? "RUN" : "STOP"}</td>
                    <td>{category.events.name}</td>
                    <td className="flex gap-3">
                      {/* <UpdateCategory {...category} /> */}
                      <Link href={`/categories/${category.id}`}>
                        <button className="btn btn-secondary btn-sm">
                          Edit
                        </button>
                      </Link>
                      <DeleteCategory {...category} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center" colSpan={5}>
                    Loading ...{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
