import { Data, Book } from "../App";
import Card from "./Card";

interface Props {
  data: Book[] | null | undefined;
}

const List: React.FC<Props> = ({ data }) => {
  return (
    <div className="grid grid-cols-list items-center justify-items-center gap-x-12">
      {data?.map((book) => {
        return <Card book={book}></Card>;
      })}
    </div>
  );
};

export default List;
