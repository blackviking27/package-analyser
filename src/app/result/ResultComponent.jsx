import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchComponent = ({ setSearch }) => {
  return (
    <div class="relative md:w-1/3">
      <label for="Search" class="sr-only">
        Search
      </label>

      <input
        type="text"
        id="Search"
        placeholder="Search for package"
        class="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
        onChange={(e) => {
          console.log(e.target.value);
          setSearch(e.target.value);
        }}
      />

      <span class="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <button type="button" class="text-gray-600 hover:text-gray-700">
          <span class="sr-only">Search</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </span>
    </div>
  );
};

const ResultComponent = ({ title, result }) => {
  const [search, setSearch] = useState("");
  const [packages, setPackages] = useState(result);

  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search === "") {
        setPackages(result);
      } else {
        console.log("SEARCH", search);
        let list = result.filter((obj) => {
          let name = obj.name.toLowerCase();
          return name.includes(search.toLowerCase());
        });
        console.log("LIST", list);
        setPackages(list);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const handleLinkClick = (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
      <div className="sticky top-0 bg-white">
        <p className="p-4  md:text-xl">
          Upload another&nbsp;
          <span
            className="text-green-500 underline underline-offset-1 cursor-pointer"
            onClick={() => router.push("analyse")}
          >
            package.json
          </span>
        </p>
        <div className="p-4 md:flex justify-between">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <SearchComponent setSearch={setSearch} />
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 gap-4">
          {packages.map((data) => (
            <div className="flex col-span-1">
              <div className="p-4 w-full">
                <div className="border border-gray-200 p-6 rounded-lg md:flex md:justify-between">
                  <div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2 md:flex justify-start items-center gap-6">
                      <p className="font-bold">{data.name}</p>
                      <div className="inline-flex items-center justify-center rounded-full gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-8 h-8 cursor-pointer"
                          onClick={() => handleLinkClick(data.links.github)}
                        >
                          <title>GitHub</title>
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          class="w-8 h-8 cursor-pointer"
                          onClick={() => handleLinkClick(data.links.homepage)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                          />
                        </svg>
                      </div>
                    </h2>
                    <p className="leading-relaxed text-base">
                      {data.description}
                    </p>
                  </div>
                  <div className="md:flex justify-center items-center md:gap-4 font-semibold m-4 text-xl md:w-1/3 text-center">
                    <div className="text-red-500">{data.version.prev}</div>
                    <div className="text-green-500">{data.version.latest}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResultComponent;
