import React, { useEffect, useState } from "react";
import { Book } from "../App";
import { MdFavorite } from "react-icons/md";
import { IconContext } from "react-icons";

interface Props {
  book: Book;
}

const Card: React.FC<Props> = ({ book }) => {
  const getMediumImage = (book: Book) => {
    let imgSrc = book.formats["image/jpeg"];
    setImg(imgSrc.replace(/small/g, "medium"));
  };

  const [img, setImg] = useState("");
  const [isHover, setIsHover] = useState(false);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    getMediumImage(book);
    console.log(img);
  }, []);

  useEffect(() => {
    display !== "hidden" ? setDisplay("hidden") : setDisplay("block");
  }, [isHover]);

  return (
    <div className="flex flex-col h-[400px] max-w-[200px]">
      <div className="relative self-center">
        <img
          src={img}
          alt=""
          className="max-h-[280px]"
          onMouseEnter={() => setIsHover(true)}
        />
        <IconContext.Provider
          value={{
            className:
              "w-20 h-20 text-red-200 hover:text-red-600 cursor-pointer",
          }}
        >
          <div
            className={`${display} absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-10 bg-[rgba(0,0,0,0.7)]`}
            onMouseLeave={() => setIsHover(false)}
          >
            <MdFavorite></MdFavorite>
            <div className="flex w-full text-white justify-around">
              <div className="cursor-pointer hover:underline">Online</div>
              <div className="cursor-pointer hover:underline">Epub</div>
              <div className="cursor-pointer hover:underline">Mobi</div>
            </div>
          </div>
        </IconContext.Provider>
      </div>
      <div className="text-sm text-slate-700">{book.title}</div>
      <div className="text-xs text-slate-500">by {book.authors[0].name}</div>
    </div>
  );
};

export default Card;
