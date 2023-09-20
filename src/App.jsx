import { useState } from "react";
import "./App.css";
import PokeList from "./components/pokeList/PokeList";
import PagButton from "./components/paginationButton/PagButton";

function App() {
  const [offset, setOffset] = useState(0);

  const loadNext = () => {
    setOffset(offset + 20);
  };

  const loadPrevious = () => {
    setOffset(offset - 20);
  };

  return (
    <div className="App">
      <PokeList offset={offset} />
      {offset > 0 ? (
        <div>
          <PagButton onClick={loadPrevious} text={"Previous Page"} />
          <PagButton onClick={loadNext} text={"Next Page"} />
        </div>
      ) : (
        <PagButton onClick={loadNext} text={"Next Page"} />
      )}
    </div>
  );
}

export default App;
