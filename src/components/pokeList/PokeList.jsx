import { useState } from "react";
import React from "react";
import FetchPokemon from "../../services/getPokemonDetails";
import PokeCard from "../pokeCard/PokeCard";

const PokeList = ({offset}) => {
  const [pokeDetails, setPokeDetails] = useState([]);

  const getDetails = async () => {
    setPokeDetails(await FetchPokemon(offset))
  };
  
  getDetails()
  
  return (
    <>
      {pokeDetails ? (
        <div className="App">
          <PokeCard pokeDetails={pokeDetails}/>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default PokeList;
