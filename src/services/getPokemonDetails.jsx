import { api } from "./api";

const FetchPokemon = async (offset) => {
    const pokemonList = await api.get("", {
      params: { limit: 20, offset: offset },
    });
    const urlList = await pokemonList.data.results;
    const getPokemonUrl = urlList.map((url) => {
      return url.url;
    });
    const getPokemonsDetails = await Promise.all(
      getPokemonUrl.map(async (url) => {
        const getDetails = await api.get(url);
        return getDetails.data;
      })
    );
    return getPokemonsDetails;
};
  
export default FetchPokemon;