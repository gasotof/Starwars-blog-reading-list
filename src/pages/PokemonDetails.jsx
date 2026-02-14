import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PokemonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);

        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();

        const evolutionRes = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionRes.json();

        const evolutions = [];

        let current = evolutionData.chain;

        while (current) {
          evolutions.push(current.species.name);
          current = current.evolves_to[0];
        }

        const evolutionDetails = await Promise.all(
          evolutions.map(async (name) => {
            const res = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${name}`,
            );
            const pokeData = await res.json();

            return {
              name: pokeData.name,
              sprite: pokeData.sprites.front_default,
            };
          }),
        );

        setEvolutionChain(evolutionDetails);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!pokemon) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="details-card-compact text-center">
        <h1 className="pokemon-main-title text-capitalize mb-3">
          {pokemon.name}
        </h1>

        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          style={{
            imageRendering: "pixelated",
            width: "160px",
            height: "160px",
          }}
        />

        <div className="mt-3 compact-info">
          <p>
            <strong>ID:</strong> {pokemon.id}
          </p>
          <p>
            <strong>Height:</strong> {pokemon.height}
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight}
          </p>
          <p>
            <strong>Types:</strong>{" "}
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>
        </div>

        <div className="mt-4">
          <h4 style={{ fontSize: "10px" }}>Evolution</h4>

          <div className="d-flex justify-content-center align-items-center flex-wrap mt-2">
            {evolutionChain.map((evo, index) => (
              <div key={evo.name} className="d-flex align-items-center">
                <div className="text-center mx-2">
                  <img
                    src={evo.sprite}
                    alt={evo.name}
                    style={{
                      imageRendering: "pixelated",
                      width: "80px",
                      height: "80px",
                    }}
                  />
                  <p className="text-capitalize evolution-name">{evo.name}</p>
                </div>

                {index < evolutionChain.length - 1 && (
                  <div style={{ fontSize: "16px" }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <button className="retro-button mt-4" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
}
