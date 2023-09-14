import { useEffect, useState } from "react";
import { api } from "../services/api";
import React from "react";
import sample from "./sample.json";
import PokeModal from "./modal/Modal";

const PokeCard = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokeDetails, setPokeDetails] = useState([]);
  const [singleDetails, setSingleDetails] = useState(sample);
  const [open, setOpen] = useState(false);
  const [getList, setGetList] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const loadPokemon = () => {
      api
        .get("", {
          params: {
            limit: 20,
            offset: offset,
          },
        })
        .then((response) => setPokemonList(response.data.results))
        .catch((error) => console.log(error));
    };
    loadPokemon();
  }, [offset]);

  useEffect(() => {
    if (pokemonList.length > 0 && getList === true) {
      pokemonList.forEach((pokemon) => {
        api
          .get(pokemon.url)
          .then((response) => {
            setPokeDetails((pokeDetails) => [...pokeDetails, response.data]);
          })
          .catch((error) => console.log(error));
      });
      setGetList(false);
    }
  }, [pokemonList]);

  const getDetails = (Id) => {
    api
      .get(Id.toString(), {})
      .then((response) => setSingleDetails(response.data))
      .catch((error) => console.log(error));
  };

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const nextPage = () => {
    setOffset(offset + 20);
  };

  return (
    <div className="App">
      <ol id="pokemonList" className="pokemons">
        {pokeDetails.map((pokemon, index) => (
          <li
            key={index}
            className={`pokemon ${pokemon.types[0].type.name}`}
            onClick={() => {
              getDetails(pokemon.id);
              showModal();
            }}
          >
            <div className="nameId">
              <span className="number">#{pokemon.id}</span>
              <span className="name">{pokemon.name}</span>
            </div>
            <div className="detail">
              <ol className="types">
                {pokemon.types.map((type, index) => (
                  <li key={index} className={`type ${type.type.name}`}>
                    {type.type.name}
                  </li>
                ))}
              </ol>
              <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt={pokemon.name}
              />
            </div>
          </li>
        ))}
      </ol>
      <button
        onClick={() => {
          nextPage();
          setGetList(true);
        }}
      >
        Load More
      </button>
      <PokeModal
        
        pokeDetail={singleDetails}
        handleClose={hideModal}
        show={open}
      />
    </div>
  );
};

export default PokeCard;
