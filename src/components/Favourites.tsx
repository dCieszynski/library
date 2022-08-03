import { useEffect, useState } from "react";
import { Book } from "../App";
import Card from "./Card";

const Favourties = () => {
  const [favourites, setFavourites] = useState<Book[]>([]);

  useEffect(() => {
    let newFav = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)?.toString();
      if (key) {
        newFav.push(JSON.parse(`${localStorage.getItem(key)}`));
      }
    }
    setFavourites(newFav);
  }, []);

  return (
    <div className="grid grid-cols-list items-center justify-items-center gap-x-12">
      {favourites.map((fav) => {
        return <Card book={fav}></Card>;
      })}
    </div>
  );
};

export default Favourties;
