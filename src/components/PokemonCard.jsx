import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};

export default function PokemonCard({ pokemon }) {

  const navigate = useNavigate();
  const { store, addFavorite, removeFavorite } = useGlobalReducer();
  const [animate, setAnimate] = useState(false);

  const isFavorite = store.favorites.find(
    f => f.name === pokemon.name
  );

  const toggleFavorite = (e) => {
    e.stopPropagation(); 

    if (isFavorite) {
      removeFavorite(pokemon.name);
    } else {
      addFavorite(pokemon);
    }

    setAnimate(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 300);
      });
    });
  };

  return (
    <div className="col-md-4 col-lg-3">
      <div
        className="pokemon-card h-100 clickable-card"
        onClick={() => navigate(`/pokemon/${pokemon.id}`)}
      >

        <div className="favorite-wrapper">
          <button
            className="btn"
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={toggleFavorite}
          >
            <i
              className={`bi ${
                isFavorite ? "bi-heart-fill" : "bi-heart"
              } heart-icon ${animate ? "animate" : ""}`}
              style={{
                color: isFavorite ? "#ff0000" : "black"
              }}
            ></i>
          </button>
        </div>

        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          style={{
            imageRendering: "pixelated",
            width: "140px",
            height: "140px"
          }}
        />

        <p className="pokemon-number">
          #{pokemon.id.toString().padStart(3, "0")}
        </p>

        <h5 className="pokemon-title text-capitalize">
          {pokemon.name}
        </h5>

        <div className="mt-2">
          {pokemon.types.map(type => (
            <span
              key={type}
              className="badge me-1 text-capitalize"
              style={{
                fontSize: "8px",
                backgroundColor: typeColors[type] || "#000",
                color: "white"
              }}
            >
              {type}
            </span>
          ))}
        </div>

        <div className="mt-3 stat-container">

          <div className="stat-row">
            <span>ATK</span>
            <div className="stat-bar">
              <div
                className="stat-fill atk"
                style={{
                  width: `${Math.min(pokemon.attack, 150) / 150 * 100}%`
                }}
              ></div>
            </div>
          </div>

          <div className="stat-row">
            <span>DEF</span>
            <div className="stat-bar">
              <div
                className="stat-fill def"
                style={{
                  width: `${Math.min(pokemon.defense, 150) / 150 * 100}%`
                }}
              ></div>
            </div>
          </div>

        </div>

        <div className="card-overlay">
          Click for more details
        </div>

      </div>
    </div>
  );
}