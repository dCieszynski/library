import { useEffect, useState } from "react";
import { Data } from "../App";

interface Props {
  data: Data | null;
  setData: React.Dispatch<React.SetStateAction<Data | null>>;
}

const Pagination: React.FC<Props> = ({ data, setData }) => {
  const [pageNum, setPageNum] = useState(1);

  const getData = async (): Promise<void> => {
    const res = await fetch(`https://gutendex.com/books/?page=${pageNum}`);
    const newData: Data = await res.json();
    setData(newData);
  };

  const decreasePageNum = () => {
    let newPageNum = pageNum - 1;
    setPageNum(newPageNum);
  };

  const increasePageNum = () => {
    let newPageNum = pageNum + 1;
    setPageNum(newPageNum);
  };

  useEffect(() => {
    getData();
  }, [pageNum]);

  return (
    <div className="flex justify-center items-center gap-5">
      {data?.previous !== null && (
        <button
          className="border-black border-2 rounded-md px-4 py-2"
          onClick={decreasePageNum}
        >
          Prev
        </button>
      )}
      <span>{pageNum}</span>
      {data?.next !== null && (
        <button
          className="border-black border-2 rounded-md px-4 py-2"
          onClick={increasePageNum}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
