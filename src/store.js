export const initialStore = () => {
  return {
    pokemon: [],
    favorites: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case "set_pokemon":
      return { ...store, pokemon: action.payload };

    case "add_favorite":
      if (store.favorites.find(f => f.name === action.payload.name)) {
        return store;
      }
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };

    case "remove_favorite":
      return {
        ...store,
        favorites: store.favorites.filter(
          (fav) => fav.name !== action.payload
        )
      };

    default:
      return store;
  }
}