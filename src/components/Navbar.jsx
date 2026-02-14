import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, removeFavorite } = useGlobalReducer();

  return (
    <nav
      className="navbar px-4 d-flex justify-content-between"
      style={{ backgroundColor: "#CC0000" }}
    >
      <Link to="/" className="navbar-brand">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
          alt="Pokemon Logo"
          style={{ height: "55px" }}
        />
      </Link>

      <div className="dropdown">
        <button
          className="btn btn-light dropdown-toggle"
          style={{ fontSize: "12px" }}
          type="button"
          data-bs-toggle="dropdown"
        >
          Favorites ({store.favorites.length})
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
          {store.favorites.length === 0 ? (
            <li className="dropdown-item text-muted">No favorites yet</li>
          ) : (
            store.favorites.map((fav) => (
              <li
                key={fav.name}
                className="dropdown-item d-flex justify-content-between align-items-center"
              >
                <span className="text-capitalize">{fav.name}</span>
                <button
                  className="btn btn-sm btn-danger"
                  style={{ fontSize: "8px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(fav.name);
                  }}
                >
                  X
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};
