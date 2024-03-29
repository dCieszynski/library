import { useEffect, useState } from "react";
import Hamburger from "./components/Hamburger";
import Navbar from "./components/Navbar";
import List from "./components/List";
import Pagination from "./components/Pagination";
import Search from "./components/Search";

export interface Data {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}

export interface Book {
  authors: {
    name: string;
    birth_year: number;
    death_year: number;
  }[];
  bookshelves: string[];
  copyright: boolean;
  download_count: number;
  formats: {
    "application/epub+zip": string;
    "application/rdf+xml": string;
    "application/x-mobipocket-ebook": string;
    "image/jpeg": string;
    "text/html": string;
    "text/html; charset=utf-8": string;
    "text/plain; charset=utf-8": string;
  };
  id: number;
  languages: string[];
  media_type: string;
  subjects: string[];
  title: string;
  translators: string[];
}

function App() {
  const getData = async (): Promise<void> => {
    const res = await fetch("https://gutendex.com/books");
    const newData: Data = await res.json();
    setData(newData);
  };

  const [data, setData] = useState<Data | null>(null);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [contentMargin, setContentMargin] = useState("ml-[72px]");
  const [favourites, setFavourites] = useState<Book[] | null>([]);
  const [nav, setNav] = useState("collection");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    contentMargin === "ml-[72px]"
      ? setContentMargin("ml-4")
      : setContentMargin("ml-[72px]");
  }, [isHamburgerOpen]);

  return (
    <div className="pb-5">
      <div className="w-full fixed top-0 z-50 h-16 flex justify-between bg-white">
        <Hamburger
          isHamburgerOpen={isHamburgerOpen}
          setIsHamburgerOpen={setIsHamburgerOpen}
        ></Hamburger>
        <Search setData={setData}></Search>
      </div>
      <Navbar
        isHamburgerOpen={isHamburgerOpen}
        setData={setData}
        setFavourites={setFavourites}
        setNav={setNav}
      ></Navbar>
      <div className={`${contentMargin} mt-[72px] mr-4`}>
        <List data={nav === "collection" ? data?.results : favourites}></List>
      </div>
      <Pagination data={data} setData={setData}></Pagination>
    </div>
  );
}

export default App;
