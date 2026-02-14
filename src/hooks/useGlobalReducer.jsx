import { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { initialStore } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {

  const storedFavorites = JSON.parse(
    localStorage.getItem("pokemonFavorites")
  );

  const [store, dispatch] = useReducer(
    storeReducer,
    {
      ...initialStore(),
      favorites: storedFavorites || []
    }
  );

  useEffect(() => {
    localStorage.setItem(
      "pokemonFavorites",
      JSON.stringify(store.favorites)
    );
  }, [store.favorites]);

  const getPokemon = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20"
      );
      const data = await response.json();

      const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();

          return {
            id: details.id,
            name: details.name,
            sprite: details.sprites.front_default,
            types: details.types.map(t => t.type.name),
            attack: details.stats.find(
              s => s.stat.name === "attack"
            ).base_stat,
            defense: details.stats.find(
              s => s.stat.name === "defense"
            ).base_stat
          };
        })
      );

      dispatch({
        type: "set_pokemon",
        payload: detailedPokemon
      });

    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  const addFavorite = (pokemon) => {
    dispatch({
      type: "add_favorite",
      payload: pokemon
    });
  };

  const removeFavorite = (name) => {
    dispatch({
      type: "remove_favorite",
      payload: name
    });
  };

  return (
    <StoreContext.Provider
      value={{ store, getPokemon, addFavorite, removeFavorite }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export default function useGlobalReducer() {
  return useContext(StoreContext);
}