import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import "../styles/common.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPictures, getPicturesBySearch } from "../api/pictures";
import { sessionStorageUpdate } from "../helpers/helpers";

function Home(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const timeoutRef = useRef<number | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      if (newValue !== "") {
        sessionStorageUpdate("history", newValue);
      }
      setInputValue(newValue);
    }, 1000);
  };

  const pictureQuery = useInfiniteQuery({
    queryKey: ["pictures"],
    queryFn: () => getPictures(page),
    staleTime: Infinity,
    getNextPageParam: (allPages) => {
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });

  const searchQuery = useInfiniteQuery({
    queryKey: [inputValue],
    queryFn: () => getPicturesBySearch(page, inputValue),
    staleTime: Infinity,
    getNextPageParam: (lastPage) => {
      return lastPage.length + 1;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inputValue === "") {
      pictureQuery.fetchNextPage();
    } else {
      searchQuery.fetchNextPage();
    }

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollBottom = documentHeight - scrollTop - windowHeight <= 0;
      if (scrollBottom) {
        setPage((page) => page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  return (
    <>
      <div className="main_div">
        <Button width={100} height={50} textContent={"History"} address="/history" />
        <h1>Home</h1>
        <input className="input" type="text" placeholder="Search" onChange={handleChange} />
      </div>
      <div>
        {pictureQuery.isLoading && <h1>Loading...</h1>}
        {pictureQuery.isError && <h1>Error fetching pictures</h1>}
        {searchQuery.data?.pages[0].length === 0 &&
          inputValue === "" &&
          pictureQuery.data?.pages.map((page: object[], index: number) => (
            <div key={index}>
              {page.map((picture: any) => {
                return <img className="photo" alt={picture.alt_description} src={picture.urls.regular} key={picture.id} />;
              })}
            </div>
          ))}
        {searchQuery.isLoading && <h1>Loading...</h1>}
        {searchQuery.data?.pages.map((page: object[], index: number) => (
          <div key={index}>
            {page.map((picture: any) => {
              return <img className="photo" alt={picture.alt_description} src={picture.urls.regular} key={picture.id} />;
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
