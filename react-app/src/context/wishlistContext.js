import { createContext, useContext, useState } from "react";

export const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export default function WishlistProvider({ children }) {
  const [wishlistModal, setWishlistModal] = useState(false);

  return (
    <WishlistContext.Provider
      value={{
        wishlistModal,
        setWishlistModal,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
