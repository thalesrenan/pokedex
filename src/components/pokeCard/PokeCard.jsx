import { useState } from "react";
import PokeModal from "../modal/Modal";

const PokeCard = ({ pokeDetails }) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <ol id="pokemonList" className="pokemons">
      {pokeDetails.map((pokemon, index) => (
        <li
          key={index}
          className={`pokemon ${pokemon.types[0].type.name}`}
          onClick={() => {
            showModal();
            setId(pokemon.id);
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
      <PokeModal
        pokeDetail={pokeDetails}
        handleClose={hideModal}
        show={open}
        id={id}
      />
    </ol>
  );
};

export default PokeCard;
