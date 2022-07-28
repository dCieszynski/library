import { useEffect, useState } from "react";

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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {data?.results.map((book) => {
        return <div>{book.title}</div>;
      })}
    </div>
  );
}

export default App;
