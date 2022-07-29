import { Data } from "../App";
import Card from "./Card";

interface Props {
  data: Data | null;
}

const List: React.FC<Props> = ({ data }) => {
  return (
    <div>
      {data?.results.map((book) => {
        return <Card book={book}></Card>;
      })}
    </div>
  );
};

export default List;
