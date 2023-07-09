import NavbarHome from "@/components/NavbarHome";
import { getCategoryInRace } from "@/services/categories";
import { Category, CategoryResponse } from "@/services/categories/data-type";
import { unixToHHMM } from "@/services/converter";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const CategoriesResponse: CategoryResponse = await getCategoryInRace();
  const categories: Category[] = CategoriesResponse.data
    ? CategoriesResponse.data
    : [];

  return (
    <main>
      {/* <div className="container mx-auto"> */}
      <NavbarHome />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Race Today - {categories.length > 0 && categories[0].events.name}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 group">
          {categories.length > 0 &&
            categories.map((category) => (
              <Link href={"racenow/" + category.id}>
                <div className="card bg-base-100 shadow-2xl max-w-sm mx-auto group/item hover:bg-base-200  hover:cursor-pointer">
                  <figure>
                    <Image
                      src={"/img/" + category.sex + ".jpg"}
                      alt={category.sex + " image"}
                      width={384}
                      height={200}
                      style={{
                        height: "200px !important",
                        width: "384px !important",
                        objectFit: "cover",
                      }}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {category.name}
                      <div
                        className={
                          category.run
                            ? "badge badge-success"
                            : "badge badge-danger"
                        }
                      >
                        {category.run ? "Race" : "Stop"}
                      </div>
                    </h2>
                    <p>{category.description}</p>
                    <div className="card-actions justify-around">
                      <div className="flex align-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          version="1"
                          id="sports"
                        >
                          <g color="#000">
                            <path
                              fill="none"
                              stroke="#373748"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M655.195 1398.779h12.269v8.487h-12.269z"
                              overflow="visible"
                              transform="rotate(14.987 5630.576 -1710.95) skewX(-.026)"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              stroke="#373748"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M653.459 1398.779h1.737v20.747h-1.737z"
                              overflow="visible"
                              transform="rotate(14.987 5630.576 -1710.95) skewX(-.026)"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m19.98 6.781 1.823.488-.488 1.822-1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m21.802 7.269 1.824.488-.488 1.822-1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m23.626 7.757 1.824.488-.488 1.822-1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m25.45 8.245 1.824.489-.489 1.821-1.823-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m27.273 8.733 1.824.489-.489 1.821-1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m29.097 9.222 1.823.488-.488 1.822-1.824-.489zM19.491 8.603l1.824.488-.489 1.822-1.823-.489z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m21.314 9.09 1.824.489-.489 1.821-1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m23.138 9.579 1.824.488-.489 1.822-1.824-.489z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m24.962 10.067 1.823.488-.488 1.822-1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m26.784 10.555 1.824.488-.488 1.822-1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m28.608 11.043 1.824.489-.489 1.821-1.823-.488zM19.003 10.424l1.823.489-.488 1.821-1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m20.825 10.912 1.824.488-.488 1.822-1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m22.65 11.4 1.823.489-.489 1.821-1.823-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m24.473 11.889 1.824.488-.489 1.822-1.824-.489z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m26.296 12.377 1.824.488-.489 1.822-1.824-.489z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m28.12 12.865 1.823.488-.488 1.822-1.824-.488zM18.514 12.246l1.824.488-.489 1.822-1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m20.337 12.734 1.824.488-.489 1.822-1.824-.489z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m22.16 13.222 1.824.488-.488 1.822-1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m23.984 13.71 1.824.489-.488 1.821-1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m25.807 14.198 1.824.489-.489 1.821-1.823-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m27.631 14.687 1.824.488-.489 1.821-1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="none"
                              stroke="#373748"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M139.567 1536.834h12.269v8.487h-12.269z"
                              overflow="visible"
                              transform="matrix(-.96598 .2586 .25904 .96587 -250.925 -1514.265)"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              stroke="#373748"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M137.831 1536.834h1.737v20.747h-1.737z"
                              overflow="visible"
                              transform="matrix(-.96598 .2586 .25904 .96587 -250.925 -1514.265)"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m12.024 6.786-1.824.488.488 1.822 1.824-.489z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m10.2 7.274-1.824.488.489 1.822 1.823-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m8.377 7.762-1.824.488.489 1.822 1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="M6.553 8.25 4.73 8.74l.489 1.821 1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m4.73 8.738-1.823.489.488 1.821 1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m2.907 9.227-1.824.488.488 1.821 1.824-.488zM12.512 8.607l-1.824.489.489 1.821L13 10.43z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m10.688 9.096-1.823.488.488 1.822 1.824-.489z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m8.866 9.584-1.824.488.488 1.822 1.824-.489z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m7.042 10.072-1.824.488.489 1.822 1.823-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m5.219 10.56-1.824.488.489 1.822 1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m3.395 11.048-1.824.488.489 1.822 1.824-.488zM13 10.43l-1.823.487.488 1.822 1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m11.177 10.917-1.824.489.489 1.821 1.823-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m9.354 11.405-1.824.489.489 1.821 1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m7.53 11.894-1.823.488.488 1.821 1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m5.708 12.382-1.824.488.488 1.821 1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m3.884 12.87-1.824.488.489 1.822 1.823-.489zM13.49 12.25l-1.825.489.489 1.822 1.824-.489z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m11.665 12.739-1.823.488.488 1.822 1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m9.843 13.227-1.824.488.488 1.822 1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m8.019 13.715-1.824.488.489 1.822 1.823-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#373748"
                              d="m6.196 14.203-1.824.488.489 1.822 1.824-.488z"
                              overflow="visible"
                            ></path>
                            <path
                              fill="#f2f2f2"
                              d="m4.372 14.691-1.823.489L3.037 17l1.824-.488z"
                              overflow="visible"
                            ></path>
                          </g>
                        </svg>
                        <h1 className="text-xl">{category.lap}</h1>
                      </div>
                      <div className="flex align-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          id="olympics"
                        >
                          <path
                            d="M-4.5 1021.362c-4.7 0-8.5 3.8-8.5 8.5v13c0 4.7 3.8 8.5 8.5 8.5s8.5-3.8 8.5-8.5v-13c0-4.7-3.8-8.5-8.5-8.5zm0 1c4.164 0 7.5 3.337 7.5 7.5v13c0 4.164-3.336 7.5-7.5 7.5a7.473 7.473 0 0 1-7.5-7.5v-2.5h2v2.5c0 3.039 2.462 5.5 5.5 5.5s5.5-2.461 5.5-5.5v-13c0-3.038-2.462-5.5-5.5-5.5a5.499 5.499 0 0 0-5.5 5.5v9.5h-2v-9.5c0-4.163 3.336-7.5 7.5-7.5zm0 3a4.48 4.48 0 0 1 4.5 4.5v13a4.48 4.48 0 0 1-4.5 4.5 4.48 4.48 0 0 1-4.5-4.5v-3.5h2v3.5c0 1.377 1.124 2.5 2.5 2.5s2.5-1.123 2.5-2.5v-13c0-1.376-1.124-2.5-2.5-2.5a2.506 2.506 0 0 0-2.5 2.5v8.5h-2v-8.5a4.48 4.48 0 0 1 4.5-4.5zm0 3c.84 0 1.5.66 1.5 1.5v13c0 .84-.66 1.5-1.5 1.5s-1.5-.66-1.5-1.5v-13c0-.84.66-1.5 1.5-1.5z"
                            color="#000"
                            font-family="sans-serif"
                            font-weight="400"
                            overflow="visible"
                            transform="translate(21 -1020.362)"
                            style={{
                              lineHeight: "normal",
                              textIndent: "0",
                              textAlign: "start",
                              textDecorationLine: "none",
                              textDecorationStyle: "solid",
                              textDecorationColor: "#000",
                              textTransform: "none",
                              blockProgression: "tb",
                              whiteSpace: "normal",
                              isolation: "auto",
                              mixBlendMode: "normal",
                              solidColor: "#000",
                              solidOpacity: "1",
                            }}
                          ></path>
                        </svg>
                        <h1 className="text-xl">{category.distance} KM</h1>
                      </div>
                    </div>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline mt-0.5">
                        {unixToHHMM(category.start_sch)}
                      </div>
                      <Image
                        src={"/img/" + category.sex + ".png"}
                        height={24}
                        width={24}
                        alt={category.sex + " simbol"}
                      ></Image>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}
