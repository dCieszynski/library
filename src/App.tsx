import React, { useEffect, useState } from "react";
import "./styles/App.css";
import List from "./components/List";

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
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getBooksList = async (pageNum: number): Promise<BooksList> => {
    const response = await fetch(
      `https://gnikdroy.pythonanywhere.com/api/book/?page=${pageNum}`
    );
    return await response.json();
  };

  useEffect(() => {
    const getBooks = async (pageNum: number) => {
      const data: BooksList = await getBooksList(pageNum);
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
    getBooks(currentPage);
  }, []);

  useEffect(() => {
    const getBooks = async (pageNum: number) => {
      console.log(pageNum);
      const data: BooksList = await getBooksList(pageNum);
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
    getBooks(currentPage);
  }, [currentPage]);

  const changePage = (page: number): void => {
    if (currentPage + page != 0) {
      let pageNum = currentPage;
      pageNum += page;
      console.log(pageNum);
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className="App">
      <h1>Library</h1>
      <List books={books}></List>
      <button onClick={() => changePage(1)}>Next</button>
      <button onClick={() => changePage(-1)}>Previous</button>
    </div>
  );
};

export default App;
