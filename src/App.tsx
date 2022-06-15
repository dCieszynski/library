import React, { useEffect, useState } from "react";

interface BooksList {
  count: string;
  next: string;
  previous: string;
  results: [
    {
      id: string;
      type: string;
      title: string;
      description: string;
      downloads: number;
      license: string;
      subjects: string[];
      bookshelves: string[];
      languages: string[];
      agents: [
        {
          id: string;
          person: string;
          type: string;
        }
      ];
      resources: [
        {
          id: string;
          uri: string;
          type: string;
        }
      ];
    }
  ];
}

export interface State {
  books: {
    id: string;
    title: string;
    author: string;
    subjects: string[];
    languages: string[];
    mediumImg: {
      id: string;
      uri: string;
      type: string;
    };
    source: {
      id: string;
      uri: string;
      type: string;
    };
  }[];
}

const App: React.FC = () => {
  const [books, setBooks] = useState<State["books"]>([]);

  const getBooksList = async (): Promise<BooksList> => {
    const response = await fetch(
      "https://gnikdroy.pythonanywhere.com/api/book/"
    );
    return await response.json();
  };

  useEffect(() => {
    const getBooks = async () => {
      const data: BooksList = await getBooksList();
      const booksData: State["books"] = data.results.map((book) => {
        const images = book.resources.filter(
          (resource) => resource.type === "image/jpeg"
        );
        const [mediumImg] = images.filter((image) =>
          image.uri.includes("medium")
        );
        const [source] = book.resources.filter(
          (resource) => resource.type === "text/html; charset=utf-8"
        );
        const author = book.agents[0].person.replace(",", "");
        return {
          id: book.id,
          title: book.title,
          author: author,
          subjects: book.subjects,
          languages: book.languages,
          mediumImg: mediumImg,
          source: source,
        };
      });
      console.log(booksData);
      setBooks(booksData);
    };
    getBooks();
  }, []);

  return <div className="App">Library</div>;
};

export default App;
