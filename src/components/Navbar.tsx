import { ImBooks } from "react-icons/im";
import { MdFavorite } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { Data, Book } from "../App";

interface Props {
  isHamburgerOpen: boolean;
  setData: React.Dispatch<React.SetStateAction<Data | null>>;
  setFavourites: React.Dispatch<React.SetStateAction<Book[] | null>>;
  setNav: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<Props> = ({
  isHamburgerOpen,
  setData,
  setFavourites,
  setNav,
}) => {
  const [leftPos, setLeftPos] = useState("left-0");

  const getData = async (): Promise<void> => {
    const res = await fetch("https://gutendex.com/books");
    const newData: Data = await res.json();
    setData(newData);
    setNav("collection");
  };

  const getFavourites = () => {
    let newFav = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)?.toString();
      if (key) {
        newFav.push(JSON.parse(`${localStorage.getItem(key)}`));
      }
    }
    setFavourites(newFav);
    setNav("fav");
  };

  useEffect(() => {
    leftPos === "-left-20" ? setLeftPos("left-0") : setLeftPos("-left-20");
  }, [isHamburgerOpen]);

  return (
    <div className={`fixed top-16 ${leftPos} w-16 flex flex-col items-center`}>
      <div className="relative flex flex-col gap-2">
        <IconContext.Provider value={{ className: "w-8 h-8" }}>
          <div
            className="w-16 h-16 flex flex-col justify-center items-center cursor-pointer"
            onClick={getData}
          >
            <ImBooks></ImBooks>
            <span className="text-center text-[10px]">Collection</span>
          </div>
          <div
            className="w-16 h-16 flex flex-col justify-center items-center cursor-pointer"
            onClick={getFavourites}
          >
            <MdFavorite></MdFavorite>
            <span className="text-center text-[10px]">Favourites</span>
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Navbar;
