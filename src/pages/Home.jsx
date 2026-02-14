import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import PokemonCard from "../components/PokemonCard";

export const Home = () => {

  const { store, getPokemon } = useGlobalReducer();

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div className="container mt-5 mb-5">

      <h1 className="pokemon-main-title mb-5 text-center">
        Pokémon Databank
      </h1>

      <div className="row g-4">
        {store.pokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
          />
        ))}
      </div>

    </div>
  );
};