import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";

interface Props {
  isHamburgerOpen: boolean;
  setIsHamburgerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hamburger: React.FC<Props> = ({
  isHamburgerOpen,
  setIsHamburgerOpen,
}) => {
  return (
    <div>
      {" "}
      <IconContext.Provider value={{ className: "w-8 h-8" }}>
        <div
          className="w-16 h-16 flex justify-center items-center"
          onClick={() =>
            isHamburgerOpen
              ? setIsHamburgerOpen(false)
              : setIsHamburgerOpen(true)
          }
        >
          <GiHamburgerMenu></GiHamburgerMenu>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default Hamburger;
