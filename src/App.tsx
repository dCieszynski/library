import { useEffect, useState } from "react";
import Hamburger from "./components/Hamburger";
import Navbar from "./components/Navbar";

interface Data {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}

interface Book {
  authors: Author[];
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

interface Author {
  name: string;
  birth_year: number;
  death_year: number;
}

function App() {
  const getData = async (): Promise<void> => {
    const res = await fetch("https://gutendex.com/books");
    const newData: Data = await res.json();
    setData(newData);
  };

  const [data, setData] = useState<Data | null>(null);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [contentMargin, setContentMargin] = useState("0");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    contentMargin === "[72px]"
      ? setContentMargin("0")
      : setContentMargin("[72px]");
  }, [isHamburgerOpen]);

  return (
    <div>
      <Hamburger
        isHamburgerOpen={isHamburgerOpen}
        setIsHamburgerOpen={setIsHamburgerOpen}
      ></Hamburger>
      <Navbar isHamburgerOpen={isHamburgerOpen}></Navbar>
      <div className={`ml-${contentMargin} mt-[72px]`}>
        {data?.results.map((book) => {
          return <div>{book.title}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
