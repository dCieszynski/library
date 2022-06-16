import React from "react";
import { State as Props } from "../App";
import Card from "./Card";

const List: React.FC<Props> = ({ books }) => {
  const renderList = (): JSX.Element[] => {
    return books.map((book) => {
      return <Card book={book}></Card>;
    });
  };

  return <div>{renderList()}</div>;
};

export default List;
