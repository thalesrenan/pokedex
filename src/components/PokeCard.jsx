import { useEffect, useState } from "react";
import {api} from "../services/api";
import React from "react";
import PokeModal from "./modal/Modal";

const PokeCard = () => {

    const [pokemonList, setPokemonList] = useState([]);
    const [pokeDetails, setPokeDetails] = useState([]);
    const [open, setOpen] = useState(false);
    const [offset, setOffset] = useState(0);
    const [pokeId, setPokeId] = useState(0);

    useEffect(() => {
         function loadPokemon(){
          api.get("", {
            params: {
              limit: 20,
              offset: offset,
            }
          }).then((response)=>setPokemonList(response.data.results))
          .catch((error)=>console.log(error))
        }
        loadPokemon();
      }, [offset]);
    
      function nextPage(){
        setOffset(offset + 20);
      }
    
      useEffect(() => {
        function loadDetails(list){
            list.map(async (pokemon)=>{
                await api.get(pokemon.url)
                .then((response)=>setPokeDetails((pokeDetails)=>[...pokeDetails, response.data]))
                .catch((error)=>console.log(error))
            })}
        if(pokemonList.length > 0){
           loadDetails(pokemonList);
        }
      }, [pokemonList]);

      const showModal = () => {
        setOpen(true);
      };
    
      const hideModal = () => {
        setOpen(false);
      };

  return (
    <div className="App">
      <PokeModal pokeId={pokeId} show={open} handleClose={hideModal}/>
        <ol id="pokemonList" className="pokemons">
            {pokeDetails.map(pokemon => (
                <li 
                key={pokemon.id} 
                className={`pokemon ${pokemon.types[0].type.name}`}
                onClick={()=>{
                  setPokeId(pokemon.id)
                  showModal();
                }}
                >
                    
                    <div className="nameId">
                        <span className="number">#{pokemon.id}</span>
                        <span className="name">{pokemon.name}</span>
                    </div>
                    <div className="detail">
                        <ol className="types">
                            {pokemon.types.map(type => 
                            <li key={type.type.name} className={`type ${type.type.name}`}>{type.type.name}</li>
                            )}
                        </ol>
                        <img src={pokemon.sprites.other.dream_world.front_default}
                            alt={pokemon.name}/>
                    </div>
                </li>
            ))}
        </ol>
        <button onClick={nextPage}>Load More</button>
    </div>
  );
}

export default PokeCard;