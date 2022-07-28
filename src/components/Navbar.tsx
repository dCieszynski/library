import { ImBooks } from "react-icons/im";
import { IoIosBook } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";

interface Props {
  isHamburgerOpen: boolean;
}

const Navbar: React.FC<Props> = ({ isHamburgerOpen }) => {
  const [leftPos, setLeftPos] = useState("16");

  useEffect(() => {
    console.log("Left pos before: ", leftPos);
    console.log("Is open: ", isHamburgerOpen);
    leftPos === "[-80px]" ? setLeftPos("8") : setLeftPos("[-80px]");
    console.log("Left pos after ", leftPos);
  }, [isHamburgerOpen]);

  return (
    <div
      className={`fixed top-16 left-${leftPos} w-16 flex flex-col items-center`}
    >
      <div className="relative flex flex-col gap-2">
        <IconContext.Provider value={{ className: "w-8 h-8" }}>
          <div className="w-16 h-16 flex flex-col justify-center items-center">
            <IoIosBook></IoIosBook>
            <span className="text-center text-[10px]">Now reading</span>
          </div>
          <div className="w-16 h-16 flex flex-col justify-center items-center">
            <ImBooks></ImBooks>
            <span className="text-center text-[10px]">Collection</span>
          </div>
          <div className="w-16 h-16 flex flex-col justify-center items-center">
            <MdFavorite></MdFavorite>
            <span className="text-center text-[10px]">Favourites</span>
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Navbar;
