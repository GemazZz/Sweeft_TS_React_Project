import { useEffect, useState } from "react";
import Button from "../components/Button";
import "../styles/common.css";
import { sessionStorageRead } from "../helpers/helpers";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPicturesBySearch } from "../api/pictures";

function History(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const data: string[] = sessionStorageRead("history");

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
    searchQuery.fetchNextPage();
  }, [page]);

  useEffect(() => {
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
        <Button width={100} height={50} textContent={"Home"} address="/" />
        <h1>History</h1>
        {data?.map((data, index) => {
          return (
            <button
              className="button"
              key={index}
              value={data}
              onClick={(e) => {
                setInputValue(e.currentTarget.textContent || "");
              }}
            >
              {data}
            </button>
          );
        })}
      </div>
      <div>
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

export default History;
