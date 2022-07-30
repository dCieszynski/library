import { Data } from "../App";
import Card from "./Card";

interface Props {
  data: Data | null;
}

const List: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      {data?.results.map((book) => {
        return <Card book={book}></Card>;
      })}
    </div>
  );
};

export default List;
