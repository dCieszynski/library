import React from "react";
import "../styles/Card.css";

interface Props {
  book: {
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
  };
}

const Card: React.FC<Props> = ({ book }) => {
  const renderCard = (): JSX.Element => {
    return (
      <div>
        <img src={book.mediumImg.uri} alt={book.title} />
        <h3>{book.title}</h3>
        <p>by {book.author}</p>
      </div>
    );
  };
  return <div className="Card">{renderCard()}</div>;
};

export default Card;
