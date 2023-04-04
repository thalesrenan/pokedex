import { useEffect, useState } from "react";
import {api} from "../services/api";
import React from "react";
import PokeModal from "./modal/Modal";

const PokeCard = () => {

    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [pokeDetails, setPokeDetails] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function loadPokemon(){
          try {
            const response = await api.get("", {
              params: {
                limit: 20,
                offset: offset,
              }
            });
            setPokemonList(response.data.results);
          } catch (error) {
            console.log(error);
          }
        }
        loadPokemon();
      }, [offset]);
    
      function nextPage(){
        setOffset(offset + 20);
      }
    
      function previousPage(){
        setOffset(offset - 20);
      }
    
      useEffect(() => {
        function loadDetails(list){
          try {
            list.forEach(async (pokemon)=>{
                const response = await api.get(pokemon.url, {
                });
                setPokeDetails((pokeDetails)=>[...pokeDetails, response.data]);
            })
            } catch (error) {
                console.log(error);
          }
        }
        loadDetails(pokemonList);
      }, []);


      const showModal = () => {
        setOpen(true);
      };
    
      const hideModal = () => {
        setOpen(false);
      };

  return (
    <div className="App">
      <PokeModal pokeDetails={pokeDetails} show={open} handleClose={hideModal}/>
        <ol id="pokemonList" className="pokemons">
            {pokeDetails.map(pokemon => (
                <li 
                key={pokemon.id} 
                className={`pokemon ${pokemon.types[0].type.name}`}
                onClick={()=>{
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
        <button onClick={previousPage}>Voltar</button>
        <button onClick={nextPage}>Avançar</button>
    </div>
  );
}

export default PokeCard;