import React, { useEffect, useState } from "react";
import { Book } from "../App";

interface Props {
  book: Book;
}

const Card: React.FC<Props> = ({ book }) => {
  const getMediumImage = (book: Book) => {
    let imgSrc = book.formats["image/jpeg"];
    setImg(imgSrc.replace(/small/g, "medium"));
  };

  const [img, setImg] = useState("");

  useEffect(() => {
    getMediumImage(book);
    console.log(img);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div>
        <img src={img} alt="" className="" />
      </div>
      <div>{book.title}</div>
      <div>{book.authors[0].name}</div>
    </div>
  );
};

export default Card;
